import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Col, Button, Table} from 'react-bootstrap'
import {getOrderThunk} from '../store/cart'
import UserUpdate from './userUpdateForm'
import {numberWithCommas} from './utils'

/**
 * COMPONENT
 */
class UserHome extends React.Component {
  componentDidMount() {
    this.props.getOrderThunk()
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.history.push('/updateuser')
  }
  render() {
    let {email, name, address, orders} = this.props
    let orderObj = {}
    orders.forEach(product => {
      let date = new Date(product.createdAt)
      product.createdAt = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
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
            <div>
              <p> </p>
              <UserUpdate />
            </div>
          </Col>
          <Col>
            <div id="user-info">
              <h4>Your orders:</h4>
              {orderObjKeys.map(key => {
                return (
                  <div key={key}>
                    <h5>
                      Order #{key} made {orderObj[key][0].createdAt}
                    </h5>
                    <Table>
                      <tbody>
                        {orderObj[key].map(order => {
                          return (
                            <tr key={order[0]}>
                              <td className="order-name">
                                {order.productName}{' '}
                              </td>
                              <td className="order-price">
                                ${numberWithCommas(order.price)}
                              </td>
                            </tr>
                          )
                        })}
                        <tr>
                          <td className="order-name">
                            <b>Total</b>
                          </td>
                          <td className="order-price">
                            <b>
                              ${numberWithCommas(
                                orderObj[key].reduce((a, b) => a + b.price, 0)
                              )}
                            </b>
                          </td>
                        </tr>
                      </tbody>
                    </Table>
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
