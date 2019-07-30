const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id)
    console.log('user cart', user.cart)
    res.json(user.cart)
  } catch (error) {
    res.send([])
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    const oldCart = await User.findByPk(req.user.id)
    const newCart = await oldCart.update({
      cart: [...oldCart.cart, req.body.id]
    })
    res.json(newCart)
  } catch (error) {
    res.send({error: 'cart not found'})
    next(error)
  }
})
