import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Table} from 'react-bootstrap'
import {
  addProductThunk,
  productsThunk,
  deleteProductThunk
} from '../store/product'

const defaultState = {
  name: '',
  imgUrl: '',
  price: 0,
  location: '',
  description: '',
  sold: false
}

class AdminPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.productsThunk()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleClick(event) {
    this.props.deleteProductThunk(event.target.id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProductThunk(this.state)
    this.setState(defaultState)
  }

  render() {
    let {products} = this.props
    if (!products) {
      products = []
    }
    return (
      <div className="edit-products">
        <Form onSubmit={this.handleSubmit} className="product-form">
          <h2>Add Island</h2>
          <Form.Label htmlFor="name">Name:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <Form.Label htmlFor="imgUrl">Image URL:</Form.Label>
          <Form.Control
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />

          <Form.Label htmlFor="price">Price:</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <Form.Label htmlFor="location">Location:</Form.Label>
          <Form.Control
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />

          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button type="submit" className="submit-btn">
            Submit
          </Button>
        </Form>

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
            </tr>
            {products.map(product => {
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.location}</td>
                  <td>
                    <Button
                      type="button"
                      id={product.id}
                      onClick={this.handleClick}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.productList
})

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product)),
  productsThunk: () => dispatch(productsThunk()),
  deleteProductThunk: productId => dispatch(deleteProductThunk(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
