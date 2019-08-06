import React from 'react'
import {
  InfoWindow,
  Marker,
  GoogleMap,
  withGoogleMap,
  withScriptjs
} from 'react-google-maps'
import {Link} from 'react-router-dom'
import MapMarkers from './mapMarkers'

import {compose} from 'recompose'

const MyMap = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={2} defaultCenter={{lat: 0, lng: 0}}>
    {props.products.map(product => (
      <MapMarkers key={product.name} product={product} />
    ))})}
  </GoogleMap>
))

export default class MyMapComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      places: []
    }
  }

  removePlace = () => {
    this.setState({
      places: []
    })
  }

  render() {
    return (
      <div style={{height: '95%'}}>
        <MyMap
          products={this.props.products}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBKMqUWCbhdlwWLPwIzEmwzHm6i7JQJFNg&callback=initMap"
          loadingElement={<div style={{height: `95%`}} />}
          containerElement={<div style={{height: `95%`}} />}
          mapElement={<div style={{height: `95%`}} />}
          removePlace={this.removePlace}
        />
      </div>
    )
  }
}
