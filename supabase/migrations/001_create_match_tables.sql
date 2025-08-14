create table if not exists matchs (
  id uuid primary key default uuid_generate_v4(),
  match_number text not null,
  teams text not null,
  date date not null,
  location text
);

create table if not exists convocations (
  id uuid primary key default uuid_generate_v4(),
  match_id uuid references matchs(id) on delete cascade,
  license_number text not null,
  last_name text not null,
  first_name text not null,
  present boolean default false
);
