const User = require('../models/user.model')

// POST purchase
//TODO need to change to find user with token
//TODO add transaction logic
async function purchase(req, res) {
  try {
    const buyCode = 'btc'
    const buyAmount = req.body.buyAmount

    const user = await User.findById(req.params.id)
    const newUser = JSON.parse(JSON.stringify(user))
    const wallet = newUser.portfolio.wallet
    if (buyAmount > wallet.gbp) throw new Error()

    // remove money
    wallet.gbp -= buyAmount 
    // add crypto
    wallet[buyCode] = (wallet[buyCode] ? wallet[buyCode] + buyAmount : buyAmount)

    Object.assign(user, newUser)
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.status(402).json({
      'Message': 'Unable to process request ' + err
    })
  }
}

module.exports = {
  purchase
}