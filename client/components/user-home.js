import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import {getOrderThunk} from '../store/cart'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getOrderThunk()
  }
  render() {
    let {email, name, address, orders} = this.props
    let orderObj = {}
    orders.forEach(product => {
      if (orderObj[product.orderId]) {
        orderObj[product.orderId].push(product)
      } else {
        orderObj[product.orderId] = [product]
      }
    })
    let orderObjKeys = Object.keys(orderObj)

    return (
      <div id="user-home">
        <h3>Welcome back, {name}</h3>
        <Row>
          <Col>
            <div id="user-info">
              <h4>Your info:</h4>
              <p> Address: {address}</p>
              <p>Email: {email}</p>
            </div>
          </Col>
          <Col>
            <div id="user-orders">
              <h4>Your orders:</h4>
              {orderObjKeys.map(key => {
                return (
                  <div key={key} className="user-order">
                    <h5>
                      Order #{key} made {orderObj[key][0].createdAt}
                    </h5>
                    {orderObj[key].map(order => {
                      return <div key={order[0]}>{order.productName}</div>
                    })}
                  </div>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    name: state.user.name,
    address: state.user.address,
    orders: state.cart.orders,
    products: state.product.productList
  }
}

const mapDispatch = dispatch => ({
  getOrderThunk: () => dispatch(getOrderThunk())
})

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
