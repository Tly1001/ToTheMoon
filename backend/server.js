const createError = require('http-errors')
const express = require('express')
const cors = require('cors')
// const mongoose = require('mongoose') // used later to establish connectkon to mongoDB
const path = require('path')
const cookieParser = require('cookie-parser')

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')

const app = express()
const port = process.env.PORT || 8000

// Middleware

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/user', userRouter)
app.use('/', indexRouter)

// connect to mongoDB
//TODO URI FROM ATLAS NEEDS TO BE ADDED TO .ENV
// const uri = process.env.ATLAS_URI; 
// mongoose.connect(uri, { useNewParser: true, useCreateIndex: true})

// const connection = mongoose.connection
// connection.once('open', () => {
//   console.log('MongoDB database connection established successfully')
// })

// starter log
app.use((req, res, next) => {
  console.log(`Incoming Request Method ${req.method} to ${req.url}`)
  next()
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(port, () => console.log('Express is up and listening')) //* <-- ask our app to listen for requests, it will listen on localHost: 8000.

module.exports = app
