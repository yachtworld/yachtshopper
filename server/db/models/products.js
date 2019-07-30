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
    type: Sequelize.DECIMAL(10, 2)
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
  }
})

module.exports = Products
