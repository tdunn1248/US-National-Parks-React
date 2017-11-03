import React, { Component } from 'react'

class GoogleMap extends Component {
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 10,
      center: {
        lat: (this.props.lat == undefined) ? 35.24889288 : parseFloat(this.props.lat),
        lng: (this.props.lon == undefined) ? -111.6513 : parseFloat(this.props.lon)
      },
      mapTypeId: 'hybrid'
    })
  }
  componentDidUpdate() {
    new google.maps.Map(this.refs.map, {
      zoom: 10,
      center: {
        lat: (this.props.lat == undefined) ? 35.24889288 : parseFloat(this.props.lat),
        lng: (this.props.lon == undefined) ? -111.6513 : parseFloat(this.props.lon)
      },
      mapTypeId: 'hybrid'
    })
  }
  render() {
    return (
      <div className='map-container'>
        <div className='google-map' ref='map' />
      </div>
    )
  }
}

export default GoogleMap
