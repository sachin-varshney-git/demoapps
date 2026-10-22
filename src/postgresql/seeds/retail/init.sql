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

-- Product Catalog Service: add product data
-- Retail vertical (brand: Everline) -- placeholder demo catalog, see
-- src/frontend/verticals/retail.ts for the matching brand config and
-- src/image-provider/static-src/retail/products/ for the matching imagery.
INSERT INTO catalog.products (id, name, description, picture, price_currency_code, price_units, price_nanos, categories)
VALUES
    ('RT-0001', 'Trailhead Daypack', 'A 22-liter daypack built for weekend trails and daily commutes alike. Padded straps, a ventilated back panel, and a dedicated hydration sleeve keep it comfortable whether you''re packing for a summit or a subway ride.', 'TrailheadDaypack.svg', 'USD', 58, 990000000, 'outdoor,bags'),
    ('RT-0002', 'AeroFit Running Shoes', 'Lightweight everyday trainers with a breathable knit upper and responsive foam midsole. Designed for road miles, gym sessions, and everything in between.', 'AeroFitRunningShoes.svg', 'USD', 89, 0, 'apparel,footwear'),
    ('RT-0003', 'PulseWave Wireless Earbuds', 'True wireless earbuds with active noise cancellation and a 30-hour case battery. Secure fit, punchy bass, and a single-tap pairing experience.', 'PulseWaveWirelessEarbuds.svg', 'USD', 74, 500000000, 'electronics,audio'),
    ('RT-0004', 'Summit Insulated Jacket', 'A packable insulated jacket rated for cold-weather commutes and alpine starts. Water-resistant shell, recycled fill, stows into its own pocket.', 'SummitInsulatedJacket.svg', 'USD', 139, 0, 'apparel,outerwear'),
    ('RT-0005', 'Lumen Smart Desk Lamp', 'A dimmable LED desk lamp with adjustable color temperature and a USB-C charging port built into the base. Tap controls, no app required.', 'LumenSmartDeskLamp.svg', 'USD', 42, 750000000, 'home,lighting'),
    ('RT-0006', 'CascadeBrew Pour-Over Kettle', 'A gooseneck kettle designed for precise, slow pours. Stainless steel body with a heat-resistant handle and a built-in thermometer.', 'CascadeBrewPourOverKettle.svg', 'USD', 36, 0, 'home,kitchen'),
    ('RT-0007', 'TrailMate Stainless Water Bottle', 'Double-wall insulated bottle that keeps drinks cold for 24 hours or hot for 12. Leak-proof cap, wide mouth for easy cleaning and ice.', 'TrailMateWaterBottle.svg', 'USD', 24, 990000000, 'accessories,outdoor'),
    ('RT-0008', 'NovaCharge Portable Power Bank', '10,000mAh power bank with dual USB-C ports and pass-through charging. Slim enough for a jacket pocket, strong enough for a full phone charge and change.', 'NovaChargePowerBank.svg', 'USD', 29, 990000000, 'electronics,accessories'),
    ('RT-0009', 'Horizon Canvas Tote Bag', 'Heavyweight cotton canvas tote with reinforced stitching and an interior pocket. Built for grocery runs, gym gear, or everyday carry.', 'HorizonCanvasToteBag.svg', 'USD', 19, 500000000, 'accessories,bags'),
    ('RT-0010', 'Driftwood Cutting Board Set', 'A two-piece acacia wood cutting board set with juice grooves and built-in handles. Finished with food-safe oil, ready to use out of the box.', 'DriftwoodCuttingBoardSet.svg', 'USD', 45, 0, 'home,kitchen');
