const router = require('express').Router()
const {User, Order} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    if (req.user.admin === true) {
      res.json(users)
    } else {
      res.send('You are not authorized to view this page.')
    }
  } catch (err) {
    next(err)
  }
})
router.get('/orders', async (req, res, next) => {
  try {
    const userOrders = await Order.findAll({
      where: {
        userId: req.user.id
      }
    })
    res.json(userOrders)
  } catch (error) {
    next(error)
  }
})
