import React, { Component } from 'react'

// import Transition from 'react-transition-group/Transition';

export default class Weather extends Component {
  componentWillUpdate() {
    const listOfParks = []
    if (this.props.selectedStateParks.length > 0) {
      this.props.selectedStateParks.forEach(park =>
        listOfParks.push(park)
      )
    }
    return listOfParks
  }
  renderParkInfo() {
    if (Object.keys(this.props.weatherData).length === 0) return
    return (
      <div>
        <p>state(s): {this.props.weatherData.states}</p>
        <p>Current temp: {this.props.weatherData.temperature} °F </p>
        <p>Current Weather: {this.props.weatherData.weatherDescription}</p>
        <p>Humidity: {this.props.weatherData.humidity} % </p>
        <p>Wind Speed: {this.props.weatherData.windSpeed} mph</p>
        <p>Sunrise: {this.props.weatherData.sunrise}</p>
        <p>Sunset: {this.props.weatherData.sunset}</p>
        <p>{this.props.weatherData.parkWeatherDescription}</p>
        <p>{this.props.weatherData.designation}</p>
        <p>{this.props.weatherData.parkDescription}</p>
        <span> <a
          href={this.props.weatherData.directionsUrl}
          target='_blank'>Directions and more park info </a></span>
      </div>
    )
  }
  render() {
    return (
      <div className='wcc'>
        <div className='weather-container'>
          <h3> {
            this.props.weatherData.name ?
            this.props.weatherData.name :
            'All the National Parks in one place'
          } </h3>
          { this.renderParkInfo() }
        </div>
      </div>
    )
  }
}
