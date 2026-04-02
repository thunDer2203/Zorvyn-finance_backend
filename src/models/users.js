const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['viewer','analyst','admin'] },
  active: { type: Number, enum: [1, 0], default: 1 }
});

module.exports = mongoose.model('User', userSchema);