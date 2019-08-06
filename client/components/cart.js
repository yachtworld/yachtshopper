import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk, deleteItemThunk, clearCart} from '../store/cart'
import {Table, Button} from 'react-bootstrap'
import {numberWithCommas} from './utils'

/**
 * COMPONENT
 */
class Cart extends React.Component {
  constructor() {
    super()
    this.handleClick = this.handleClick.bind(this)
    this.handleCheckout = this.handleCheckout.bind(this)
  }
  componentDidMount() {
    this.props.productsThunk()
    this.props.getCartThunk()
  }

  handleClick(event) {
    this.props.deleteItemThunk(event.target.id)
    localStorage.removeItem(event.target.id)
  }

  handleCheckout() {
    this.props.clearCart()
    localStorage.clear()
    this.props.history.push('/checkout')
  }

  // eslint-disable-next-line complexity
  render() {
    console.log('PROPS', this.props)
    let {products, isLoggedIn} = this.props

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

    // create persistent cart for not logged in user
    let myStorage = window.localStorage

    // if we are not logged in, then store cart on local storage
    //if (!isLoggedIn) {
    for (let i = 0; i < cartProducts.length; i++) {
      myStorage.setItem(cartProducts[i].id, cartProducts[i].id)
    }

    // convert into our cartProducts variable
    let cartNotLoggedIn = []
    for (var i = 0; i < localStorage.length; i++) {
      cartNotLoggedIn.push(localStorage.getItem(localStorage.key(i)))
    }

    // create cartProducts for rendering
    if (products.length && cartNotLoggedIn.length) {
      cartProducts = cartNotLoggedIn.map(elem => products[elem - 1])
    }
    //}

    return cartProducts.length > 0 ? (
      <div className="cart-render">
        <div className="cart-products-div">
          <h3>Your Cart: </h3>
          <Table className="cart-products-div">
            <tbody className="cart-elements">
              {cartProducts.map((elem, index) => (
                <tr key={index} className="cart-products-row">
                  <td className="cart-products-img-td">
                    <img src={elem.imgUrl} className="cart-products-img" />
                  </td>
                  <td>{elem.name}</td>
                  <td>${numberWithCommas(elem.price)}</td>
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
            </tbody>
          </Table>
        </div>
        <div>
          <tr className="order-total">
            <td>
              <h4>Order Total:</h4>
            </td>
            <td />
            <td>
              <h3>
                ${numberWithCommas(
                  cartProducts.reduce((a, b) => a + parseInt(b.price, 10), 0)
                )}
              </h3>
            </td>
            <td>
              <Button
                type="button"
                variant="outline-success"
                onClick={this.handleCheckout}
              >
                Submit order
              </Button>
            </td>
          </tr>
        </div>
      </div>
    ) : (
      <h2 className="cart-render">Your cart is currently empty!</h2>
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
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk()),
  getCartThunk: () => dispatch(getCartThunk()),
  deleteItemThunk: productId => dispatch(deleteItemThunk(productId)),
  clearCart: () => dispatch(clearCart())
})

export default connect(mapState, mapDispatchToProps)(Cart)

/**
 * PROP TYPES
 */
// Cart.propTypes = {
//   email: PropTypes.string
// }
