const router = require('express').Router()
const { User } = require('../models')

router.get('/users', (req, res) => User.findAll({ include: [Post] })
  .then(users => res.json(users))
  .catch(e => console.error(e)))

router.get('/users/:username', (req, res) => User.findOne({
    where: {
      username: req.params.username
    },
    include: [Post]
})
    .then(user => res.json(user))
    .catch(e => console.error(e)))

router.post('/users', (req, res) => User.create(req.body)
    .then(() => res.sendStatus(200))
    .catch(e => console.error(e)))

module.exports = router