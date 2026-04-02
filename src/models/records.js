const mongoose=require('mongoose');

const recordSchema = new mongoose.Schema({
  amount: Number,
  type: { type: String, enum: ['income','expense'] },
  category:  { type: String, enum: ['Groceries','Utilities','Entertainment','Business','Miscellaneous','Income'] },
  date: {
    type: Date,
    default: Date.now
  },
  notes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Records', recordSchema);