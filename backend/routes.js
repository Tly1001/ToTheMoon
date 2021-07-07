const router = require('express').Router()
const auth = require('./controllers/auth')
const user = require('./controllers/user')
const secureRoute = require('./lib/secureRoute')

// auth

router.route('/register')
  .post(auth.register)

router.route('/login')
  .post(auth.login)

// users

router.route('/user/:id')
  .get(user.getUser)
  .put(secureRoute, user.updateUser)

module.exports = router
