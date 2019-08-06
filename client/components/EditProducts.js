import React from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'react-bootstrap'
import {productsThunk, deleteProductThunk} from '../store/product'
import {numberWithCommas} from './utils'

class EditProducts extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
  }

  componentDidMount() {
    this.props.productsThunk()
  }

  handleDeleteProduct(event) {
    this.props.deleteProductThunk(event.target.id)
  }

  render() {
    let {products} = this.props
    if (!products) {
      products = []
    }

    return (
      <Table>
        <tbody>
          <tr key="0">
            <td>
              <b>Product Name</b>
            </td>
            <td>
              <b>Price</b>
            </td>
            <td>
              <b>Location</b>
            </td>
            <td>
              <b>Remove</b>
            </td>
          </tr>
          {products.map(product => {
            return (
              <tr key={product.name}>
                <td>{product.name}</td>
                <td>{numberWithCommas(product.price)}</td>
                <td>{product.location}</td>
                <td>
                  <Button
                    type="button"
                    id={product.id}
                    onClick={this.handleDeleteProduct}
                  >
                    Delete
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
  deleteProductThunk: productId => dispatch(deleteProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProducts)
