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

router.put('/delete', async (req, res, next) => {
  try {
    await Products.destroy({
      where: {
        id: req.body.id
      }
    })

    const products = await Products.findAll({order: [['id', 'ASC']]})
    console.log('PRODUCTS', products)
    res.json(products).sendStatus(200)
  } catch (error) {
    res.send({error: 'cart not found'})
  }
})
