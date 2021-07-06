const router = require('express').Router()
const User = require('../models/user.model')

// GET user data 
//TODO test
async function showInfo(req, res) {
  try {
    const user = await User.findById(req.params.id)
    if (!user) throw new Error()
    user.password = null
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ 'Message': 'Not Found ' + err })
  }
}

// PUT update User
//TODO convert and put into try catch
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


module.exports = router