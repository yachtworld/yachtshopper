import React from 'react'
import {connect} from 'react-redux'
import {Form, Button} from 'react-bootstrap'
import {fetchUserUpdate} from '../store/user'

const defaultState = {
  name: '',
  address: '',
  email: '',
  id: ''
}

class UserUpdate extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value})
    this.setState({id: this.props.user.id})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchUserUpdate(this.state)
    this.setState(defaultState)
  }

  render() {
    let {user} = this.props
    if (!user) {
      user = {}
    }
    return (
      <div className="admin-page">
        <div>
          <Form onSubmit={this.handleSubmit} className="user-form">
            <h4>Edit User Profile:</h4>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />

            <Form.Label htmlFor="address">Address:</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={this.state.address}
              onChange={this.handleChange}
            />

            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <Button type="submit" className="submit-btn">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})
const mapDispatchToProps = dispatch => ({
  fetchUserUpdate: info => dispatch(fetchUserUpdate(info))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserUpdate)
