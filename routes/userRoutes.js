const router = require('express').Router()
const db = require('../config/index.js')

const { User, Post } = require('../models')

// GET all users
router.get('/users', (req, res) => User.findAll({ include: [Post] })
  .then(users => res.json(users))
  .catch(e => console.error(e)))

// GET one user
router.get('/users/:username/:useremail', (req, res) => User.findOne({
  where: {
    username: req.params.username,
    email: req.params.useremail
  },
  include: [Post]
})
  .then(user => {
    console.log(user)
    res.json(user)
  })
  .catch(e => console.error(e)))

// POST an user
router.post('/users', (req, res) =>

  User.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e)))


// DELETE an user
router.delete('/users/:id', (req, res) =>
  User.delete({
    where: {
      userid: req.params.id
    }
  })
    .then(user => res.json(user))
    .catch(e => console.error(e)))


module.exports = router
