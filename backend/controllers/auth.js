const User = require('../models/user.model')
const jwt = require('jsonwebtoken')

//POST login user (tested)
async function login(req, res) {
  try {
    // * find the user by their email
    const user = await User.findOne({ email: req.body.email })

    // * if they dont exist or password doesnt match throw an error
    // if (!user || !user.validatePassword(req.body.password))
    //   throw new Error()

    const token = jwt.sign({ sub: user._id }, process.env.SECRET, { expiresIn: '7 days' })

    // * send the token to them in response
    res.status(202).json({
      message: `Welcome back ${user.firstName}`,
      token
    })

  } catch (err) {
    res.status(401).json({ message: 'Unauthorized ' + err })
  }
}

// POST new user (tested)
async function register(req, res) {
  try {
    const freeMoney = { wallet: { gbp: 10000 } }
    const user = await User.create({ ...req.body, portfolio: freeMoney })
    console.log('this is user', user)
    res.status(201).json({ message: ` Welcome ${user.firstName}` })
  } catch (err) {
    res.status(422).json(err)
  }
}

module.exports = { register, login }
