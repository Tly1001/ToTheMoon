const router = require('express').Router()
const auth = require('./controllers/auth')
const user = require('./controllers/user')
const transactions = require('./controllers/transactions')

// auth

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

// users

router.route('/user/update/:id')
  .put(user.updateUser)

router.route('/user/:id')
  .get(user.getUser)

module.exports = router

// transactions

router.route('/purchase/:id')
  .put(transactions.purchase)
