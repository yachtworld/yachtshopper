import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk, checkoutThunk} from '../store/cart'
import {Table} from 'react-bootstrap'

/**
 * COMPONENT
 */
class Checkout extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
    this.props.checkoutThunk()
  }

  render() {
    let {products, checkout} = this.props

    if (!products) {
      products = []
    }
    let cartProducts = []
    if (products.length && checkout.length) {
      cartProducts = checkout.map(elem => products[elem - 1])
    }

    if (!checkout) {
      checkout = []
    }
    return (
      <div>
        <h3>
          Success! Your order has been submitted.:
          <Table className="cart-products-div">
            <tbody>
              {cartProducts.map((elem, index) => (
                <tr key={index} className="cart-products-row">
                  <td className="cart-products-img-td">
                    <img src={elem.imgUrl} className="cart-products-img" />
                  </td>
                  <td>{elem.name}</td>
                  <td>${elem.price}</td>
                </tr>
              ))}
              <tr>
                <td>
                  <h4>Order Total:</h4>
                </td>
                <td />
                <td>
                  ${cartProducts.reduce((a, b) => a + parseInt(b.price, 10), 0)}
                </td>
              </tr>
            </tbody>
          </Table>
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
    cart: state.cart.cart || [],
    products: state.product.productList,
    checkout: state.cart.checkout || []
  }
}

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk()),
  getCartThunk: () => dispatch(getCartThunk()),
  checkoutThunk: () => dispatch(checkoutThunk())
})

export default connect(mapState, mapDispatchToProps)(Checkout)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
//   email: PropTypes.string
// }
