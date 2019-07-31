import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk} from '../store/cart'
import {Table, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {checkoutThunk} from '../store/checkoutCart'

/**
 * COMPONENT
 */
class Checkout extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
    this.props.getCartThunk()
    this.props.checkoutThunk()
  }

  render() {
    let {products, cart, checkout} = this.props

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

    if (!checkout) {
      checkout = []
    }

    console.log('CHECKOUT', checkout)

    return (
      <div>
        <h3>
          Your Cart:
          <Table className="all-products-div">
            <tbody>
              {cartProducts.map((elem, index) => (
                <tr key={index} className="all-products-row">
                  <td className="all-products-img-td">
                    <img src={elem.imgUrl} className="all-products-img" />
                  </td>
                  <td>{elem.name}</td>
                  <td>${elem.price}</td>
                  <td>
                    <Button
                      type="button"
                      id={elem.id}
                      variant="outline-danger"
                      onClick={this.handleClick}
                    >
                      Remove from cart
                    </Button>
                  </td>
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
                <td>
                  <Link to="/checkout">
                    <Button type="button" variant="outline-success">
                      Submit order
                    </Button>
                  </Link>
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
    cart: state.cart || [],
    products: state.product.productList,
    checkout: state.checkoutCart || []
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
