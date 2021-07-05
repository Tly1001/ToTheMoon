const router = require('express').Router()
const User = require('../models/user.model')

// GET all users (need to change to specific user)
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})

// POST new user
router.post('/register', (req, res) => {
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  const newUser = new User({ 
    firstName, 
    lastName 
  })

  newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

module.exports = router
