// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import {productsThunk, productThunk} from './product'
// import {expect} from 'Chai'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {
//     products: [],
//     singleProduct: {}
//   }

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('products', () => {
//     it('eventually dispatches the GET PRODUCTS action', async () => {
//       const fakeProductList = [{name: 'Atlantis'}, {name: 'Cave Cay'}]
//       mockAxios.onGet('/api/products').replyOnce(200, fakeProductList)
//       await store.dispatch(productsThunk())
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('GET_PRODUCTS')
//       expect(actions[0].data).to.be.deep.equal(fakeProductList)
//     })
//   })

//   describe('single product', () => {
//     it('eventually dispatches the SINGLE PRODUCT action', async () => {
//       const fakeProduct = {id: 1, name: 'Spectabilis'}
//       mockAxios.onGet(`/api/products/1`).replyOnce(200, fakeProduct)
//       await store.dispatch(productThunk(fakeProduct.id))
//       const actions = store.getActions()
//       expect(actions[0].type).to.be.equal('SINGLE_PRODUCT')
//       expect(actions[0].product).to.be.deep.equal(fakeProduct)
//     })
//   })
// })