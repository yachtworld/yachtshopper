import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import reducer, {
  getCartThunk,
  addToCartThunk,
  deleteItemThunk,
  checkoutThunk
} from './cart'
import {expect} from 'Chai'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
describe('Cart routes', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = {cart: [], checkout: []}

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('get cart', () => {
      it('eventually dispatches the getCart action', async () => {
        const fakeCart = [1, 2]
        mockAxios.onGet('/api/cart').replyOnce(200, fakeCart)
        await store.dispatch(getCartThunk())
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_CART')
        expect(actions[0].data).to.be.deep.equal(fakeCart)
      })
    })

    describe('add to cart', () => {
      it('eventually dispatches the addToCart action', async () => {
        const fakeCartItem = {id: 5}
        mockAxios.onPut(`/api/cart/add`).replyOnce(200, fakeCartItem)
        await store.dispatch(addToCartThunk(fakeCartItem.id))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('ADD_TO_CART')
        expect(actions[0].product).to.be.deep.equal(5)
      })
    })

    describe('delete from cart', () => {
      it('eventually dispatches the getCart action', async () => {
        const fakeCartItem = {id: 5}
        mockAxios.onPut(`/api/cart/delete`).replyOnce(200, fakeCartItem)
        await store.dispatch(deleteItemThunk(fakeCartItem.id))
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_CART')
        expect(actions[0].product).to.be.deep.equal()
      })
    })

    describe('get checkout', () => {
      it('eventually dispatches the getCheckout action', async () => {
        const fakeCheckout = {cart: {cart: [], checkout: [1, 2]}}
        store = mockStore(fakeCheckout)
        mockAxios.onPut(`/api/cart/checkout`).replyOnce(200, fakeCheckout)
        await store.dispatch(checkoutThunk())
        const actions = store.getActions()
        console.log(actions[0])
        expect(actions[0].type).to.be.equal('GET_CHECKOUT')
        expect(actions[0].data).to.be.deep.equal(fakeCheckout.cart.checkout)
      })
    })
  })

  describe('reducer', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, {})).deep.equal({cart: [], checkout: []})
    })
  })
})
