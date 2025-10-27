-- 1. products
create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price numeric not null,
  currency text default 'usd',
  image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 2. carts
create table public.carts (
  user_id uuid references auth.users primary key,
  items jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- 3. wishlists
create table public.wishlists (
  user_id uuid references auth.users primary key,
  items jsonb default '[]'::jsonb,
  updated_at timestamptz default now()
);

-- 4. users (розширення профілю)
create table public.users (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  avatar_url text,
  phone text,
  address jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS
alter table public.products enable row level security;
alter table public.carts enable row level security;
alter table public.wishlists enable row level security;
alter table public.users enable row level security;

-- Доступ до продуктів — всім
create policy "public_read_products" on public.products
  for select using (true);

-- carts & wishlists — тільки власник
create policy "own_cart" on public.carts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_wishlist" on public.wishlists
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own_profile" on public.users
  for all using (auth.uid() = id) with check (auth.uid() = id);