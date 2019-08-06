import React from 'react'
import {expect} from 'chai'
import Enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import store from '../store'

const adapter = new Adapter()
Enzyme.configure({adapter})

import AllProducts from './allProducts'
import Cart from './cart'
import SingleProduct from './SingleProduct'
import CarouselHeader from './carousel'
import NotFound from './notFound'
import Home from './home'

describe('React', () => {
  describe('<AllProducts /> component', () => {
    let wrapper
    let renderWrapper

    beforeEach('Create component', () => {
      // 'shallow' is a method provided by the enzyme library.
      // It performs a 'virtual render', the component, just as if a parent component had rendered it (or just as if
      // we passed it to ReactDOM.render). However, it doesn't render to the real DOM. Instead, it returns a 'wrapper'.
      // This 'wrapper' object contains information about what the rendered component would look like, and provides
      // useful methods for testing it.
      wrapper = shallow(
        <AllProducts store={store}>
          <CarouselHeader store={store} />
        </AllProducts>
      )
      // console.log(renderWrapper.debug())
      // console.log('debug console', wrapper.debug())
      // console.log(wrapper.props().children.props.productsThunk)
    })

    it('expects productsThunk to be a function', () => {
      expect(wrapper.props().children.props.productsThunk).to.be.a('function')
    })

    it('expects addToCartThunk to be a function', () => {
      expect(wrapper.props().children.props.addToCartThunk).to.be.a('function')
    })

    // it('expect one table to be rendered', () => {
    //   expect(renderWrapper.find('.all-products-div')._root.length).to.equal(1)
    // })
  }) // end <AllProducts /> component

  describe('<SingleProduct /> component', () => {
    let wrapper
    let renderWrapper

    beforeEach('Create component', () => {
      wrapper = shallow(<SingleProduct store={store} />)
      renderWrapper = render(<SingleProduct store={store} />)
      // console.log(renderWrapper)
      // console.log(wrapper.debug())
      // console.log(wrapper.props().children.props)
    })

    it('expects productThunk to be a function', () => {
      expect(wrapper.props().children.props.productThunk).to.be.a('function')
    })

    it('expect one table to be rendered', () => {
      expect(renderWrapper.find('.single-product-div')._root.length).to.equal(1)
    })

    describe('<SingleProduct /> component', () => {
      beforeEach('Create component', () => {
        wrapper = shallow(<SingleProduct store={store} />)
        renderWrapper = render(<SingleProduct store={store} />)
      })

      it('expects productThunk to be a function', () => {
        expect(wrapper.props().children.props.productThunk).to.be.a('function')
      })

      it('expect one table to be rendered', () => {
        expect(renderWrapper.find('.single-product-div')._root.length).to.equal(
          1
        )
      })
    }) // end <SingleProduct /> component

    describe('<NotFound /> component', () => {
      beforeEach('Create component', () => {
        wrapper = shallow(<NotFound />)
      })

      it('renders a not found message in an h2', () => {
        expect(
          wrapper
            .find('h2')
            .text()
            .trim()
        ).to.equal(
          'Sorry, the island you are looking for is in the Bermuda Triangle'
        )
      })
    }) // end <NotFound /> component

    describe('<Home /> component', () => {
      beforeEach('Create component', () => {
        wrapper = shallow(<Home />)
      })

      it('renders a welcome message in an h1', () => {
        expect(
          wrapper
            .find('h1')
            .text()
            .trim()
        ).to.equal('Welcome To Your New Paradise')
      })

      it('renders three links', () => {
        expect(wrapper.find('Link').length).to.equal(3)
      })
    }) // end <Home /> component
  })
}) // end React specs
