const router = require('express').Router()
const {Products} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll({order: [['id', 'ASC']]})
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Products.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// for admin to add a product
router.post('/', async (req, res, next) => {
  try {
    const product = await Products.create(req.body)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    console.log('REQ BODY', req.params.id)
    await Products.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204)
  } catch (err) {
    next(err)
  }
})
