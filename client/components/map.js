import React from 'react'
import {productsThunk} from '../store/product'
import {connect} from 'react-redux'
import MyMapComponent from './myMapComponent'
import {isNull} from 'util'

class MyMap extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
    window.initMap = function() {} //necessary because of Google Maps callback
  }

  render() {
    return (
      <MyMapComponent
        products={this.props.products}
        customHeight="700px"
        customCenter={[0, 0]}
      />
    )
  }
}

const mapPropsToState = state => {
  return {
    products: state.product.productList
  }
}

const mapDispatchToState = dispatch => {
  return {
    productsThunk: () => dispatch(productsThunk())
  }
}

export default connect(mapPropsToState, mapDispatchToState)(MyMap)
