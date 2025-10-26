create table if not exists public.payments (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users on delete cascade,
  stripe_payment_intent_id text unique,
  amount numeric not null,
  currency text default 'usd',
  status text default 'pending' check (status in ('pending', 'succeeded', 'failed')),
  created_at timestamptz default now()
);

alter table public.payments enable row level security;

create policy "user_own_payments" on public.payments
  for select using (auth.uid() = user_id);

create policy "allow_insert" on public.payments
  for insert with check (true);