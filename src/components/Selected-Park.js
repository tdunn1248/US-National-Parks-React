import React, { Component } from 'react'
import GoogleMapCard from './google-map-card'
import WeatherCard from './weather-card'
import Button from 'material-ui/'

export default class SelectedPark extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMap: props.isMap
    }
    this.toggleMap = this.toggleMap.bind(this)
  }
  toggleMap(isMap) {
    if(isMap) {
      this.setState({isMap: false})
    } else {
      this.setState({isMap: true})
    }
  }
  render() {
    const { selectedParkWeatherData } = this.props
    const { lat, lng } = selectedParkWeatherData

    if(!Object.keys(selectedParkWeatherData).length > 0) {
      this.props.getParkWeatherData('Grand Canyon', 36.1070, -112.1130)
    }
    
    return (
      <div>
        <div style={{backgroundColor: '#eeeeee', justifyContent: 'center'}}>
          {Object.keys(selectedParkWeatherData).length > 0 ?
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#424242'}}>
              <div style={{
                display: 'flex',
                minWidth: '80%',
                maxWidth: '80%',
                borderRadius: 5,
                backgroundColor: '#E0E0E0',
                justifyContent: 'center',
                padding: '1%'}}>
                <h4 style={{
                  display: 'inline',
                  textAlign: 'center'}}>
                    {selectedParkWeatherData.name + ', ' + selectedParkWeatherData.states}
                </h4>
                <button
                  style={{
                    display: 'inline',
                    marginLeft: 10,
                    border: 0,
                    backgroundColor: 'black',
                    color: 'white',
                    borderRadius: 10,
                    padding: 5
                  }}
                  onClick={() => this.toggleMap(this.state.isMap)}>
                    {this.state.isMap ? 'More Info' : 'Map View'}
                </button>
              </div>
            </div> :
            null
          }
        </div>
        {this.state.isMap ?
          <GoogleMapCard lon={lng} lat={lat}/> :
          <WeatherCard weatherData={selectedParkWeatherData} />
        }
      </div>
    )
  }
}
