import React from 'react'
import {GoogleMap, withGoogleMap, withScriptjs} from 'react-google-maps'
import MapMarkers from './mapMarkers'

import {compose} from 'recompose'

const MyMap = compose(withScriptjs, withGoogleMap)(props => (
  <GoogleMap defaultZoom={2} defaultCenter={{lat: 0, lng: 0}}>
    {props.products.map(product => (
      <MapMarkers key={product.name} product={product} />
    ))}
  </GoogleMap>
))

export default class MyMapComponent extends React.Component {
  render() {
    return (
      <div style={{height: this.props.customHeight}}>
        <MyMap
          products={this.props.products}
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDmv3MMcbazPN6wgqy1P-g077nwPRynfv4&callback=initMap"
          loadingElement={<div style={{height: this.props.customHeight}} />}
          containerElement={<div style={{height: this.props.customHeight}} />}
          mapElement={<div style={{height: this.props.customHeight}} />}
        />
      </div>
    )
  }
}
