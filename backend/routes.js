const router = require('express').Router()
const auth = require('./controllers/auth')
const User = require('./models/user.model')






// auth

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

// users

router.route()