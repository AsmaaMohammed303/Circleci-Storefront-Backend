#### ----------------------------------------------------------------------------

# Build A Storefront Backend In Udacity

Build a JavaScript API based on a requirements given by the stakeholders,
architect the database, its tables and columns to fulfill the data requirements and craft a RESTful API that exposes that information to the frontend developer

#### ----------------------------------------------------------------------------

## Installation and Instructions:

This section contains all the packages `npm install` used in this project and how to install them.

## migration

`npm install dotenv`
`npm add pg`
`npm add --save-dev @types/pg`
`npm add db-migrate db-migrate-pg`

### DataBase Creation

`create database store_dev;`
`create database store_test;`

## table cretaion

`npx db-migrate create users-table --sql-file`

#### bcrypt

`npm add bcrypt`
`npm i @types/bcrypt`

#### jsonwebtoken

`npm install jsonwebtoken `
`npm i @types/jsonwebtoken`

#### supertest

`npm i supertest`
`npm i --save-dev @types/supertest`

#### ----------------------------------------------------------------------------

## Environmental Variables Set up

Bellow are the environmental variables that needs to be set in a `.env` file. This is the default setting that I used for development, but you can change it to what works for you.

```
port = 3000
NODE_ENV =dev
POSTGRES_HOST = 'localhost'
POSTGRES_PORT = '5432'
POSTGRES_DB = 'store_dev'
POSTGRES_DB_TEST = 'store_test'
POSTGRES_USER = 'postgres'
POSTGRES_PASSWORD = '###'
BCRYPT_PASSWORD='###'
SALT_ROUNDS = 10
TOKEN_SECRET = '###'

```

#### ----------------------------------------------------------------------------

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>
```

#### ----------------------------------------------------------------------------

## Scripts and testing

    "dev": "nodemon src/index.ts",
    "build": "tsc",
    "start": "npm run build && build/index.js",
    "prettier": "prettier --write src/**/*.ts",
    "lint:fix": "eslint . --ext .ts --fix",
    "migration:run": "db-migrate up"
