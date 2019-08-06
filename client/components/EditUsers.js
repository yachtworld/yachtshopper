import React from 'react'
import {connect} from 'react-redux'
import {Button, Table} from 'react-bootstrap'
import {usersThunk, deleteUserThunk} from '../store/allUsers'

class EditUsers extends React.Component {
  constructor(props) {
    super(props)
    this.handleDeleteUser = this.handleDeleteUser.bind(this)
  }

  componentDidMount() {
    this.props.usersThunk()
  }

  handleDeleteUser(event) {
    this.props.deleteUserThunk(event.target.id)
  }

  render() {
    let {users} = this.props

    if (!users) {
      users = []
    }
    return (
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
              console.log(user)
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  {user.admin ? (
                    <td>Admin</td>
                  ) : (
                    <td>
                      <Button
                        type="button"
                        id={user.id}
                        onClick={this.handleDeleteUser}
                      >
                        Delete
                      </Button>
                    </td>
                  )}
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
  users: state.allUsers
})

const mapDispatchToProps = dispatch => ({
  usersThunk: () => dispatch(usersThunk()),
  deleteUserThunk: userId => dispatch(deleteUserThunk(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditUsers)
