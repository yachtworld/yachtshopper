const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    res.json(user.cart)
  } catch (error) {
    res.send([])
  }
})

router.put('/add', async (req, res, next) => {
  try {
    const oldCart = await User.findByPk(req.user.id)
    const newCart = await oldCart.update({
      cart: [...oldCart.cart, req.body.id]
    })
    res.json(newCart)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/checkout', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    const checkout = await user.update({
      cart: [],
      checkoutCart: req.body.data
    })
    res.json(checkout)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    const oldCart = await User.findByPk(req.user.id)
    let firstIndex = oldCart.cart.indexOf(parseInt(req.body.id, 10))
    const newCart = await oldCart.update({
      cart: oldCart.cart
        .slice(0, firstIndex)
        .concat(oldCart.cart.slice(firstIndex + 1))
    })
    res.json(newCart.cart)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})
