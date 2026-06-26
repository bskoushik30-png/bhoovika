create table if not exists public.erp_items (
  id text primary key,
  collection text not null,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists erp_items_collection_created_at_idx
  on public.erp_items (collection, created_at desc);
