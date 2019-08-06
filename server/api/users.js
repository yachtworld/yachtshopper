const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

const unauthErr = next => {
  const err = new Error('You are not authorized to view this page.')
  err.status = 500
  next(err)
}

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'name', 'admin']
    })
    if (req.user) {
      if (req.user.admin === true) {
        res.json(users)
      } else {
        unauthErr(next)
      }
    } else {
      unauthErr(next)
    }
  } catch (err) {
    next(err)
  }
})

router.put('/delete', async (req, res, next) => {
  try {
    if (req.user) {
      if (req.user.admin === true) {
        await User.destroy({
          where: {
            id: req.body.id
          }
        })

        const users = await User.findAll({order: [['id', 'ASC']]})
        res.json(users).sendStatus(200)
      } else {
        unauthErr(next)
      }
    } else {
      unauthErr(next)
    }
  } catch (error) {
    res.send({error: 'user not found'})
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    if (req.body.email === '') {
      req.body.email = user.email
    }
    const updateUser = await user.update({
      name: req.body.name,
      address: req.body.address,
      email: req.body.email
    })
    res.json(updateUser)
  } catch (error) {
    next(error)
  }
})
