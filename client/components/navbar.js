import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../store'
import {clearCart} from '../store/cart'
import {Navbar as NavbarReact, Nav} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <NavbarReact bg="light" variant="light" id="navbar-all">
      <div id="navbar-left">
        <NavbarReact.Brand href="/">Island World</NavbarReact.Brand>
        {isLoggedIn ? (
          <React.Fragment>
            {/* The navbar will show these links after you log in */}
            <LinkContainer to="/home">
              <Nav.Link>My Profile</Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : (
          <div />
        )}
        <LinkContainer to="/products">
          <Nav.Link>All Products</Nav.Link>
        </LinkContainer>
      </div>
      <div id="navbar-right">
        {isAdmin ? (
          <React.Fragment>
            {/* The navbar will show these links after you log in */}
            <LinkContainer to="/admin">
              <Nav.Link>Admin Panel</Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : (
          <React.Fragment />
        )}
        <LinkContainer to="/cart">
          <Nav.Link>Cart</Nav.Link>
        </LinkContainer>
        {isLoggedIn ? (
          <React.Fragment>
            {/* The navbar will show these links after you log in */}

            <LinkContainer to="/#">
              <Nav.Link onClick={handleClick}>Logout</Nav.Link>
            </LinkContainer>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {/* The navbar will show these links before you log in */}
            <LinkContainer to="/login">
              <Nav.Link>Login</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/signup">
              <Nav.Link>Sign Up</Nav.Link>
            </LinkContainer>
          </React.Fragment>
        )}
      </div>
    </NavbarReact>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
      dispatch(clearCart())

      localStorage.clear()
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
