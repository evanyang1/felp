const { Model, STRING } = require('sequelize')

class Post extends Model { }

Post.init({
  rest_name: STRING,
  address: STRING,
  text: STRING,
  raiting: STRING
}, { sequelize: require('../config'), modelName: 'post' })

module.exports = Post
