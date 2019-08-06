const Sequelize = require('sequelize')
const db = require('../db')

const Products = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imgUrl: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  location: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  sold: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  coords: {
    type: Sequelize.ARRAY(Sequelize.FLOAT),
    allowNull: true,
    defaultValue: null
  }
})

module.exports = Products
