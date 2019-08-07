const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Products = db.model('products')

describe('Cart routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/cart/', () => {
    const codysEmail = 'cody@email.com'
    const product = {name: 'island'}
    let user

    beforeEach(async () => {
      user = await User.create({
        email: codysEmail
      })
      const island = await Products.create(product)
      user.addProduct(island)
    })

    it('GET /api/cart', async () => {
      const res = await request(app)
        .get('/api/cart')
        .set({user: user})
        .expect(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.be.deep.equal([])
    })
  })
})
