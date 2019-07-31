import React from 'react'
import {connect} from 'react-redux'
import {productsThunk} from '../store/product'
import {Link} from 'react-router-dom'
import {addToCartThunk} from '../store/cart'
import {Row, Col, Button, Table} from 'react-bootstrap'

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

    return (
      <Table className="all-products-div">
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.id} className="all-products-row">
                <td className="all-products-img-td">
                  <img src={product.imgUrl} className="all-products-img" />
                </td>

                <td>
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </td>
                <td>
                  <Link to={`/products/${product.id}`}>${product.price}</Link>
                </td>

                <td>
                  <Button
                    type="button"
                    id={product.id}
                    onClick={this.clickHandler}
                    variant="outline-primary"
                  >
                    Add to cart
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
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
