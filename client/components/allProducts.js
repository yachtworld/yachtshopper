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

    //splits array up into sub-arrays for proper rendering
    // const chunker = function(arr, chunkSize) {
    //   let row = []
    //   for (let i = 0; i < arr.length; i += chunkSize)
    //     row.push(arr.slice(i, i + chunkSize))
    //   return row
    // }

    // let chunkedProducts = chunker(products, 3)

    // remove chunkedproducts
    // map through the products
    // instead of returning a new row, return columns and set the size (3/4?)
    // idea is that it'll all wrap

    return (
      <div>
        <Carousel id="header-carousel" />
        {/* {chunkedProducts.map((productArr, index) => {
          return ( */}
        {/* <Row className="all-products-div" key={index}> */}
        {products.map(product => {
          return (
            <Col key={product.id} className="all-products-row">
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
        {/* </Row> */}
        {/* )
        })} */}
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
