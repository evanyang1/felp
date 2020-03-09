const router = require('express').Router()
const db = require('../config/index.js')

const { User, Post } = require('../models')

router.get('/posts', (req, res) => Post.findAll({ include: [User] })
  .then(posts => res.json(posts))
  .catch(e => console.error(e)))

router.post('/posts', (req, res) => Post.create(req.body)
  .then(() => res.sendStatus(200))
  .catch(e => console.error(e)))
  

// router.delete('/users/:id', (req, res) =>
//   User.delete({
//     where: {
//       userid: req.params.id
//     }
//   })
//     .then(user => res.json(user))
//     .catch(e => console.error(e)))
// router.delete('/posts/:id', (req, res) => {
//   db.query('DELETE FROM item WHERE ?', { id: req.params.id }, err => {
//     if (err) { console.log(err) }
//     res.sendStatus(200)
//   })
// })
module.exports = router