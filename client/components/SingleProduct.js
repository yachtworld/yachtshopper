import React from 'react'
import {connect} from 'react-redux'
import {productThunk} from '../store/product'
import {Row, Col, Button} from 'react-bootstrap'

class SingleProduct extends React.Component {
  componentDidMount() {
    this.props.productThunk(this.props.match.params.id)
  }

  render() {
    let {singleProduct} = this.props

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
              <p>${singleProduct.price}</p>
              <p>
                <img
                  src="https://i.pinimg.com/originals/29/93/fd/2993fd151e2e1cab871aec155e22cbcc.png"
                  className="icon"
                />{' '}
                {singleProduct.location}
              </p>
              <p>{singleProduct.description}</p>
              <Button type="button" variant="outline-primary">
                Add to cart
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => ({
  productThunk: id => dispatch(productThunk(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
