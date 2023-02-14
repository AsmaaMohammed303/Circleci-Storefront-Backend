# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- update(args: id) [token required]: `'Products/' [GET] (token)`
- getSpecificProduct(args: id) [token required]: `'Products/:id' [GET] (token)`
- create (args: Product)  `'Products/' [POST] (token)`
- delete(args: id) [token required]: `'Products/:id' [DELETE] (token)`
- deleteAllProducts [token required]
- getAllProducts [token required]

#### Users
- update(args: id) [token required]: `'users/' [GET] (token)`
- getSpecificUser(args: id) [token required]: `'users/:id' [GET] (token)`
- create (args: User)  `'users/' [POST] (token)`
- delete(args: id) [token required]: `'users/:id' [DELETE] (token)`
- deleteAllUsers [token required]
- authenticateUser ( args: email , password) 
- getAllUsers [token required]

#### Orders
- update(args: id) [token required]: `'Orders/' [GET] (token)`
- getSpecificOrder(args: id) [token required]: `'Orders/:id' [GET] (token)`
- create (args: Order)  `'Orders/' [POST] (token)`
- delete(args: id) [token required]: `'Orders/:id' [DELETE] (token)`
- deleteAllOrders [token required]
- getAllOrders [token required]

## Data Shapes
#### Products
-  id
- pro_name
- price

```
Table: Product (id:uuid[primary key], pro_name:varchar(100)[not null], price:float[not null])
```
#### Users
- id
- first_name
- last_name
- password
- email
- user_name
```
Table: Users (id:uuid[primary key], first_name: varchar (100)[not null], last_name:varchar(100)[not null], password:varchar(100)[not null],email :varchar(150)[not null],user_name varchar(100)[not null])
```
#### Orders
- id of each product in the order
- product_id 
- quantity of each product in the order


```
Table: Orders (id:uuid[primary key], product_id:integer(foreign key to products table), quantity:integer[default 1])
```
