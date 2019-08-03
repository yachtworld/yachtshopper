const router = require('express').Router()
const User = require('../db/models/user')
const Order = require('../db/models/order')
module.exports = router

const userNotFound = next => {
  const err = new Error('Not found')
  err.status = 404
  next(err)
}

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password
    })
    console.log('user', user)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me/orders', async (req, res, next) => {
  try {
    if (req.user) {
      const userOrders = await Order.findAll({
        where: {
          userId: req.user.id
        }
      })
      res.json(userOrders)
    } else {
      userNotFound(next)
    }
  } catch (error) {
    next(error)
  }
})

router.get('/me', (req, res, next) => {
  try {
    if (req.user) {
      res.json(req.user)
    } else {
      userNotFound(next)
    }
  } catch (err) {
    next(err)
  }
})

router.use('/google', require('./google'))
