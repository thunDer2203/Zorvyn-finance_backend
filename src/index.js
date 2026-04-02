const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const { connectDB } = require('./lib/db.js');
const authRoutes = require('./routes/auth.route.js');
const financeRoutes=require('./routes/finance.js');


connectDB();
const app = express();
dotenv.config();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});