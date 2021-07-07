const User = require('../models/user.model')

// POST purchase
//TODO need to change to find user with token
//? maybe put into one function? very small variance
//? also maybe add cash value to transation history?
async function purchase(req, res) {
  try {
    const buyCode = 'btc'
    const buyAmount = req.body.buyAmount

    const user = await User.findById(req.params.id)
    const newUser = JSON.parse(JSON.stringify(user))

    // wallet changes
    const wallet = newUser.portfolio.wallet
    if (buyAmount > wallet.gbp) throw new Error()
    // remove money
    wallet.gbp -= buyAmount 
    // add crypto
    wallet[buyCode] = (wallet[buyCode] ? wallet[buyCode] + buyAmount : buyAmount)

    // transaction history
    const transactions = newUser.portfolio.transactions
    const newEntry = createNewEntry(buyCode, buyAmount, true)
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

// POST sell
async function sell(req, res) {
  try {
    const sellCode = 'btc'
    const sellAmount = req.body.sellAmount

    const user = await User.findById(req.params.id)
    const newUser = JSON.parse(JSON.stringify(user))

    // wallet changes
    const wallet = newUser.portfolio.wallet
    if ( !wallet[sellCode] || sellAmount > wallet[sellCode]) throw new Error()
    // add money
    wallet.gbp += sellAmount 
    // remove crypto
    wallet[sellCode] -= sellAmount

    // transaction history
    const transactions = newUser.portfolio.transactions
    const newEntry = createNewEntry(sellCode, sellAmount, false)
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

function createNewEntry(code, amount, isBuying) {
  const date = new Date()
  const newEntry = {
    currencyCode: code,
    type: isBuying ? 'buy' : 'sell',
    amount: amount,
    date: date
  }
  return newEntry
}

module.exports = {
  purchase,
  sell
}