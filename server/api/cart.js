const router = require('express').Router()
const {User, Products, Order} = require('../db/models')

module.exports = router

// middleware for security: checking that our current user is the same as the one on our session
// router.use(function(req, res, next) {
//   if (req.user.id !== req.session.passport.user) {
//     res
//       .sendStatus(405)
//       .send({error: 'User validation error. Method not allowed.'})
//   }
//   next()
// })

router.get('/', async (req, res, next) => {
  try {
    // console.log('user', req.user)
    if (req.user.id === req.session.passport.user) {
      const user = await User.findByPk(req.session.passport.user)
      const userCart = await user.getProducts()
      res.json(userCart.map(item => item.id))
    }
    res.status(500).send([])
  } catch (error) {
    res.send([])
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const product = await Products.findByPk(req.body.id)
    user.addProduct(product)
    const allProducts = await user.getProducts()
    res.json(allProducts.map(item => item.id)).sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const order = await user.getProducts()
    user.setProducts([])
    let userOrders = await Order.findAll({where: {userId: req.user.id}})
    let orderId = Math.max(
      ...userOrders.map(product => parseInt(product.orderId, 10))
    )

    if (orderId && isFinite(orderId)) {
      orderId += 1
    } else {
      orderId = 1
    }
    order.forEach(async item => {
      await Order.create({
        userId: user.id,
        productId: item.id,
        orderId: orderId,
        productName: item.name
      })
      await Products.update({sold: true}, {where: {id: item.id}})
    })
    res.json(order.map(product => product.id)).sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const product = await Products.findByPk(req.body.id)
    await user.removeProduct(product)
    const newCart = await user.getProducts()
    res.json(newCart.map(item => item.id)).sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

process.on('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('unhandledRejection', error.message)
})
