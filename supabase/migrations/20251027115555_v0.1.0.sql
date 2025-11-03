-- =====================================
-- 1️⃣ Users (profile only)
-- =====================================
create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    name text,
    avatar_url text,
    created_at timestamptz default now()
);

alter table public.users enable row level security;

create policy "own_profile" on public.users
    for all using (auth.uid() = id) with check (auth.uid() = id);

-- =====================================
-- 2️⃣ Categories
-- =====================================
create table if not exists public.categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique
);

alter table public.categories enable row level security;

create policy "public_read_categories" on public.categories
    for select using (true);

-- =====================================
-- 3️⃣ Products
-- =====================================
create table if not exists public.products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    category_id uuid references public.categories(id),
    created_at timestamptz default now()
);

alter table public.products enable row level security;

create policy "public_read_products" on public.products
    for select using (true);

-- =====================================
-- 4️⃣ Product Variants
-- =====================================
create table if not exists public.product_variants (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid references public.products(id),
    name text,
    sku text unique,
    current_price numeric(10,2),
    old_price numeric(10,2),
    stock int,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.product_variants enable row level security;

create policy "public_read_product_variants" on public.product_variants
    for select using (true);

-- =====================================
-- 5️⃣ Product Images
-- =====================================
create table if not exists public.product_images (
    id uuid primary key default uuid_generate_v4(),
    variant_id uuid references public.product_variants(id),
    url text,
    alt text,
    position int
);

alter table public.product_images enable row level security;

create policy "public_read_product_images" on public.product_images
    for select using (true);

-- =====================================
-- 6️⃣ Attributes
-- =====================================
create table if not exists public.attributes (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique,
    category_id uuid references public.categories(id)
);

alter table public.attributes enable row level security;

create policy "public_read_attributes" on public.attributes
    for select using (true);

-- =====================================
-- 7️⃣ Attribute Values
-- =====================================
create table if not exists public.attribute_values (
    id uuid primary key default uuid_generate_v4(),
    attribute_id uuid references public.attributes(id),
    value text not null
);

alter table public.attribute_values enable row level security;

create policy "public_read_attribute_values" on public.attribute_values
    for select using (true);

-- =====================================
-- 8️⃣ Product Variant Attributes
-- =====================================
create table if not exists public.product_variant_attributes (
    variant_id uuid references public.product_variants(id),
    attribute_value_id uuid references public.attribute_values(id),
    primary key (variant_id, attribute_value_id)
);

alter table public.product_variant_attributes enable row level security;

create policy "public_read_variant_attributes" on public.product_variant_attributes
    for select using (true);

-- =====================================
-- 9️⃣ Wishlists
-- =====================================
create table if not exists public.wishlists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id),
    created_at timestamptz default now()
);

alter table public.wishlists enable row level security;

create policy "own_wishlist" on public.wishlists
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =====================================
-- 10️⃣ Wishlist Items
-- =====================================
create table if not exists public.wishlist_items (
    id uuid primary key default uuid_generate_v4(),
    wishlist_id uuid references public.wishlists(id),
    variant_id uuid references public.product_variants(id)
);

alter table public.wishlist_items enable row level security;

create policy "own_wishlist_items" on public.wishlist_items
    for all using (exists(select 1 from public.wishlists w where w.id = wishlist_id and w.user_id = auth.uid()))
    with check (exists(select 1 from public.wishlists w where w.id = wishlist_id and w.user_id = auth.uid()));

-- =====================================
-- 11️⃣ Carts
-- =====================================
create table if not exists public.carts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) null,
    session_id text unique null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.carts enable row level security;

create policy "own_cart" on public.carts
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- =====================================
-- 12️⃣ Cart Items
-- =====================================
create table if not exists public.cart_items (
    id uuid primary key default uuid_generate_v4(),
    cart_id uuid references public.carts(id),
    variant_id uuid references public.product_variants(id),
    quantity int
);

alter table public.cart_items enable row level security;

create policy "own_cart_items" on public.cart_items
    for all using (exists(select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid() or c.session_id = current_setting('request.jwt.claims.session_id', true)::text)))
    with check (exists(select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid() or c.session_id = current_setting('request.jwt.claims.session_id', true)::text)));

-- =====================================
-- 17️⃣ Discounts
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

create policy "public_read_discounts" on public.discounts
    for select using (true);

-- =====================================
-- 13️⃣ Orders
-- =====================================
create table if not exists public.orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) null,
    session_id text null,
    email text not null,
    phone text,
    name text,
    address text,
    total numeric(10,2),
    status text default 'pending',
    discount_id uuid references public.discounts(id) null,
    created_at timestamptz default now()
);

alter table public.orders enable row level security;

create policy "own_orders" on public.orders
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- =====================================
-- 14️⃣ Order Items
-- =====================================
create table if not exists public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id),
    variant_id uuid references public.product_variants(id),
    quantity int,
    price numeric(10,2)
);

alter table public.order_items enable row level security;

create policy "own_order_items" on public.order_items
    for all using (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()))
    with check (exists(select 1 from public.orders o where o.id = order_id and o.user_id = auth.uid()));

-- =====================================
-- 15️⃣ Payments (Stripe)
-- =====================================
create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) not null,
    user_id uuid references public.users(id) null,
    session_id text null,
    stripe_payment_intent_id text unique not null,
    amount numeric not null,
    currency text default 'usd',
    status text default 'pending',
    created_at timestamptz default now()
);

alter table public.payments enable row level security;

create policy "own_payments" on public.payments
    for all using (user_id = auth.uid())
    with check (user_id = auth.uid());

-- =====================================
-- 16️⃣ Reviews
-- =====================================
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) not null,
    product_id uuid references public.products(id) not null,
    rating int not null,
    comment text,
    approved boolean default false,
    created_at timestamptz default now()
);

alter table public.reviews enable row level security;

create policy "own_reviews" on public.reviews
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- =====================================
-- 18️⃣ Discount Products (optional)
-- =====================================
create table if not exists public.discount_products (
    discount_id uuid references public.discounts(id),
    product_id uuid references public.products(id),
    primary key(discount_id, product_id)
);

alter table public.discount_products enable row level security;

create policy "public_read_discount_products" on public.discount_products
    for select using (true);
