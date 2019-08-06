import React from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {addProductThunk} from '../store/product'

const defaultState = {
  name: '',
  imgUrl: '',
  price: 0,
  location: '',
  description: '',
  sold: false
}

class AddProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
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
    )
  }
}

const mapStateToProps = state => ({
  products: state.product.productList
})

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddProduct)
