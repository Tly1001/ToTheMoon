const mongoose = require('mongoose')
const Schema = mongoose.Schema

const validateEmail = (email) => {
  const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return re.test(email)
}

const transactionEntry = new Schema({
  inCurrency: { 
    code: { type: String, required: true },
    amount: { type: Number, required: true } 
  },
  outCurrency: {  
    code: { type: String, required: true },
    amount: { type: Number, required: true } 
  },
  type: {
    type: String,
    enum: ['buy', 'sell']
  },
  cashValue: { type: Number },
  date: { type: Date }
})

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Valid email address is required',
    validate: [validateEmail, 'Please use a valid email address'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  firstName: {
    type: String,
    required: true,
    minlength: 1
  },
  lastName: {
    type: String,
    required: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    minlength: 1
  },
  bookmarks: [String],
  portfolio: {
    wallet: { type: Object },
    transactions: [transactionEntry]
  }
}, {
  timestamps: true
  // createdAt and updatedAt
})

const User = mongoose.model('User', userSchema)

module.exports = User