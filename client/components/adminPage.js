import React from 'react'
import {connect} from 'react-redux'
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
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />

          <label htmlFor="imgUrl">Image URL:</label>
          <input
            type="text"
            name="imgUrl"
            value={this.state.imgUrl}
            onChange={this.handleChange}
          />

          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <input type="submit" value="Submit" />
        </form>

        <div>
          <table>
            <tbody>
              <tr>
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
                      <button
                        type="button"
                        id={product.id}
                        onClick={this.handleClick}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
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
