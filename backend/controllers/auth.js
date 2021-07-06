const User = require('../models/user.model')
// const jwt = require('jsonwebtoken')

//POST login user (tested)
async function login(req, res) {
  try {
    // * find the user by their email
    const user = await User.findOne({ email: req.body.email })

    // * if they dont exist or password doesnt match throw an error
    if (!user || !user.validatePassword(req.body.password)) 
      throw new Error()
    
    // * send the token to them in response
    res.status(202).json({ 
      message: `Welcome back ${user.firstName}`
    })

  } catch (err) {
    res.status(401).json({ message: 'Unauthorized ' + err })
  }
}

// POST new user
//TODO testing: check if has default mula
async function register(req, res) {
  try {
    const user = await User.create(req.body)
    res.status(201).json({ message: ` Welcome ${user.firstName}` })
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = { register, login }
