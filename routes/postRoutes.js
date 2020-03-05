const router = require('express').Router()
const { Post } = require('../models')

app.get('/posts', (req, res) => Post.findAll({ include: [User] })
  .then(posts => res.json(posts))
  .catch(e => console.error(e)))

app.post('/posts', (req, res) => Post.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))
