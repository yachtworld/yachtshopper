import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {Link} from 'react-router-dom'
import {addToCartThunk} from '../store/cart'
import {Button, Table, Col, Row} from 'react-bootstrap'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
  }

  clickHandler = event => {
    event.preventDefault()
    this.props.addToCartThunk(event.target.id)
  }

  render() {
    let {products} = this.props
    if (!products) {
      products = []
    }

    const chunker = function(arr, chunkSize) {
      let R = []
      for (let i = 0; i < arr.length; i += chunkSize)
        R.push(arr.slice(i, i + chunkSize))
      return R
    }

    let chunkedProducts = chunker(products, 3)
    console.log('chunked', chunkedProducts)

    return (
      <div>
        {chunkedProducts.map(productArr => {
          return (
            <Row className="all-products-div" key={productArr}>
              {productArr.map(product => {
                return (
                  <Col key={product.id} className="all-products-row">
                    <img src={product.imgUrl} className="all-products-img" />
                    <Link
                      to={`/products/${product.id}`}
                      className="all-products-name"
                    >
                      {product.name}
                    </Link>

                    <Link to={`/products/${product.id}`}>${product.price}</Link>

                    <Button
                      type="button"
                      id={product.id}
                      onClick={this.clickHandler}
                      variant="primary"
                      className="all-products-btn"
                    >
                      Add to cart
                    </Button>
                  </Col>
                )
              })}
            </Row>
          )
        })}
      </div>
    )
  }
}
const mapStateToProps = state => ({
  products: state.product.productList
})

const mapDispatchToProps = dispatch => ({
  productsThunk: () => dispatch(productsThunk()),
  addToCartThunk: id => dispatch(addToCartThunk(id))
  // getCartThunk: () => dispatch(getCartThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
