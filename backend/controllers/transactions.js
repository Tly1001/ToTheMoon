const User = require('../models/user.model')

// POST buy/sell
// sample request {"token": "btc","amount": 500,"type": "buy"}
//TODO need to change to find user with token
//? maybe put into one function? very small variance
//? also maybe add cash value to transation history?
async function transaction(req, res) {
  try {
    const code = 'btc'
    const amount = req.body.amount
    const type = req.body.type

    const user = await User.findById(req.params.id)
    const newUser = JSON.parse(JSON.stringify(user))

    // wallet changes
    const wallet = newUser.portfolio.wallet

    // buy
    if (type === 'buy') {
      if (amount > wallet.gbp) throw new Error()
      // remove money
      wallet.gbp -= amount 
      // add crypto
      wallet[code] = (wallet[code] ? wallet[code] + amount : amount)
    }

    // sell
    if (type === 'sell') {
      if ( !wallet[code] || amount > wallet[code]) throw new Error()
      // add money
      wallet.gbp += amount 
      // remove crypto
      wallet[code] -= amount
    }

    // transaction history
    const transactions = newUser.portfolio.transactions
    const newEntry = createNewEntry(code, amount, type)
    transactions.push(newEntry)

    // save to db
    Object.assign(user, newUser)
    await user.save()
    res.status(202).json(user)
  } catch (err) {
    res.status(402).json({
      'Message': 'Unable to process request ' + err
    })
  }
}

function createNewEntry(code, amount, type) {
  const date = new Date()
  const newEntry = {
    currencyCode: code,
    //TODO do we need this property or make the amount a minus for sell?
    type: type,
    amount: amount,
    date: date
  }
  return newEntry
}

module.exports = {
  transaction
}