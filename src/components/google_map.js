import React, { Component } from 'react'

class GoogleMap extends Component {
  componentDidMount() {
    new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {
        lat: (this.props.lat == undefined) ? 36.1070 : parseFloat(this.props.lat),
        lng: (this.props.lon == undefined) ? -112.1130 : parseFloat(this.props.lon)
      },
      mapTypeId: 'hybrid'
    })
  }
  componentDidUpdate() {
    new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: {
        lat: (this.props.lat == undefined) ? 35.24889288 : parseFloat(this.props.lat),
        lng: (this.props.lon == undefined) ? -111.6513 : parseFloat(this.props.lon)
      },
      mapTypeId: 'hybrid'
    })
  }
  render() {
    return (
      <div style={{
        display: 'flex',
        backgroundColor: '#424242',
        padding: '1%', flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'}}>
          <div className='google-map' ref='map' />
      </div>
    )
  }
}

export default GoogleMap
