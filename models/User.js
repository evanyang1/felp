const { Model, STRING } = require('sequelize')

class User extends Model { }

User.init({
  username: {
    type: STRING,
    allowNull: false,
    unique: false
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: false,
    isEmail: true
  }
}, { sequelize: require('../config'), modelName: 'user' })

module.exports = User
