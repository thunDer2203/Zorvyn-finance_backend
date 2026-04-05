# 🏦 Zorvyn Finance Backend

A secure, scalable backend system for managing users and financial records, built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication using HTTP-only cookies
- Secure login and logout system
- Role-based access control:
  - **Admin**: Full system access (users + records)
  - **Analyst**: Read access to records and summaries
  - **Viewer/User**: Limited or read-only access
- Protected routes using authentication middleware

---

### 👤 User Management
- Create, update, and delete users (Admin only)
- Fetch all users (excluding sensitive data like passwords)
- Update user attributes:
  - username
  - role
  - active status
  - password (hashed)
- Secure user deletion with password verification

---

### 💰 Financial Records Management
- Create, update, delete financial records
- Store:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filter records by:
  - Date range
  - Category
  - Type
- Dynamic query-based filtering via a single API

---

### 📊 Financial Summary & Analytics
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Recent transactions
- Monthly trends (income & expense)
- Weekly trends (income & expense)

---

### 🧾 Validation & Data Integrity
- Input validation using **Joi**
- Strict type enforcement (no invalid data allowed)
- Optional fields supported for update operations
- Prevents malformed or incomplete data from entering the database
- Centralized validation middleware for consistency
- Returns clear and structured error messages

---

### 🛡️ Security
- Password hashing using **bcrypt**
- JWT authentication stored in **HTTP-only cookies**
- Protected routes using middleware
- Role-based authorization system
- Rate limiting using `express-rate-limit`
- Environment variables managed using `.env`

---

### ⚙️ Error Handling
- Centralized error handling strategy
- Proper HTTP status codes:
  - `400` – Bad Request
  - `401` – Unauthorized
  - `403` – Forbidden
  - `500` – Server Error
- Consistent API error response format

---

## 🧠 System Workflow

1. Admin creates users and assigns roles
2. Users log in and receive authentication token (cookie)
3. Based on role:
   - Viewer → read-only access
   - Analyst → read + summary access
   - Admin → full control
4. Financial data is created and managed
5. Dashboard endpoints return aggregated insights

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser
- dotenv
- express-rate-limit
- Joi

---

## 📂 Project Structure

```
src/
│
├── controllers/     # Business logic
├── middleware/      # Auth, validation, role checks
├── models/          # Mongoose schemas
├── routes/          # API routes
├── validators/      # Joi schemas
├── config/          # DB configuration
├── utils/           # Helper functions
│
└── index.js        # Entry point
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/thunDer2203/Zorvyn-finance_backend.git
cd Zorvyn-finance_backend
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Setup environment variables

Create a `.env` file:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NODE_ENV=development
```

---

### 4. Run the server

```bash
npm run dev
```

---

## 📡 API Endpoints

### 🔐 Auth Routes
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

---

### 👤 User Routes
```
GET    /api/users/getusers
PUT    /api/users/update/:id
DELETE /api/users/delete/:id
```

---

### 💰 Finance Routes
```
POST   /api/finance/add
GET    /api/finance/records
GET    /api/finance/getsummary
PUT    /api/finance/update/:id
DELETE /api/finance/delete/:id
```

---

## 📊 API Documentation

Postman Documentation:  
https://documenter.getpostman.com/view/36762923/2sBXiomVe4  

---

## 🚧 Future Improvements

- Pagination & sorting
- Search functionality
- Soft delete implementation
- Unit & integration testing
- Caching for performance
- Deployment (Docker / cloud)
- WebSockets for real-time updates

---

## 🧠 Key Design Decisions

- Separation of concerns (MVC architecture)
- Aggregation pipelines for analytics
- Middleware-based validation and authorization
- Optimized queries using MongoDB aggregation
- Scalable and modular structure

---

## 📄 License

This project is intended for learning and demonstration purposes.