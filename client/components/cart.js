import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk} from '../store/cart'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
    this.props.getCartThunk()
  }

  render() {
    let {products} = this.props
    let cart = this.props.cart
    if (!cart) {
      cart = []
    }
    if (!products) {
      products = []
    }
    let cartProducts = []
    if (products.length && cart.length) {
      cartProducts = cart.map(elem => products[elem - 1])
    }

    return (
      <div>
        <h3>
          Your Cart:
          {
            <ul>
              {cartProducts.map((elem, index) => (
                <li key={index}>{elem.name}</li>
              ))}
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
    cart: state.cart || [],
    products: state.product.productList
  }
}

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk()),
  getCartThunk: () => dispatch(getCartThunk())
})

export default connect(mapState, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
//   email: PropTypes.string
// }
