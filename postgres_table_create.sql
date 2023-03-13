-- 
--PostgreSQL database Creation
--
--Connects to env file
\i .env

--This file sets up the structure of our database
-- 
--To invoke this file throw the below code in the terminal
--psql -d postgres://fzlocmxc:cSVvrq52FYy9AXvuGc2r6lwqoFnzEH82@trumpet.db.elephantsql.com/fzlocmxc -f postgres_table_create.sql
-------------------
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path','',false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
-------------------
-- CREATE EXTENSION pgcrypto;
-------------------
CREATE TABLE public.users (
   _id serial NOT NULL,
   full_name varchar NOT NULL,
   user_name varchar NOT NULL UNIQUE,
   email varchar NOT NULL UNIQUE,
   password_ varchar NOT NULL,
   ${TEST_TOKEN} BOOLEAN DEFAULT false,
   CONSTRAINT users_pk PRIMARY KEY ("_id")
) WITH (
   OIDS=FALSE
);
-------------------
--
--Test DATA for users
-- 'bf' is referring to the blowfish algorithm for CRYPT
--  removed password for testing-- , password_      , crypt('jdpassword', gen_salt('bf'))
-------------------
INSERT INTO public.users (full_name, user_name, email, password_) VALUES ('John Doe', 'JohnnyD', 'johnnyd@johnnyd.com','jdpassword');
-------------------


--To clear Table, uncomment the below line, and remove the '/'
--  --  --   D/R/O/P T/A/B/L/E public.users
--
--To retrieve the information
--
--  SELECT _id
--  FROM users
--  WHERE email = 'johnnyd@johnnyd.com'
--  AND password = crypt('jdpassword', password);
--
--  Expected Output
--
--  _id
--  ------
--  1
--  (1 row)
--
--  Example of Bad Password
--
--  SELECT _id
--  FROM users
--  WHERE email = 'johnnyd@johnnyd.com'
--  AND password = crypt('wrongpassword', password);
--
--  Expected Output
--
--  _id
--  ------
--  (0 rows)