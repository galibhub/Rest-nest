# 🏠 RentNest Backend API

<p align="center">
  <b>A secure and scalable Rental Property Management REST API built with Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT Authentication, and Stripe Payment Integration.</b>
</p>

<p align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

</p>

---

## 🔗 Live Links

| Resource | Link |
|----------|------|
| 🚀 Live API | https://restnest-backend-pied.vercel.app |
| 💻 GitHub Repository | https://github.com/galibhub/Rest-nest |

---

# 📖 Project Overview

RentNest is a secure RESTful backend API designed for a rental property marketplace. The platform allows landlords to manage rental properties, tenants to request and rent properties, and administrators to monitor the entire system.

The application follows a role-based access control (RBAC) architecture using JWT authentication and provides secure APIs for property management, rental requests, online payments, user management, and reviews.

---

# ✨ Key Features

### 🔐 Authentication & Authorization

- JWT Authentication
- Secure Password Hashing (bcryptjs)
- Role-Based Authorization
- Protected Private Routes

---

### 🏠 Property Management

- Create Property
- Update Property
- Delete Property
- Get Single Property
- Get All Properties
- Search Properties
- Pagination Support
- Property Availability Management

---

### 📂 Category Management

- Create Category
- Get All Categories

---

### 📝 Rental Request System

- Submit Rental Request
- Approve Rental Request
- Reject Rental Request
- View Rental History
- Admin Rental Monitoring

---

### 💳 Stripe Payment Integration

- Secure Checkout Session
- Payment Verification
- Payment History
- Payment Details
- Automatic Rental Activation after Successful Payment

---

### ⭐ Review System

- Create Review
- Update Review
- Delete Review
- View Reviews

---

### 👨‍💼 Admin Features

- View All Users
- Block / Unblock Users
- View All Properties
- Manage Rental Requests
- Category Management

---

### ✅ Other Features

- Input Validation using Zod
- Prisma ORM
- PostgreSQL Database
- Centralized Error Handling
- Clean Project Structure
- Modular Architecture
- TypeScript Support
- RESTful API Design

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | PostgreSQL |
| ORM | Prisma ORM |
| Authentication | JWT (JSON Web Token) |
| Password Hashing | bcryptjs |
| Validation | Zod |
| Payment Gateway | Stripe |
| API Testing | Postman |
| Deployment | Vercel |

---

# 📂 Project Structure

```text
rest-nest-backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│   ├── app/
│   │   ├── config/
│   │   ├── lib/
│   │   ├── middleware/
│   │   ├── module/
│   │   │   ├── auth/
│   │   │   ├── user/
│   │   │   ├── category/
│   │   │   ├── property/
│   │   │   ├── rental-request/
│   │   │   ├── payment/
│   │   │   └── review/
│   │   ├── routes/
│   │   └── utils/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
├── tsconfig.json
└── vercel.json
```

The project follows a **modular architecture**, where each feature is organized into its own module with controllers, services, routes, validations, and interfaces for better maintainability and scalability.

---

# ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/galibhub/Rest-nest.git
```

### 2️⃣ Navigate to the Project

```bash
cd Rest-nest
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Configure Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
DATABASE_URL=

JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=

BCRYPT_SALT_ROUNDS=

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

PORT=3000
NODE_ENV=development
```

> **Note:** Never commit your `.env` file or sensitive credentials to GitHub.

---

# ▶️ Running the Application

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

---

# 📜 Available Scripts

| Script | Description |
|---------|-------------|
| `npm run dev` | Starts the development server with hot reload |
| `npm run build` | Builds the project using TSUP |
| `npm start` | Runs the compiled production build |

---

# 🔐 Authentication & Authorization

The application uses **JWT (JSON Web Token)** for authentication.

After a successful login, an **Access Token** is returned. This token must be included in the `Authorization` header for protected routes.

```http
Authorization: Bearer <your_access_token>
```

### Supported Roles

- 👤 Tenant
- 🏠 Landlord
- 👨‍💼 Admin

Role-based authorization ensures users can access only the resources permitted for their role.

---

# 🗄️ Database

The application uses **PostgreSQL** with **Prisma ORM** to manage relational data efficiently.

### Core Entities

- Users
- Categories
- Properties
- Rental Requests
- Payments
- Reviews

Prisma provides type-safe database queries, schema management, and migration support.

---

# 🛡️ Validation & Error Handling

### Request Validation

All incoming requests are validated using **Zod** to ensure data integrity before processing.

### Error Handling

The application includes centralized error handling for consistent API responses, covering:

- Validation Errors
- Authentication Errors
- Authorization Errors
- Resource Not Found
- Database Errors
- Internal Server Errors

# 📡 API Endpoints

## 🔐 Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get authenticated user |

---

## 👤 User Management (Admin)

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/users` | Get all users |
| PATCH | `/api/users/:id/status` | Update user status |

---

## 📂 Categories

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/categories` | Create category |
| GET | `/api/categories` | Get all categories |

---

## 🏠 Properties

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/properties` | Create property |
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get property details |
| PATCH | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |
| GET | `/api/properties/admin` | Get all properties (Admin) |

---

## 📝 Rental Requests

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/rentals` | Submit rental request |
| GET | `/api/rentals/landlord` | Get landlord rental requests |
| PATCH | `/api/rentals/:id/approve` | Approve rental request |
| PATCH | `/api/rentals/:id/reject` | Reject rental request |
| GET | `/api/rentals/admin` | Get all rental requests (Admin) |

---

## 💳 Payments

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payments/create-checkout-session` | Create Stripe checkout session |
| GET | `/api/payments` | Get payment history |
| GET | `/api/payments/:id` | Get payment details |

---

## ⭐ Reviews

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/reviews` | Create review |
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/:id` | Get single review |
| PATCH | `/api/reviews/:id` | Update review |
| DELETE | `/api/reviews/:id` | Delete review |

---

# 🔄 Rental Workflow

```text
Tenant
   │
   ▼
Browse Properties
   │
   ▼
Submit Rental Request
   │
   ▼
Pending
   │
   ▼
Landlord Approves
   │
   ▼
Stripe Checkout
   │
   ▼
Payment Successful
   │
   ▼
Rental Status → ACTIVE
   │
   ▼
Leave Review
```

---

# 💳 Payment Workflow

```text
Approved Rental Request
          │
          ▼
Create Checkout Session
          │
          ▼
Stripe Hosted Payment
          │
          ▼
Payment Successful
          │
          ▼
Webhook Verification
          │
          ▼
Payment Saved
          │
          ▼
Rental Status Updated
```

---

# 👥 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| 👨‍💼 Admin | admin@gmail.com | 12345678 |
| 🏠 Landlord | landlord@gmail.com | 12345678 |
| 👤 Tenant | tenant@gmail.com | 12345678 |

---

# 🚀 Deployment

The application is deployed on **Vercel**.

### Live API

```
https://restnest-backend-pied.vercel.app
```

---

# 📬 API Testing

The API endpoints can be tested using **Postman** by importing the provided collection.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Ibrahim Ahmed Galib**

- 🎓 B.Sc. in Computer Science & Engineering
- 🏫 Daffodil International University
- 💻 GitHub: https://github.com/galibhub

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
Made with ❤️ using Express.js, TypeScript, Prisma ORM, PostgreSQL, JWT & Stripe.
</p>
