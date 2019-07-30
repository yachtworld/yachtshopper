import React from 'react'
import {connect} from 'react-redux'
import {productThunk} from '../store/product'

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
      <div>
        <img src={singleProduct.imgUrl} />
        <h2>Name: {singleProduct.name}</h2>
        <p>Price: {singleProduct.price}</p>
        <p>Location: {singleProduct.location}</p>
        <p>Description: {singleProduct.description}</p>
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
