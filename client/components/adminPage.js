import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Table} from 'react-bootstrap'
import {
  addProductThunk,
  productsThunk,
  deleteProductThunk
} from '../store/product'
import {usersThunk, deleteUserThunk} from '../store/allUsers'

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
    this.handleDeleteProduct = this.handleDeleteProduct.bind(this)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {
    this.props.productsThunk()
    this.props.usersThunk()
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
  }

  handleDeleteProduct(event) {
    this.props.deleteProductThunk(event.target.id)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.addProductThunk(this.state)
    this.setState(defaultState)
  }

  handleDeleteUser(event) {
    this.props.deleteUserThunk(event.target.id)
  }

  render() {
    let {products, users} = this.props
    if (!products) {
      products = []
    }
    if (!users) {
      users = []
    }
    return (
      <div className="admin-page">
        <div className="edit-products">
          <Form onSubmit={this.handleSubmit} className="product-form">
            <h2>Edit Islands</h2>
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
                <td>
                  <b>Remove</b>
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
        </div>
        <div className="edit-users">
          <h2>Edit Users</h2>
          <Table>
            <tbody>
              <tr key="0">
                <td>
                  <b>E-mail</b>
                </td>
                <td>
                  <b>Name</b>
                </td>
                <td>
                  <b>Remove</b>
                </td>
              </tr>
              {users.map(user => {
                return (
                  <tr key={user.id}>
                    <td>{user.email}</td>
                    <td>{user.name}</td>
                    <td>
                      <Button
                        type="button"
                        id={user.id}
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
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.productList,
  users: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product)),
  productsThunk: () => dispatch(productsThunk()),
  deleteProductThunk: productId => dispatch(deleteProductThunk(productId)),
  usersThunk: () => dispatch(usersThunk()),
  deleteUserThunk: userId => dispatch(deleteUserThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminPage)
