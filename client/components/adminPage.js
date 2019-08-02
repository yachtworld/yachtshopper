import React from 'react'
import {connect} from 'react-redux'
import {addProductThunk} from '../store/product'

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
    console.log('HIII')
    return (
      <div>
        <p>HELLO YO</p>
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  addProductThunk: product => dispatch(addProductThunk(product))
})

export default connect(null, mapDispatchToProps)(AdminPage)
