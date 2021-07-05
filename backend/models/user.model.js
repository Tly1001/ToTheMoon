const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
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
  cash: Number,
  portfolio: {
    aggregates: {},
    purchaseHistory: {}
  }
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)

module.exports = User