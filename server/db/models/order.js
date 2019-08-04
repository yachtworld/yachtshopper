const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderId: Sequelize.INTEGER,
  productName: Sequelize.STRING
})

module.exports = Order
