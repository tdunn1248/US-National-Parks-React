import React, { Component } from 'react'

// import Transition from 'react-transition-group/Transition';
//
// const duration = 300;
//
// const defaultStyle = {
//   transition: `opacity ${duration}ms ease-in-out`,
//   opacity: 0,
// }
//
// const transitionStyles = {
//   entering: { opacity: 0 },
//   entered:  { opacity: 1 },
// };
//
// const Fade = ({ in: inProp }) => (
//   <Transition in={inProp} timeout={duration}>
//     {(state) => (
//       <div style={{
//         ...defaultStyle,
//         ...transitionStyles[state]
//       }}>
//         I'm A fade Transition!
//       </div>
//     )}
//   </Transition>
// )


export default class Weather extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillUpdate() {
    const listOfParks = []
    if (this.props.selectedStateParks.length > 0) {
      this.props.selectedStateParks.forEach(park =>
        listOfParks.push(park)
      )
    }
    return listOfParks
  }
  renderParks(parks) {
    if (!parks) return
    return parks.map(park => {
      return (
        <a onClick={this.handleClick} value={park.id}>
          <li key={park.id}>{park.name}</li>
        </a>
      )
    })
  }
  handleClick(e) {
    return this.props.allParks.map(park => {
      if (park.name === e.target.innerHTML) {
        this.props.getParkWeatherData(
          park.lat,
          park.long,
          e.target.innerHTML
        )
      }
    })
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
    const listOfParks = this.renderParks(this.props.selectedStateParks)
    return (
      <div className='wcc'>
        <div className='weather-container'>
          <h3> {
            this.props.weatherData.name ?
            this.props.weatherData.name :
            'All the National Parks in one place'
          } </h3>
          {/* <Fade in={this.state.in} /> */}
          { listOfParks ? <ul>{listOfParks}</ul> : null }
          { this.renderParkInfo() }
        </div>
      </div>
    )
  }
}
