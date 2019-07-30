import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  componentWillMount() {
    this.props.productsThunk()
  }

  render() {
    let {cart, products} = this.props
    if (!cart) {
      cart = []
    }
    if (!products) {
      products = []
    }
    let cartProducts = []
    if (products.length) {
      cartProducts = cart.map(elem => products[elem])
    }

    return (
      <div>
        <h3>
          Your Cart:
          {
            <ul>
              {cartProducts.map(elem => <li key={elem.id}>{elem.name}</li>)}
            </ul>
          }
        </h3>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    cart: state.user.cart || [],
    products: state.product.productList
  }
}

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk())
})

export default connect(mapState, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
//   email: PropTypes.string
// }
