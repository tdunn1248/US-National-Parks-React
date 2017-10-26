import React, { Component } from 'react';
import SearchBar  from './search_bar'
import Header from './header'
import Footer from './footer'
import Weather  from './weather'
import GoogleMap from './google_map'
import allStates from '../models/datasets/fifty-states'

import { getAllNationalParks, getParkWeatherByCoords, getNationalParksImages }  from '../models/api/index'

// import { getLat, getLong } from './helpers/latitude-longitude'

function convertMilitaryTime(militaryTime) {
  const minutes = militaryTime.slice(3,5)
  const militaryHour = militaryTime.substring(0,2)
  const time = {}
  let counter = 1
  for(let i = 13; i < 25; i++) {
    time[i] = counter
    counter++
  }
  if (time.hasOwnProperty(parseFloat(militaryTime))) {

    return (time[parseFloat(militaryTime)] + ':' + minutes)
  }
}
function getLong(string) {
  if (!string) return
  const coordinates = string.split(':')
  const long = parseFloat(coordinates[2].split(','))
  return long
}

function metersPerSecToMilesPerHour(ms) {
  return (ms * 2.236936).toFixed(2)
}

function convertKelvinToFahr(kelvin) {
  return (kelvin * (9/5) - 459.67).toFixed(2)
}

function getLat(string) {
  if (!string) return
  const coordinates = string.split(':')
  const lat = parseFloat(coordinates[1].slice(','))
  return lat
}

function unixToTimeStamp(unix) {
  const formatted = new Date(unix * 1000).toString()
  const splitted = formatted.split(' ')
  if (splitted[4].charAt(0) == 0) {
    return splitted[4].slice(1,5) + ' AM'
  }

  if (splitted[4].slice(0,2) >= 10 && splitted[4].slice(0,2) <= 12) {
    return splitted[4].slice(1,5) + ' AM'
  } else {
    return convertMilitaryTime(splitted[4]) + ' PM'
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      allParks: [],
      dataListParkData: [],
      selectedParkWeatherData: {},
      selectedStateParks: []
    }
    this.getParkWeatherData = this.getParkWeatherData.bind(this)
    this.grabSelectedParkInfo = this.grabSelectedParkInfo.bind(this)
    this.updateParkDataList = this.updateParkDataList.bind(this)
  }
  componentWillMount() {
    const allParks = []
    const allNationalParks = getAllNationalParks()

    allNationalParks.data.map(park => {
       allParks.push({
         id: park.id,
         name: park.name,
         states: park.states,
         designation: park.designation,
         weatherInfo: park.weatherInfo,
         description: park.description,
         directions: park.directionsUrl,
         lat: getLat(park.latLong),
         long: getLong(park.latLong)
       })

     this.setState({
       allParks,
       dataListParkData: allParks
      })
    })
  }
  getParkWeatherData(selectedCity, latitude, longitude, isStateSearch) {
    const lat = latitude
    const lng = longitude
    const park =  this.grabSelectedParkInfo(lat, lng, selectedCity)
    getParkWeatherByCoords(lat, lng)
    .then(response => response.json())
    .then(weatherData => {
      if (isStateSearch) return
      this.setState({
        selectedParkWeatherData: {
          name: selectedCity,
          temperature: weatherData.main ? convertKelvinToFahr(weatherData.main.temp) : 'No Data',
          humidity: weatherData.main ? weatherData.main.humidity : 'No Data',
          weatherDescription: weatherData.main ? weatherData.weather[0].description : 'No Data',
          parkDescription: park.description,
          parkWeatherDescription : park.weatherInfo,
          designation: park.designation,
          directionsUrl : park.directionsUrl,
          states: park.states,
          windSpeed: weatherData.main ? metersPerSecToMilesPerHour(weatherData.wind.speed) : 'No data',
          sunrise: weatherData.main ? unixToTimeStamp(weatherData.sys.sunrise) : 'No data',
          sunset: weatherData.main ? unixToTimeStamp(weatherData.sys.sunset) : 'No data',
          lat,
          lng
        },
        selectedStateParks: []
      })
    })
  }
  grabSelectedParkInfo(lat, lng, selectedCity) {
    const selectedPark = {}
    this.state.dataListParkData.forEach(park => {
      if (park.name === selectedCity ) {
        selectedPark.description = park.description
        selectedPark.weatherInfo = park.weatherInfo
        selectedPark.directionsUrl = park.directions
        selectedPark.designation = park.designation
        selectedPark.states = park.states
      }
    })
    return selectedPark
  }
  updateParkDataList(searched) {
    let selectedStateParks = []
    allStates.map(state => {
      const stateName = state.split(' - ')
        if (stateName[1] === searched ) {
          return this.state.allParks.filter(park => {
            if(park.states.includes(stateName[0]) ) {
              selectedStateParks.push(park)
            }
          })
        }
      this.setState({
        dataListParkData: selectedStateParks,
        selectedParkWeatherData: {}
      })
    })
  }
  // handleStateSearch(searched) {
  //   let selectedStateParks = []
  //   allStates.map(state => {
  //     const stateName = state.split(' - ')
  //       if (stateName[1] === searched ) {
  //         return this.state.allParks.filter(park => {
  //           if(park.states.includes(stateName[0]) ) {
  //             this.getParkWeatherData(
  //               park.name,
  //               park.lat,
  //               park.long,
  //               true
  //             )
  //             selectedStateParks.push(park)
  //           }
  //         })
  //       }
  //     this.setState({
  //       dataListParkData: selectedStateParks,
  //       selectedParkWeatherData: {}
  //     })
  //   })
  // }
  render() {
    return (
      <div className='app'>
        <Header />
        <div className='container'>
          <GoogleMap
            lon={this.state.selectedParkWeatherData.lng}
            lat={this.state.selectedParkWeatherData.lat}
          />
          <SearchBar allParks= {
            this.state.dataListParkData ?
            this.state.dataListParkData : null
          } getParkWeatherData={this.getParkWeatherData}
            handleStateSearch={this.handleStateSearch}
            updateParkDataList={ event =>
              this.updateParkDataList(event.target.value)} />
          <Weather
            weatherData={this.state.selectedParkWeatherData}
            allParks={this.state.dataListParkData}
            selectedStateParks={this.state.selectedStateParks}
            getParkWeatherData={this.getParkWeatherData}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
