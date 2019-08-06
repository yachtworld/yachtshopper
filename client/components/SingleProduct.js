import React from 'react'
import {connect} from 'react-redux'
import {productThunk} from '../store/product'
import {Row, Col, Button, Alert} from 'react-bootstrap'
import {addToCartThunk, getCartThunk} from '../store/cart'
import {numberWithCommas} from './utils'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.productThunk(this.props.match.params.id)
    this.props.getCartThunk()
    window.initMap = function() {} //necessary because of Google Maps callback
  }

  clickHandler = event => {
    this.props.addToCartThunk(event.target.id)
    this.props.getCartThunk()
  }

  render() {
    let {singleProduct, cart} = this.props

    if (!singleProduct) {
      singleProduct = {}
    }

    return (
      <div className="single-product-div">
        <Row className="single-product-row">
          <Col>
            <img src={singleProduct.imgUrl} className="single-product-img" />
          </Col>
          <Col className="border-col">
            <div className="single-product-info">
              <h2>{singleProduct.name}</h2>
              <p>
                ${singleProduct.price
                  ? numberWithCommas(singleProduct.price)
                  : ''}
              </p>
              <p>
                <img
                  src="https://i.pinimg.com/originals/29/93/fd/2993fd151e2e1cab871aec155e22cbcc.png"
                  className="icon"
                />{' '}
                {singleProduct.location}
              </p>
              <p>{singleProduct.description}</p>
              {singleProduct.sold ? (
                <Alert variant="danger" className="product-alert">
                  Island no longer available!
                </Alert>
              ) : cart.indexOf(singleProduct.id) > -1 ? (
                <Alert variant="primary" className="product-alert">
                  Item already in cart
                </Alert>
              ) : (
                <Button
                  type="button"
                  variant="outline-primary"
                  id={singleProduct.id}
                  onClick={this.clickHandler}
                >
                  Add to cart
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct,
  cart: state.cart.cart
})

const mapDispatchToProps = dispatch => ({
  productThunk: id => dispatch(productThunk(id)),
  getCartThunk: () => dispatch(getCartThunk()),
  addToCartThunk: id => dispatch(addToCartThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
