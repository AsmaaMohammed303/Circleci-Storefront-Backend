/* Replace with your SQL commands */

/* Replace with your SQL commands */
--drop table orders;
create extension if not exists "uuid-ossp"; /* to auto increment*/
CREATE TABLE orders(
  id uuid default uuid_generate_v4() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id), 
  quantity FLOAT NOT NULL
);