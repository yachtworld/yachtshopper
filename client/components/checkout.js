import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk, checkoutThunk} from '../store/cart'
import {Table, Form, Button} from 'react-bootstrap'
import {numberWithCommas} from './utils'

/**
 * COMPONENT
 */
class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      submitted: false
    }
  }

  componentDidMount() {
    this.props.productsThunk()
    this.props.checkoutThunk()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      submitted: true
    })
  }

  render() {
    let {products, checkout, isLoggedIn} = this.props

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
      <div className="submit-order">
        <h3>Success! Your order has been submitted:</h3>
        <Table className="cart-products-div">
          <h4>
            <tbody>
              {cartProducts.map((elem, index) => (
                <tr key={index} className="cart-products-row">
                  <td className="cart-products-img-td">
                    <img src={elem.imgUrl} className="cart-products-img" />
                  </td>
                  <td>{elem.name}</td>
                  <td>${numberWithCommas(elem.price)}</td>
                </tr>
              ))}
              <tr>
                <td>Order Total:</td>
                <td />
                <td>
                  <b>
                    ${numberWithCommas(
                      cartProducts.reduce(
                        (a, b) => a + parseInt(b.price, 10),
                        0
                      )
                    )}
                  </b>
                </td>
              </tr>
            </tbody>
          </h4>
        </Table>

        {isLoggedIn ? (
          <div />
        ) : !this.state.submitted ? (
          <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Label>Enter your email for receipt:</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Enter email"
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
              <Button type="submit" variant="success">
                Submit
              </Button>
            </Form>
          </div>
        ) : (
          <div>Thanks for your submission, we will email you your receipt.</div>
        )}
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
    checkout: state.cart.checkout || [],
    isLoggedIn: !!state.user.id
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
