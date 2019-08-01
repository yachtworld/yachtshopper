import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {checkoutThunk} from './cart'
import {expect} from 'Chai'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
describe('Cart routes', () => {
  describe('thunk creators', () => {
    let store
    let mockAxios

    const initialState = []

    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    describe('get checkout', () => {
      it('eventually dispatches the getCheckout action', async () => {
        const fakeCart = [1, 2]
        mockAxios.onGet(`/api/cart/`).replyOnce(200, fakeCart)
        mockAxios.onPut(`/api/cart/checkout`).replyOnce(200, fakeCart)
        await store.dispatch(checkoutThunk())
        const actions = store.getActions()
        console.log(actions[0])
        expect(actions[0].type).to.be.equal('GET_CHECKOUT')
        expect(actions[0].data).to.be.deep.equal(fakeCart)
      })
    })
  })
})
