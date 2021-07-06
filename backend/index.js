const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const router = require('./routes')

const env = require('dotenv').config().parsed
const app = express()
const port = env.PORT || 8000

// Middleware

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// connect to mongoDB
mongoose.connect( env.ATLAS_URI, { useNewUrlParser: true, useUnifiedTopology: true, createIndexes: true })
mongoose.connection.once('open', () => console.log('MongoDB database connection established successfully'))

app.use('/api', router)

app.listen(port, () => console.log('Express is up and listening on port ' + port))
