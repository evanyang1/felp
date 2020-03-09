const { Model, STRING , INTEGER} = require('sequelize')

class Post extends Model { }

Post.init({
  rest_name: STRING,
  rest_id: INTEGER,
  text: STRING,
  rating: INTEGER
}, { sequelize: require('../config'), modelName: 'post' })

module.exports = Post
