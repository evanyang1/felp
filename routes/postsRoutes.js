const router = require('express').Router()
const db = require('../config/index.js')

const { User, Post } = require('../models')

// GET all posts
router.get('/posts', (req, res) => Post.findAll({ include: [User] })
  .then(posts => res.json(posts))
  .catch(e => console.error(e)))

// GET a post
router.get('/posts/:userid/', (req, res) => Post.findAll({ 
  where: {
    userId: req.params.userid
  }
})
  .then(posts => res.json(posts))
  .catch(e => console.error(e)))

// POST an posts
router.post('/posts', (req, res) => Post.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))

// DELETE an= post
router.delete('/posts/:id', (req, res) =>
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(posts => res.json(posts))
    .catch(e => console.error(e)))




module.exports = router
