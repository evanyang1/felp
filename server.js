require('dotenv').config()
const express = require('express')
const { join } = require('path')
const app = express()

app.use(express.static(join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// app.use(require('./routes'))

// require('./config').sync()
//   .then(() => app.listen(process.env.PORT || 3000))
//   .catch(e => console.error(e))

<<<<<<< HEAD
=======
const { User, Post } = require('./models')

app.get('/users', (req, res) => User.findAll({ include: [Post] })
  .then(users => res.json(users))
  .catch(e => console.error(e)))

app.get('/users/:username', (req, res) => User.findOne({
  where: {
    username: req.params.username
  },
  include: [Post]
})
  .then(user => res.json(user))
  .catch(e => console.error(e)))

app.post('/users', (req, res) => User.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))

app.get('/posts', (req, res) => Post.findAll({ include: [User] })
  .then(posts => res.json(posts))
  .catch(e => console.error(e)))

app.post('/posts', (req, res) => Post.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))

>>>>>>> ea4bc7425065c243047335c686ee809fb3646387
require('./config').sync()
  .then(() => app.listen(process.env.PORT||3000))
  .catch(e => console.error(e))

