const router = require('express').Router()
const User = require('../models/user.model')

// GET user data 
//TODO change to feed back specific info, not sure what info yet

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    // .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err))
})



  newUser.save()
    .then(() => res.json('User registered!'))
    .catch(err => res.status(400).json('Error: ' + err))
})

// PUT update User
//TODO need to look into the schema again, maybe move bookmarks, cash and portfolio into one property?
router.put('/update/:id', (req, res) => {
  User.findById(req.params.id)
    .then( user => {
      user.email = req.body.email
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.password = req.body.password
      user.bookmarks = req.body.bookmarks
      user.cash = req.body.cash
      user.portfolio = req.body.portfolio

      user.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch( err => res.status(400).json('Error: ' + err))
})

// Delete User?




module.exports = router