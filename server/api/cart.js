const router = require('express').Router()
const {User, Products, Order} = require('../db/models')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const userCart = await user.getProducts()
    res.json(userCart.map(item => item.id))
  } catch (error) {
    res.send([])
  }
})

router.put('/add', async (req, res, next) => {
  try {
    if (req.user.id === req.session.passport.user) {
      const user = await User.findByPk(req.user.id)
      const product = await Products.findByPk(req.body.id)
      user.addProduct(product)
      const allProducts = await user.getProducts()
      res.json(allProducts.map(item => item.id))
    }
    res.sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    // we need to check if the user who is making the checkout is the same one that is logged in?
    if (req.user.id === req.session.passport.user) {
      const user = await User.findByPk(req.user.id)
      const order = await user.getProducts()
      user.setProducts([])
      let userOrders = await Order.findAll({where: {userId: req.user.id}})
      let orderId = Math.max(userOrders.map(product => product.orderId))
      if (orderId) orderId++
      else orderId = 1
      order.forEach(async item => {
        await Order.create({
          userId: user.id,
          productId: item.id,
          orderId: orderId
        })
        await Products.update({sold: true}, {where: {id: item.id}})
      })
      res.json(order.map(product => product.id))
    }
    res.sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    if (req.user.id === req.session.passport.user) {
      const user = await User.findByPk(req.user.id)
      const product = await Products.findByPk(req.body.id)
      await user.removeProduct(product)
      const newCart = await user.getProducts()
      res.json(newCart.map(item => item.id))
    }
    res.sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})
