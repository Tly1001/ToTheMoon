const User = require('../models/user.model')

// POST buy/sell
// sample request {
// 	"inCurrency": {
// 		"code": "btc",
// 		"amount": 10
// 	},
// 	"outCurrency": {
// 		"code": "gbp",
// 		"amount": 10
// 	},
// 	"cashValue": 1,
// 	"type": "buy"
// }
//TODO need to change to find user with token
//? also maybe add cash value to transation history?
async function transaction(req, res) {
  try {
    const inCurrency = req.body.inCurrency
    const outCurrency = req.body.outCurrency
    const cashValue = req.body.cashValue
    const type = req.body.type

    const user = await User.findById(req.params.id)
    const newUser = JSON.parse(JSON.stringify(user))

    // wallet changes
    const wallet = newUser.portfolio.wallet

    // buy
    if (type === 'buy') {
      if (cashValue > wallet.gbp) throw new Error()
      // remove money
      wallet.gbp -= cashValue 
      // add crypto
      wallet[inCurrency.code] = (wallet[inCurrency.code] ? wallet[inCurrency.code] + inCurrency.amount : inCurrency.amount)
    }

    // sell
    if (type === 'sell') {
      if ( !wallet[outCurrency.code] || cashValue > wallet[outCurrency.code]) throw new Error()
      // add money
      wallet.gbp += cashValue 
      // remove crypto
      wallet[outCurrency.code] -= outCurrency.amount
    }

    // transaction history
    const transactions = newUser.portfolio.transactions
    const newEntry = createNewEntry(inCurrency, outCurrency, type, cashValue)
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

function createNewEntry(inCurrency, outCurrency, type, cashValue ) {
  const date = new Date()
  const newEntry = {
    inCurrency: inCurrency,
    outCurrency: outCurrency,
    type: type,
    cashValue: cashValue,
    date: date
  }
  console.log('this is in new entry', newEntry)
  return newEntry
}

module.exports = {
  transaction
}