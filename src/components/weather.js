import React, { Component } from 'react'

export default class Weather extends Component {
  renderParkInfo() {
    const park = this.props.weatherData
    if (Object.keys(park).length === 0) return
    return (
      <div key={park.id}>
        <p key={park.id}>state(s): {park.states}</p>
        <p key={park.id}>Current temp: {park.temperature} °F </p>
        <p key={park.id}>Current Weather: {park.weatherDescription}</p>
        <p key={park.id}>Humidity: {park.humidity} % </p>
        <p key={park.id}>Wind Speed: {park.windSpeed} mph</p>
        <p key={park.id}>Sunrise: {park.sunrise}</p>
        <p key={park.id}>Sunset: {park.sunset}</p>
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
    const parkName = this.props.weatherData.name
    const parkInfo = this.renderParkInfo()
    return (
      <div className='wcc'>
        <div className='weather-container'>
          <h3> { parkName ? parkName : 'Search for a park to find current info!'} </h3>

          { parkInfo }
        </div>
      </div>
    )
  }
}
