# RentNest Backend API 🏠

A secure RESTful backend API for a rental property marketplace built
with Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT and Stripe.

## Repository

-   https://github.com/galibhub/Rest-nest
-   Live API: https://restnest-backend-pied.vercel.app

## Features

-   JWT Authentication & Role Based Authorization
-   Property CRUD
-   Category Management
-   Rental Request Management
-   Stripe Payment Integration
-   Payment History
-   Review System
-   Admin Dashboard APIs
-   Pagination, Search & Filtering
-   Zod Validation
-   Centralized Error Handling

## Tech Stack

-   Node.js
-   Express.js
-   TypeScript
-   PostgreSQL
-   Prisma ORM
-   JWT
-   Stripe
-   Zod
-   bcryptjs

## Project Structure

``` text
src/
├── config
├── lib
├── middleware
├── module
│   ├── auth
│   ├── user
│   ├── category
│   ├── property
│   ├── rental-request
│   ├── payment
│   └── review
├── utils
├── app.ts
└── server.ts
```

## Installation

``` bash
git clone https://github.com/galibhub/Rest-nest.git
cd Rest-nest
npm install
```

Create a .env file

``` env
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=
BCRYPT_SALT_ROUNDS=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
PORT=
NODE_ENV=
```

``` bash
npm run dev
npm run build
npm start
```

## Demo Credentials

  Role       Email                Password
  ---------- -------------------- ----------
  Admin      admin@gmail.com      12345678
  Landlord   landlord@gmail.com   12345678
  Tenant     tenant@gmail.com     12345678

## License

MIT

## Author

Ibrahim Ahmed Galib
