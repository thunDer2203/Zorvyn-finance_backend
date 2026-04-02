const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./lib/db.js');
const authRoutes = require('./routes/auth.route.js');
const financeRoutes=require('./routes/finance.js');
const rateLimit = require("express-rate-limit");




dotenv.config();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 mins
    max: 100, // max 100 requests
    message: "Too many requests, try later"
});



connectDB();
const app = express();
app.use(limiter);
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});