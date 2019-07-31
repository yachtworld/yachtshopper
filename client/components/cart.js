import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {getCartThunk} from '../store/cart'
import {Table, Button} from 'react-bootstrap'

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
          <Table className="all-products-div">
            <tbody>
              {cartProducts.map((elem, index) => (
                <tr key={index} className="all-products-row">
                  <td className="all-products-img-td">
                    <img src={elem.imgUrl} className="all-products-img" />
                  </td>
                  <td>{elem.name}</td>
                  <td>{elem.price}</td>
                  <td>
                    <Button type="button" id={elem.id} variant="outline-danger">
                      Remove from cart
                    </Button>
                  </td>
                </tr>
              ))}
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
