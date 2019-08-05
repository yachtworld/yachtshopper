import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {Link} from 'react-router-dom'
import {addToCartThunk, getCartThunk} from '../store/cart'
import {Button, Col, Row, Alert} from 'react-bootstrap'
import Carousel from './carousel'
import {numberWithCommas} from './utils'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
    this.props.getCartThunk()
  }

  clickHandler = event => {
    event.preventDefault()
    this.props.addToCartThunk(event.target.id)
    this.props.getCartThunk()
  }

  render() {
    let {products} = this.props
    if (!products) {
      products = []
    }

    return (
      <div>
        <Carousel id="header-carousel" />
        <Row className="all-products-row">
          {products.map(product => {
            return (
              <Col md="4" key={product.id} className="all-products-item">
                <img src={product.imgUrl} className="all-products-img" />
                <Link
                  to={`/products/${product.id}`}
                  className="all-products-name"
                >
                  {product.name}
                </Link>

                <Link to={`/products/${product.id}`}>
                  ${numberWithCommas(product.price)}
                </Link>
                {product.sold ? (
                  <Alert variant="danger" className="product-alert">
                    Island no longer available!
                  </Alert>
                ) : this.props.cart.indexOf(product.id) > -1 ? (
                  <Alert variant="primary" className="product-alert">
                    Item already in cart
                  </Alert>
                ) : (
                  <Button
                    type="button"
                    id={product.id}
                    onClick={this.clickHandler}
                    variant="primary"
                    className="all-products-btn"
                  >
                    Add to cart
                  </Button>
                )}
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.productList,
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk()),
  addToCartThunk: id => dispatch(addToCartThunk(id)),
  getCartThunk: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
