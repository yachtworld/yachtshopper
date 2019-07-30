import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.productsThunk()
  }
  render() {
    let {products} = this.props
    if (!products) {
      products = []
    }

    return (
      <div>
        {products.map(product => {
          return (
            <div key={product.id}>
              <img src={product.imgUrl} />
              <Link to={`/products/${product.id}`}>
                <h2>Name: {product.name}</h2>
                <p>Price: {product.price}</p>
                <p>Location: {product.location}</p>
                <p>Description: {product.description}</p>
              </Link>
            </div>
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
  productsThunk: () => dispatch(productsThunk())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
