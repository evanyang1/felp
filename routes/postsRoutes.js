const router = require('express').Router()
const db = require('../config/index.js')

// GET all posts
router.get('/posts', (req, res) => Post.findAll({ include: [User] })
  .then(users => res.json(users))
  .catch(e => console.error(e)))

// POST an posts
router.post('/posts', (req, res) => Post.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))




module.exports = router
