# 🏦 Zorvyn Finance Backend

A secure and scalable backend system for managing user authentication and financial records, built using Node.js, Express, and MongoDB.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication using HTTP-only cookies
- Secure login and logout
- Admin-controlled user creation
- Role-based access control (Admin, Analyst, User)

### 👤 User Management
- Create users (Admin only)
- View all users (excluding passwords)
- Update user details (username, role, active status, password)
- Delete users with password verification

### 💰 Financial Records
- Add income and expense records
- Update and delete records
- Filter records by category, type, and date
- Generate financial summaries (income, expenses, balance)

### 🛡️ Security
- Password hashing using bcrypt
- JWT authentication
- Protected routes with middleware
- Role-based authorization

---

## 🧠 System Workflow

1. Admin logs in
2. Admin creates and manages users
3. Users log in to the system
4. Admin manages financial records
5. Analysts view and filter records
6. Summary endpoint provides financial insights

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

---

## 📂 Project Structure

```
src/
│── controllers/
│── lib/
│── middleware/
│── models/
│── routes/
```

---

## ⚙️ Installation

### 1. Clone the repository

git clone https://github.com/thunDer2203/Zorvyn-finance_backend.git  
cd Zorvyn-finance_backend  

---

### 2. Install dependencies

npm install  

---

### 3. Setup environment variables

Create a `.env` file:

PORT=3000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_secret_key  
NODE_ENV=development  

---

### 4. Run the server

npm run dev  

---

## 📡 API Endpoints

### Auth Routes
POST /api/auth/signup  
POST /api/auth/login  
POST /api/auth/logout  

### User Routes
GET /api/users/getusers

PUT /api/update/:id  
DELETE /api/delete/:id  

### Finance Routes
POST /api/finance/add  
GET /api/finance/records  
GET /api/finance/getsummary  
PUT /api/finance/update/:id  
DELETE /api/finance/delete/:id  

---

## 🔐 Authentication

Uses JWT stored in HTTP-only cookies.

---

## 📊 API Documentation

Postman Docs: https://documenter.getpostman.com/view/36762923/2sBXiomVe4  

---

## 🚧 Future Improvements

- Pagination
- Search
- Soft delete
- Tests
- Deployment

---

## 📄 License

For assignment/demo purposes.
