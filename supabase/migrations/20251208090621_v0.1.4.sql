-- ==============================================================================
-- GOSSAMER E-COMMERCE MIGRATION (FINAL CONSOLIDATED & SAFE)
-- ==============================================================================

-- 1️⃣ EXTENSIONS
create extension if not exists "uuid-ossp";
create extension if not exists "pg_trgm";

-- 2️⃣ ENUMS (Safe creation)
DO $$ BEGIN
    CREATE TYPE public.order_status AS ENUM ('pending', 'processing', 'paid', 'shipped', 'delivered', 'cancelled', 'refunded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- =====================================
-- 3️⃣ Users & Addresses
-- =====================================
create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    name text,
    avatar_url text,
    phone text,
    created_at timestamptz default now(),
    deleted_at timestamptz
);
alter table public.users enable row level security;
create policy "own_profile" on public.users for all using (auth.uid() = id);

create table if not exists public.user_addresses (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    title text,
    address_line1 text not null,
    address_line2 text,
    city text not null,
    state text,
    zip_code text,
    country text default 'Ukraine',
    phone text,
    is_default boolean default false,
    created_at timestamptz default now()
);
alter table public.user_addresses enable row level security;
create policy "own_addresses" on public.user_addresses for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =====================================
-- 4️⃣ Categories
-- =====================================
create table if not exists public.categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique,
    deleted_at timestamptz
);
alter table public.categories enable row level security;
create policy "public_read_categories" on public.categories for select using (deleted_at is null);

-- =====================================
-- 5️⃣ Products (Core)
-- =====================================
create table if not exists public.products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    category_id uuid references public.categories(id),
    slug text unique not null,
    average_rating numeric(3, 2) default 0,
    reviews_count integer default 0,
    search_vector tsvector,
    created_at timestamptz default now(),
    deleted_at timestamptz
);
alter table public.products enable row level security;
create policy "public_read_products" on public.products for select using (deleted_at is null);

create index if not exists products_search_idx on public.products using gin (search_vector);
create index if not exists products_title_trgm_idx on public.products using gin (title gin_trgm_ops);

-- =====================================
-- 6️⃣ Discounts
-- =====================================
create table if not exists public.discounts (
    id uuid primary key default uuid_generate_v4(),
    code text unique,
    description text,
    discount_type text,
    value numeric,
    active boolean default true,
    starts_at timestamptz,
    ends_at timestamptz
);
alter table public.discounts enable row level security;
create policy "public_read_discounts" on public.discounts for select using (true);

-- =====================================
-- 7️⃣ Product Variants & Images
-- =====================================
create table if not exists public.product_variants (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid references public.products(id) on delete cascade,
    name text,
    sku text unique,
    current_price numeric(10,2),
    old_price numeric(10,2),
    stock int,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    deleted_at timestamptz
);
alter table public.product_variants enable row level security;
create policy "public_read_product_variants" on public.product_variants for select using (deleted_at is null);

create table if not exists public.product_images (
    id uuid primary key default uuid_generate_v4(),
    variant_id uuid references public.product_variants(id) on delete cascade,
    url text,
    alt text,
    position int
);
alter table public.product_images enable row level security;
create policy "public_read_product_images" on public.product_images for select using (true);

-- =====================================
-- 8️⃣ Attributes & Values
-- =====================================
create table if not exists public.attributes (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique,
    category_id uuid references public.categories(id)
);
alter table public.attributes enable row level security;
create policy "public_read_attributes" on public.attributes for select using (true);

create table if not exists public.attribute_values (
    id uuid primary key default uuid_generate_v4(),
    attribute_id uuid references public.attributes(id) on delete cascade,
    value text not null
);
alter table public.attribute_values enable row level security;
create policy "public_read_attribute_values" on public.attribute_values for select using (true);

create table if not exists public.product_variant_attributes (
    variant_id uuid references public.product_variants(id) on delete cascade,
    attribute_value_id uuid references public.attribute_values(id) on delete cascade,
    primary key (variant_id, attribute_value_id)
);
alter table public.product_variant_attributes enable row level security;
create policy "public_read_variant_attributes" on public.product_variant_attributes for select using (true);

-- =====================================
-- 9️⃣ Wishlists
-- =====================================
create table if not exists public.wishlists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    created_at timestamptz default now()
);
alter table public.wishlists enable row level security;
create policy "own_wishlist" on public.wishlists for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.wishlist_items (
    id uuid primary key default uuid_generate_v4(),
    wishlist_id uuid references public.wishlists(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete cascade
);
alter table public.wishlist_items enable row level security;
create policy "own_wishlist_items" on public.wishlist_items for all using (exists(select 1 from public.wishlists w where w.id = wishlist_id and w.user_id = auth.uid()));

-- =====================================
-- 🔟 Carts (Auth Only) - With Unique Constraint Fix
-- =====================================
create table if not exists public.carts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    -- Ensure user has only one cart
    constraint carts_user_id_key unique (user_id)
);
alter table public.carts enable row level security;
create policy "own_cart" on public.carts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Safety block: remove duplicates if they exist from previous schema versions
DO $$ BEGIN
    DELETE FROM public.carts a USING public.carts b
    WHERE a.id < b.id AND a.user_id = b.user_id;
EXCEPTION WHEN OTHERS THEN NULL; END $$;

create table if not exists public.cart_items (
    id uuid primary key default uuid_generate_v4(),
    cart_id uuid references public.carts(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete cascade,
    quantity int
);
alter table public.cart_items enable row level security;
create policy "own_cart_items" on public.cart_items for all using (exists(select 1 from public.carts c where c.id = cart_id and c.user_id = auth.uid()));

-- =====================================
-- 1️⃣1️⃣ Orders
-- =====================================
create table if not exists public.orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete set null null,
    email text not null,
    phone text,
    name text,
    address text,
    total numeric(10,2),
    status public.order_status default 'pending',
    discount_id uuid references public.discounts(id) on delete set null null,
    created_at timestamptz default now(),
    deleted_at timestamptz
);
alter table public.orders enable row level security;
create policy "own_orders" on public.orders for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete set null,
    quantity int,
    price numeric(10,2)
);
alter table public.order_items enable row level security;
create policy "own_order_items" on public.order_items for all using (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- =====================================
-- 1️⃣2️⃣ Payments
-- =====================================
create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade not null,
    user_id uuid references public.users(id) on delete set null null,
    stripe_payment_intent_id text unique not null,
    amount numeric not null,
    currency text default 'usd',
    status text default 'pending',
    created_at timestamptz default now()
);
alter table public.payments enable row level security;
create policy "own_payments" on public.payments for all using (user_id = auth.uid());

-- =====================================
-- 1️⃣3️⃣ Reviews
-- =====================================
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete cascade not null,
    rating int not null check (rating >= 1 and rating <= 5),
    comment text,
    approved boolean default false,
    created_at timestamptz default now(),
    deleted_at timestamptz
);
alter table public.reviews enable row level security;
create policy "own_reviews" on public.reviews for all using (auth.uid() = user_id);

-- =====================================
-- 1️⃣4️⃣ Discount Products
-- =====================================
create table if not exists public.discount_products (
    discount_id uuid references public.discounts(id) on delete cascade,
    product_id uuid references public.products(id) on delete cascade,
    primary key(discount_id, product_id)
);
alter table public.discount_products enable row level security;
create policy "public_read_discount_products" on public.discount_products for select using (true);


-- ==============================================================================
-- 🛠 FUNCTIONS & TRIGGERS (Safe Creation)
-- ==============================================================================

-- 1. Handle New User
create or replace function public.handle_new_user() returns trigger as $$
begin
  insert into public.users(id, email, name, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();


-- 2. Auto-Generate Slug
create or replace function public.generate_slug() returns trigger as $$
begin
  if new.slug is null or new.slug = '' then
    new.slug := lower(replace(regexp_replace(new.title, '[^a-zA-Z0-9\s]', '', 'g'), ' ', '-'));
  end if;
  if exists (select 1 from public.products where slug = new.slug and id <> new.id) then
      new.slug := new.slug || '-' || substring(md5(random()::text) from 1 for 4);
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_product_slug on public.products;
create trigger set_product_slug before insert or update on public.products for each row execute function public.generate_slug();


-- 3. Auto-Calculate Rating
create or replace function public.update_product_rating() returns trigger as $$
begin
    declare target_product_id uuid;
    begin
        if (tg_op = 'DELETE') then target_product_id := old.product_id; else target_product_id := new.product_id; end if;
        update public.products
        set average_rating = coalesce((select round(avg(rating), 2) from public.reviews r where r.product_id = target_product_id and r.approved = true and r.deleted_at is null), 0),
            reviews_count = coalesce((select count(*) from public.reviews r where r.product_id = target_product_id and r.approved = true and r.deleted_at is null), 0)
        where id = target_product_id;
        return null;
    end;
end;
$$ language plpgsql security definer;

drop trigger if exists on_review_change on public.reviews;
create trigger on_review_change after insert or update or delete on public.reviews for each row execute function public.update_product_rating();


-- 4. Search Vector
create or replace function public.products_search_vector_update() returns trigger as $$
begin
  new.search_vector :=
    setweight(to_tsvector('english', coalesce(new.title, '')), 'A') ||
    setweight(to_tsvector('english', coalesce(new.description, '')), 'B');
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_search_vector_trigger on public.products;
create trigger products_search_vector_trigger before insert or update on public.products for each row execute function public.products_search_vector_update();


-- ==============================================================================
-- 🔎 RPC API FUNCTIONS
-- ==============================================================================

create or replace function public.search_products(
  search_term text,
  category_filter_slug text default null,
  limit_val int default 20,
  offset_val int default 0
)
returns table (
  id uuid,
  title text,
  slug text,
  average_rating numeric,
  reviews_count int,
  current_price numeric,
  image_url text
) as $$
begin
  return query
  select
    p.id, p.title, p.slug, p.average_rating, p.reviews_count,
    (select v.current_price from public.product_variants v where v.product_id = p.id and v.deleted_at is null limit 1) as current_price,
    (select i.url from public.product_images i join public.product_variants v on i.variant_id = v.id where v.product_id = p.id and v.deleted_at is null order by i.position limit 1) as image_url
  from public.products p
  join public.categories c on p.category_id = c.id
  where
    p.deleted_at is null
    AND (
      p.search_vector @@ websearch_to_tsquery('english', search_term)
      OR p.title ilike '%' || search_term || '%'
      OR similarity(p.title, search_term) > 0.1
    )
    AND (category_filter_slug is null OR c.slug = category_filter_slug)
  order by
    ts_rank(p.search_vector, websearch_to_tsquery('english', search_term)) + similarity(p.title, search_term) desc
  limit limit_val offset offset_val;
end;
$$ language plpgsql;

create or replace function public.decrement_stock(row_id uuid, amount int)
returns void as $$
begin
  update public.product_variants
  set stock = stock - amount
  where id = row_id;
end;
$$ language plpgsql security definer;

-- =====================================
-- 🔐 PERMISSIONS
-- =====================================
grant usage on schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
grant all privileges on all tables in schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
grant all privileges on all sequences in schema public to anon, authenticated, service_role;
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
grant all privileges on all functions in schema public to anon, authenticated, service_role;