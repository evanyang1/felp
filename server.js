require('dotenv').config()
const express = require('express')
const { join } = require('path')
const app = express()

const morgan = require('morgan')

app.use(morgan('tiny'))

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(require('./routes'))


require('./config').sync()
  .then(() => app.listen(process.env.PORT||3000))
  .catch(e => console.error(e))

