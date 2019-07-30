import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import {productsThunk, productThunk} from './product'
import {expect} from 'Chai'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {
    products: [],
    singleProduct: {}
  }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('products', () => {
    it('eventually dispatches the GET PRODUCTS action', async () => {
      const fakeProductList = [{name: 'Atlantis'}, {name: 'Cave Cay'}]
      mockAxios.onGet('/api/products').replyOnce(200, fakeProductList)
      await store.dispatch(productsThunk())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCTS')
      expect(actions[0].data).to.be.deep.equal(fakeProductList)
    })
  })

  describe('single product', () => {
    it('eventually dispatches the SINGLE PRODUCT action', async () => {
      const fakeProduct = {id: 1, name: 'Spectabilis'}
      mockAxios.onGet(`/api/products/1`).replyOnce(200, fakeProduct)
      await store.dispatch(productThunk(fakeProduct.id))
      const actions = store.getActions()
      console.log(actions[0])
      expect(actions[0].type).to.be.equal('SINGLE_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
})

// describe('redux store', () => {
//   describe('action creators', () => {
//     const islandList = { id: 1, name: 'Starfleet Academy' };
//     let mock;
//     before(() => {
//       mock = new MockAdapter(axios);
//     });
//     afterEach(() => {
//       mock.reset();
//     });
//     after(() => {
//       mock.restore();
//     });
//     describe('`addCampusAction`', () => {
//       it('creates an ADD_CAMPUS action', () => {
//         const addCampusAction = addCampus(starfleetCampus);
//         expect(addCampusAction.type).to.equal(ADD_CAMPUS);
//         expect(addCampusAction.campus).to.eql(starfleetCampus);
//       });
//     });
//     describe('`postCampus`', () => {
//       it('returns a thunk to post a new campus to the backend and dispatch an ADD_CAMPUS action', async () => {
//         mock.onPost('/api/campuses').replyOnce(201, starfleetCampus);
//         await store.dispatch(postCampus(starfleetCampus));
//         const actions = store.getActions();
//         expect(actions[0].type).to.equal('ADD_CAMPUS');
//         expect(actions[0].campus).to.deep.equal(starfleetCampus);
//         await Campus.findById(1);
//       });
//     });
//   });
//   describe('reducer', () => {
//     it('returns a new state with the newly created campus added to the list of campuses', () => {
//       const remoteCampus = { id: 1, name: 'Fullstack Remote Campus' };
//       const starfleetCampus = { id: 2, name: 'Starfleet Academy' };
//       initialState.campuses = [remoteCampus];
//       const newState = reducer(initialState, {
//         type: ADD_CAMPUS,
//         campus: starfleetCampus,
//       });
//       expect(newState.campuses.length).to.equal(2);
//       expect(
//         newState.campuses.find(
//           campus => campus.name === 'Starfleet Academy'
//         )
//       ).to.deep.equal(starfleetCampus);
//       expect(newState.students).to.equal(initialState.students);
//       expect(newState.selectedCampus).to.equal(initialState.selectedCampus);
//     });
//   });
