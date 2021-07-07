const router = require('express').Router()
const User = require('../models/user.model')


// GET user data
async function getUser(req, res) {
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
async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id)
    // Check if user exists
    if (!user) throw new Error('User not found')
    // Check if user is same as currentUser
    // if (!user.equals(req.currentUser._id)) throw new Error('Unauthorised')
    Object.assign(user, req.body)
    await user.save()
    res.status(200).json(user)
  } catch (err) {
    res.status(404).json({ 'Message': 'Not Found ' + err })
  }
}


module.exports = { getUser, updateUser }
