import React from 'react'
import {Marker, InfoWindow} from 'react-google-maps'
import {Link} from 'react-router-dom'

export default class MapMarker extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  toggleOpen = () => {
    this.setState({
      isOpen: true
    })
  }

  toggleClose = () => {
    this.setState({
      isOpen: false
    })
  }

  render() {
    return (
      <Marker
        key={this.props.product.name}
        position={{
          lat: this.props.product.coords[0],
          lng: this.props.product.coords[1]
        }}
        onClick={this.toggleOpen}
      >
        {this.state.isOpen && (
          <InfoWindow onCloseClick={this.toggleClose}>
            <Link to={`products/${this.props.product.id}`}>
              <div>
                {this.props.product.name}
                <br />
                <img src={this.props.product.imgUrl} className="map-img" />
              </div>
            </Link>
          </InfoWindow>
        )}
      </Marker>
    )
  }
}
