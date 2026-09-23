-- Robust Code — orders table (Neon Postgres)
-- Run this once in the Neon SQL Editor (Neon Dashboard -> your project ->
-- SQL Editor). Not run automatically by anything in this repo.

CREATE TABLE IF NOT EXISTS orders (
  id                 BIGSERIAL PRIMARY KEY,
  stripe_session_id  TEXT UNIQUE NOT NULL,
  product_slug       TEXT,
  customer_email     TEXT,
  customer_name      TEXT,
  shipping_address   JSONB,
  amount_total       NUMERIC(10, 2),
  currency           TEXT,
  status             TEXT NOT NULL DEFAULT 'paid', -- paid | ordered | shipped | canceled
  tracking_number    TEXT,
  carrier             TEXT,
  notes              TEXT,
  created_at         TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at         TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders (status);
CREATE INDEX IF NOT EXISTS orders_product_slug_idx ON orders (product_slug);

-- Example queries you'll actually use, in Neon's own SQL Editor / Table view:
--
-- See everything, newest first:
--   SELECT * FROM orders ORDER BY created_at DESC;
--
-- Orders still waiting to be placed with the supplier:
--   SELECT * FROM orders WHERE status = 'paid' ORDER BY created_at ASC;
--
-- Mark one as ordered with the supplier:
--   UPDATE orders SET status = 'ordered', updated_at = now() WHERE stripe_session_id = 'cs_...';
--
-- Mark one as shipped with tracking:
--   UPDATE orders SET status = 'shipped', tracking_number = '...', carrier = 'bpost', updated_at = now()
--   WHERE stripe_session_id = 'cs_...';
