// const {expect} = require('chai')
// const request = require('supertest')
// const db = require('../db')
// const app = require('../index')
// const User = db.model('user')

// describe('Cart routes', () => {
//   beforeEach(() => {
//     return db.sync({force: true})
//   })

//   describe('/api/cart/', () => {
//     const codysEmail = 'cody@email.com'
//     const ourCart = [1, 2, 3]

//     beforeEach(async () => {
//       return await User.create({
//         email: codysEmail,
//         cart: ourCart
//       })
//     })

//     it('GET /api/cart', async () => {
//       const res = await request(app)
//         .get('/api/cart')
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       console.log(res.body[0])
//       expect(res.body[0]).to.be.equal([])
//     })

//     it('PUT /api/cart', async () => {
//       const res = await request(app)
//         .put('/api/cart')
//         .send({
//           cart: ourCart
//         })
//         .expect(200)

//       expect(res.body).to.be.an('array')
//       expect(res.body[0].cart).to.be.equal([1, 2, 3])
//     })

//   })
// })
