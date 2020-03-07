const router = require('express').Router()
const { User } = require('../models')

router.get('/users', (req, res) => User.findAll({ include: [Post] })
  .then(users => res.json(users))
  .catch(e => console.error(e)))

router.get('/users/:username', (req, res) => User.findOne({
    where: {
      username: req.params.username,
      email: req.params.useremail
    },
    include: [Post]
})
    .then(user => res.json(user))
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