/* Replace with your SQL commands */

--create table users
create extension if not exists "uuid-ossp"; /* to auto increment*/
CREATE TABLE users(
  id uuid default uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(50) UNIQUE,
  user_name VARCHAR(50) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);