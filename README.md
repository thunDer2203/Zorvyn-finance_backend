# 🏦 Zorvyn Finance Backend

A secure, scalable backend system for managing users and financial records, built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication using HTTP-only cookies
- Secure login and logout system
- Role-based access control:
  - **Admin**: Full system access
  - **Analyst**: Read + analytics access
  - **Viewer/User**: Read-only access
- Protected routes using middleware

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
- Supports:
  - Amount
  - Type (income / expense)
  - Category
  - Date
  - Notes
- Filtering by:
  - Date
  - Category
  - Type

---

### 📊 Financial Summary & Analytics
- Total income
- Total expenses
- Net balance
- Category-wise totals
- Recent activity
- Monthly trends
- Weekly trends

---

### 🧾 Validation & Data Integrity
- Input validation using **Joi**
- Ensures correct data types before database entry
- Optional fields supported for update operations
- Prevents invalid or malformed data
- Centralized validation middleware
- Returns structured error responses

---

### 🛡️ Security
- Password hashing using **bcrypt**
- JWT stored in HTTP-only cookies
- Protected routes via middleware
- Role-based authorization
- Rate limiting using `express-rate-limit`
- Environment variables managed via `.env`

---

### ⚙️ Error Handling
- Proper HTTP status codes:
  - 400 → Bad Request
  - 401 → Unauthorized
  - 403 → Forbidden
  - 500 → Server Error
- Centralized error responses
- Consistent API response structure

---

## 🧠 System Workflow

1. Admin creates users and assigns roles  
2. Users authenticate and receive JWT cookie  
3. Access is controlled based on roles  
4. Financial records are created and managed  
5. Summary endpoints provide analytics  

---

## 🗄️ Database Schema Overview

### 👤 User Model

- name: String  
- email: String (unique)  
- password: String (hashed)  
- role: "admin" | "analyst" | "viewer"  
- isActive: Boolean  
- createdAt: Date  

---

### 💰 Record Model

- amount: Number  
- type: "income" | "expense"  
- category: String  
- date: Date  
- notes: String  
- createdAt: Date  

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
├── middleware/      # Auth, validation, roles
├── models/          # Mongoose schemas
├── routes/          # API routes
├── validators/      # Joi validation schemas
├── config/          # Database config
├── utils/           # Helper functions
│
└── server.js        # Entry point
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

### 🔐 Auth
```
POST /api/auth/signup
POST /api/auth/login
POST /api/auth/logout
```

---

### 👤 Users
```
GET    /api/users/getusers
PUT    /api/users/:id
DELETE /api/users/:id
```

---

### 💰 Finance
```
POST   /api/finance/add
GET    /api/finance/records
GET    /api/finance/summary
PUT    /api/finance/update/:id
DELETE /api/finance/delete/:id
```

---

## 📊 API Documentation

Postman Docs:  
https://documenter.getpostman.com/view/36762923/2sBXiomVe4  

---

## 🚧 Future Improvements

- Pagination & sorting  
- Search functionality  
- Soft delete  
- Unit & integration tests  
- Caching for performance  
- Deployment (Docker / cloud)  
- WebSockets for real-time updates  

---

## 🧠 Key Design Decisions

- MVC architecture (separation of concerns)  
- Aggregation pipelines for analytics  
- Middleware-based validation and auth  
- Modular and scalable folder structure  
- Efficient MongoDB queries  

---

## 📄 License

This project is for learning and demonstration purposes.
