const router = require('express').Router()
const {User, Products} = require('../db/models')

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
    const user = await User.findByPk(req.user.id)
    const product = await Products.findByPk(req.body.id)
    user.addProduct(product)
    const allProducts = await user.getProducts()
    res.json(allProducts.map(item => item.id))
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const order = await user.getProducts()
    user.setProducts([])
    order.forEach(item => user.addOrder(item))
    res.json(order.map(product => product.id))
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
    res.json(newCart.map(item => item.id))
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})
