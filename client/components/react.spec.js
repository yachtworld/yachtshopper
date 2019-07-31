import React from 'react'
import {expect} from 'chai'
import Enzyme, {shallow, render} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import store from '../store'

const adapter = new Adapter()
Enzyme.configure({adapter})

import AllProducts from './allProducts'

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
      wrapper = shallow(<AllProducts store={store} />)
      renderWrapper = render(<AllProducts store={store} />)
      console.log(renderWrapper)
      // console.log(wrapper.debug())
      // console.log(wrapper.props().children.props)
    })

    //
    // has state
    //

    it('expects productsThunk to be a function', () => {
      expect(wrapper.props().children.props.productsThunk).to.be.a('function')
    })

    it('expects addToCartThunk to be a function', () => {
      expect(wrapper.props().children.props.addToCartThunk).to.be.a('function')
    })

    it('expect one table to be rendered', () => {
      expect(renderWrapper.find('.all-products-div')._root.length).to.equal(1)
    })
  }) // end <AdoptionForm /> component
}) // end React specs
