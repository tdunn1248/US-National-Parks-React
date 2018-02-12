import React, { Component } from 'react'

export default class Weather extends Component {
  renderParkInfo() {
    const park = this.props.weatherData
    if (Object.keys(park).length === 0) return <p>Search for a Park</p>
    return (
      <div key={park.id}>
        <p key={park.id}>Current temp: {park.temperature} °F </p>
        <p key={park.id}>Current Weather: {park.weatherDescription}</p>
        <p key={park.id}>Sunrise: {park.sunrise}</p>
        <p key={park.id}>Sunset: {park.sunset}</p>
        <p key={park.id}>Humidity: {park.humidity} % </p>
        <p key={park.id}>Wind Speed: {park.windSpeed} mph</p>
        <p key={park.id}>{park.parkWeatherDescription}</p>
        <p key={park.id}>{park.designation}</p>
        <p key={park.id}>{park.parkDescription}</p>
        <span key={park.id}> <a
          key={park.id}
          href={park.directionsUrl}
          target='_blank'>Directions and more park info </a></span>
      </div>
    )
  }
  render() {
    return (
      <div style={{display: 'flex', backgroundColor: '#424242', padding: '1%', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <div className='weather-container'>
          { this.renderParkInfo() }
        </div>
      </div>
    )
  }
}
