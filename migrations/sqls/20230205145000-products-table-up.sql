/* Replace with your SQL commands */

create extension if not exists "uuid-ossp"; /* to auto increment*/
CREATE TABLE products(
  id uuid default uuid_generate_v4() PRIMARY KEY,
  proName VARCHAR(150) NOT NULL,
  price FLOAT NOT NULL
);