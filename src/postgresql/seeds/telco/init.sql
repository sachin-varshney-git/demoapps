-- Copyright The OpenTelemetry Authors
-- SPDX-License-Identifier: Apache-2.0

-- Enable pg_stat_statements in the default postgres database
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Create application user
CREATE USER astronomy_user WITH PASSWORD 'astronomy_password';

-- Create application database
CREATE DATABASE astronomy_db OWNER astronomy_user;

-- Create monitoring user with pg_monitor role (visibility on all databases and schemas)
CREATE USER monitoring_user WITH PASSWORD 'monitoring_password';
GRANT pg_monitor TO monitoring_user;

-- Switch to the application database
\connect astronomy_db

-- Enable pg_stat_statements in the application database
CREATE EXTENSION IF NOT EXISTS pg_stat_statements;

-- Accounting Service: create a schema
CREATE SCHEMA accounting;
GRANT USAGE ON SCHEMA accounting TO astronomy_user;

-- Accounting Service: create tables
CREATE TABLE accounting."order" (
    order_id TEXT PRIMARY KEY
);

CREATE TABLE accounting.shipping (
    shipping_tracking_id TEXT PRIMARY KEY,
    shipping_cost_currency_code TEXT NOT NULL,
    shipping_cost_units BIGINT NOT NULL,
    shipping_cost_nanos INT NOT NULL,
    street_address TEXT,
    city TEXT,
    state TEXT,
    country TEXT,
    zip_code TEXT,
    order_id TEXT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES accounting."order"(order_id) ON DELETE CASCADE
);

CREATE TABLE accounting.orderitem (
    item_cost_currency_code TEXT NOT NULL,
    item_cost_units BIGINT NOT NULL,
    item_cost_nanos INT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INT NOT NULL,
    order_id TEXT NOT NULL,
    PRIMARY KEY (order_id, product_id),
    FOREIGN KEY (order_id) REFERENCES accounting."order"(order_id) ON DELETE CASCADE
);

-- Accounting Service: grant permission to schema
GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA accounting TO astronomy_user;

-- Product Catalog Service: create a schema
CREATE SCHEMA catalog;
GRANT USAGE ON SCHEMA catalog TO astronomy_user;

-- Product Catalog Service: create tables
CREATE TABLE catalog.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    picture TEXT,
    price_currency_code TEXT NOT NULL,
    price_units BIGINT NOT NULL,
    price_nanos INT NOT NULL,
    categories TEXT
);

-- Product Catalog Service: grant permission to schema
GRANT SELECT ON ALL TABLES IN SCHEMA catalog TO astronomy_user;

-- TODO(vertical-pack): stub catalog only, brand: Wavelength. Replace with
-- real plan/device data and matching imagery in
-- src/image-provider/static-src/telco/products/ when this vertical gets built out.
INSERT INTO catalog.products (id, name, description, picture, price_currency_code, price_units, price_nanos, categories)
VALUES
    ('TC-0001', 'Unlimited 5G Plan', 'Placeholder Telco vertical entry -- unlimited data, nationwide 5G. Replace with real product content.', 'placeholder.svg', 'USD', 0, 0, 'plans,mobile'),
    ('TC-0002', 'Home Fiber 500', 'Placeholder Telco vertical entry -- 500 Mbps symmetric fiber. Replace with real product content.', 'placeholder.svg', 'USD', 0, 0, 'plans,broadband'),
    ('TC-0003', 'NovaPhone 12', 'Placeholder Telco vertical entry -- flagship device, available on plan financing. Replace with real product content.', 'placeholder.svg', 'USD', 0, 0, 'devices,phones');
