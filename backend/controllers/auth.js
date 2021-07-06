//GET login user
const User = require('../models/user')
// const jwt = require('jsonwebtoken')

async function login(req, res) {
  try {
    // * find the user by their email
    const user = await User.findOne({ email: req.body.email })

    // * if they dont exist or password doesnt match throw an error
    if (!user || !user.validatePassword(req.body.password)) 
      throw new Error()
    
    // * send the token to them in response
    res.status(202).json({ 
      message: `Welcome back ${user.firstName}`,
    })

  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

// POST new user
//TODO test
async function register(req, res) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password

  const newUser = new User({ 
    email,
    firstName, 
    lastName,
    password,
    bookmarks: [],
    portfolio: {
      wallet: {},
      transactions: {}
    }
  })}