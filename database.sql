-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE items (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "note" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "quantity" INTEGER NOT NULL, 
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE item_changes (
    "id" SERIAL PRIMARY KEY,
    "item_id" INTEGER REFERENCES items(id) ON DELETE CASCADE,
    "change" INTEGER NOT NULL,
    "changed_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);