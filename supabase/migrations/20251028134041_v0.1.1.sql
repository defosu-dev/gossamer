-- This migration script sets up the database schema for the e-commerce application in Supabase.

-- Enable uuid-ossp extension for generating UUIDs
create extension if not exists "uuid-ossp";

-- =====================================
-- 1️⃣ Users (profile only)
-- =====================================
-- Stores user profile information, linked to auth.users
create table if not exists public.users (
    id uuid primary key references auth.users(id) on delete cascade,
    email text unique not null,
    name text,
    avatar_url text,
    created_at timestamptz default now()
);

alter table public.users enable row level security;

-- Policy for users to access their own profile
create policy "own_profile" on public.users
    for all using (auth.uid() = id) with check (auth.uid() = id);

-- =====================================
-- 2️⃣ Categories
-- =====================================
-- Stores product categories
create table if not exists public.categories (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique
);

alter table public.categories enable row level security;

-- Policy for public read access to categories
create policy "public_read_categories" on public.categories
    for select using (true);

-- =====================================
-- 3️⃣ Products
-- =====================================
-- Stores general product information
create table if not exists public.products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    category_id uuid references public.categories(id),
    created_at timestamptz default now()
);

alter table public.products enable row level security;

-- Policy for public read access to products
create policy "public_read_products" on public.products
    for select using (true);

-- =====================================
-- 17️⃣ Discounts
-- =====================================
-- Stores discount codes and their properties
create table if not exists public.discounts (
    id uuid primary key default uuid_generate_v4(),
    code text unique,
    description text,
    discount_type text, -- e.g., 'percentage', 'fixed'
    value numeric,
    active boolean default true,
    starts_at timestamptz,
    ends_at timestamptz
);

alter table public.discounts enable row level security;

-- Policy for public read access to discounts
create policy "public_read_discounts" on public.discounts
    for select using (true);

-- =====================================
-- 4️⃣ Product Variants
-- =====================================
-- Stores specific product variations (e.g., size, color)
create table if not exists public.product_variants (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid references public.products(id) on delete cascade,
    name text,
    sku text unique,
    current_price numeric(10,2),
    old_price numeric(10,2),
    stock int,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.product_variants enable row level security;

-- Policy for public read access to product variants
create policy "public_read_product_variants" on public.product_variants
    for select using (true);

-- =====================================
-- 5️⃣ Product Images
-- =====================================
-- Stores image URLs for product variants
create table if not exists public.product_images (
    id uuid primary key default uuid_generate_v4(),
    variant_id uuid references public.product_variants(id) on delete cascade,
    url text,
    alt text,
    position int
);

alter table public.product_images enable row level security;

-- Policy for public read access to product images
create policy "public_read_product_images" on public.product_images
    for select using (true);

-- =====================================
-- 6️⃣ Attributes
-- =====================================
-- Stores product attributes (e.g., "Color", "Size")
create table if not exists public.attributes (
    id uuid primary key default uuid_generate_v4(),
    name text not null unique,
    slug text not null unique,
    category_id uuid references public.categories(id)
);

alter table public.attributes enable row level security;

-- Policy for public read access to attributes
create policy "public_read_attributes" on public.attributes
    for select using (true);

-- =====================================
-- 7️⃣ Attribute Values
-- =====================================
-- Stores values for attributes (e.g., "Red", "Blue" for "Color")
create table if not exists public.attribute_values (
    id uuid primary key default uuid_generate_v4(),
    attribute_id uuid references public.attributes(id) on delete cascade,
    value text not null
);

alter table public.attribute_values enable row level security;

-- Policy for public read access to attribute values
create policy "public_read_attribute_values" on public.attribute_values
    for select using (true);

-- =====================================
-- 8️⃣ Product Variant Attributes
-- =====================================
-- Junction table linking product variants to their specific attribute values
create table if not exists public.product_variant_attributes (
    variant_id uuid references public.product_variants(id) on delete cascade,
    attribute_value_id uuid references public.attribute_values(id) on delete cascade,
    primary key (variant_id, attribute_value_id)
);

alter table public.product_variant_attributes enable row level security;

-- Policy for public read access to product variant attributes
create policy "public_read_variant_attributes" on public.product_variant_attributes
    for select using (true);

-- =====================================
-- 9️⃣ Wishlists
-- =====================================
-- Stores user wishlists
create table if not exists public.wishlists (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade,
    created_at timestamptz default now()
);

alter table public.wishlists enable row level security;

-- Policy for users to access their own wishlist
create policy "own_wishlist" on public.wishlists
    for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- =====================================
-- 10️⃣ Wishlist Items
-- =====================================
-- Stores items within wishlists
create table if not exists public.wishlist_items (
    id uuid primary key default uuid_generate_v4(),
    wishlist_id uuid references public.wishlists(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete cascade
);

alter table public.wishlist_items enable row level security;

-- Policy for users to access items in their own wishlist
create policy "own_wishlist_items" on public.wishlist_items
    for all using (exists(select 1 from public.wishlists w where w.id = wishlist_id and w.user_id = auth.uid()))
    with check (exists(select 1 from public.wishlists w where w.id = wishlist_id and w.user_id = auth.uid()));

-- =====================================
-- 11️⃣ Carts
-- =====================================
-- Stores shopping cart information, can be linked to a user or a session
create table if not exists public.carts (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade null,
    session_id text unique null, -- For anonymous users
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

alter table public.carts enable row level security;

-- Policy for users to access their own cart (based on user_id or session_id)
create policy "own_cart" on public.carts
    for all using (auth.uid() = user_id OR session_id = current_setting('request.jwt.claims.session_id', true)::text)
    with check (auth.uid() = user_id OR session_id = current_setting('request.jwt.claims.session_id', true)::text);

-- =====================================
-- 12️⃣ Cart Items
-- =====================================
-- Stores items within shopping carts
create table if not exists public.cart_items (
    id uuid primary key default uuid_generate_v4(),
    cart_id uuid references public.carts(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete cascade,
    quantity int
);

alter table public.cart_items enable row level security;

-- Policy for users to access items in their own cart
create policy "own_cart_items" on public.cart_items
    for all using (exists(select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid() or c.session_id = current_setting('request.jwt.claims.session_id', true)::text)))
    with check (exists(select 1 from public.carts c where c.id = cart_id and (c.user_id = auth.uid() or c.session_id = current_setting('request.jwt.claims.session_id', true)::text)));

-- =====================================
-- 13️⃣ Orders
-- =====================================
-- Stores customer order details
create table if not exists public.orders (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete set null null, -- Can be null for guest checkouts
    session_id text null, -- For anonymous orders
    email text not null,
    phone text,
    name text,
    address text,
    total numeric(10,2),
    status text default 'pending',
    discount_id uuid references public.discounts(id) on delete set null null,
    created_at timestamptz default now()
);

alter table public.orders enable row level security;

-- Policy for users to access their own orders
create policy "own_orders" on public.orders
    for all using (auth.uid() = user_id OR session_id = current_setting('request.jwt.claims.session_id', true)::text)
    with check (auth.uid() = user_id OR session_id = current_setting('request.jwt.claims.session_id', true)::text);

-- =====================================
-- 14️⃣ Order Items
-- =====================================
-- Stores individual items within an order
create table if not exists public.order_items (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade,
    variant_id uuid references public.product_variants(id) on delete set null,
    quantity int,
    price numeric(10,2)
);

alter table public.order_items enable row level security;

-- Policy for users to access items in their own orders
create policy "own_order_items" on public.order_items
    for all using (exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or o.session_id = current_setting('request.jwt.claims.session_id', true)::text)))
    with check (exists(select 1 from public.orders o where o.id = order_id and (o.user_id = auth.uid() or o.session_id = current_setting('request.jwt.claims.session_id', true)::text)));

-- =====================================
-- 15️⃣ Payments (Stripe)
-- =====================================
-- Stores payment transaction details
create table if not exists public.payments (
    id uuid primary key default uuid_generate_v4(),
    order_id uuid references public.orders(id) on delete cascade not null,
    user_id uuid references public.users(id) on delete set null null,
    session_id text null,
    stripe_payment_intent_id text unique not null,
    amount numeric not null,
    currency text default 'usd',
    status text default 'pending',
    created_at timestamptz default now()
);

alter table public.payments enable row level security;

-- Policy for users to access their own payments
create policy "own_payments" on public.payments
    for all using (user_id = auth.uid() OR session_id = current_setting('request.jwt.claims.session_id', true)::text)
    with check (user_id = auth.uid() OR session_id = current_setting('request.jwt.claims.session_id', true)::text);


-- =====================================
-- 16️⃣ Reviews
-- =====================================
-- Stores product reviews from users
create table if not exists public.reviews (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references public.users(id) on delete cascade not null,
    product_id uuid references public.products(id) on delete cascade not null,
    rating int not null check (rating >= 1 and rating <= 5),
    comment text,
    approved boolean default false,
    created_at timestamptz default now()
);

alter table public.reviews enable row level security;

-- Policy for users to access their own reviews
create policy "own_reviews" on public.reviews
    for all using (auth.uid() = user_id)
    with check (auth.uid() = user_id);

-- =====================================
-- 18️⃣ Discount Products (optional)
-- =====================================
-- Junction table to apply discounts to specific products
create table if not exists public.discount_products (
    discount_id uuid references public.discounts(id) on delete cascade,
    product_id uuid references public.products(id) on delete cascade,
    primary key(discount_id, product_id)
);

alter table public.discount_products enable row level security;

-- Policy for public read access to discount products
create policy "public_read_discount_products" on public.discount_products
    for select using (true);


-- =====================================
-- Initial Grants for Public Schema
-- =====================================
-- Grant usage on schema public to various roles
grant usage on schema public to anon, authenticated, service_role;

-- Grant all privileges on all tables in public schema to various roles
alter default privileges in schema public grant all on tables to anon, authenticated, service_role;
grant all privileges on all tables in schema public to anon, authenticated, service_role;

-- Grant all privileges on all sequences in public schema to various roles
alter default privileges in schema public grant all on sequences to anon, authenticated, service_role;
grant all privileges on all sequences in schema public to anon, authenticated, service_role;

-- Grant all privileges on all functions in public schema to various roles
alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
grant all privileges on all functions in schema public to anon, authenticated, service_role;

-- =====================================
-- Custom Policies and Functions
-- =====================================

-- Policy allowing service_role to insert into the orders table (for backend processes)
create policy "server_insert_orders"
on public.orders
for insert
to service_role
with check (true);

-- Function to handle new user creation from auth.users
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users(id, email, name, created_at)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', now());
  return new;
end;
$$ language plpgsql security definer; -- security definer ensures it runs with permissions of the function owner

-- Trigger to call handle_new_user function after a new user is created in auth.users
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();