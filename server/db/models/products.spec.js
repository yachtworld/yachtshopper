// Assertions
const {expect} = require('chai')
const db = require('../index')
const Products = db.model('products')

describe('Products model', () => {
  describe('Validations', () => {
    it('requires `name`', async () => {
      const product = Products.build()

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed without `name`'
        )
      } catch (err) {
        expect(err.message).to.contain('name cannot be null')
      }
    })

    it('requires `name` to not be an empty string', async () => {
      const product = Products.build({
        name: ''
      })

      try {
        await product.validate()
        throw Error(
          'validation was successful but should have failed if name is an empty string'
        )
      } catch (err) {
        expect(err.message).to.contain('Validation error')
      }
    })
  })
})
