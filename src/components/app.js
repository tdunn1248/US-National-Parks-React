import React, { Component } from 'react';
import SearchBar  from './search_bar'
import Header from './header'
import Footer from './footer'
import Weather  from './weather'
import GoogleMap from './google_map'
import allStates from '../models/datasets/fifty-states'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import CardExampleExpandable from './google-map-card'
import WeatherCard from './weather-card'

import { getAllNationalParks, getParkWeatherByCoords, getNationalParksImages }  from '../models/api/index'
import { getLat, getLong, unixToTimeStamp, convertKelvinToFahr, metersPerSecToMilesPerHour } from './helpers/latitude-longitude'

// fix margin gap
// bring in raised button from material for the Go button 
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
    const allNationalParks = getAllNationalParks()

    const allParks = []
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
  getParkWeatherData(selectedCity, latitude, longitude) {
    const park = this.grabSelectedParkInfo(latitude, longitude, selectedCity)
    getParkWeatherByCoords(latitude, longitude)
    .then(response => response.json())
    .then(weatherData => {
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
          lat: latitude,
          lng: longitude
        }
      })
    })
  }
  grabSelectedParkInfo(lat, lng, selectedCity) {
    const selectedPark = {}
    this.state.dataListParkData.forEach(park => {
      if (park.name === selectedCity) {
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
    let matchedQueryParks = []
    allStates.map(state => {
      const stateName = state.split(' - ')
      if (stateName[1] === searched ) {
        return this.state.allParks.filter(park => {
          if (park.states.includes(stateName[0])) {
            matchedQueryParks.push(park)
          }
        })
      }
      this.setState({
        dataListParkData: matchedQueryParks,
        selectedParkWeatherData: {}
      })
    })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <div className='app'>
          <Header />
            <CardExampleExpandable
              lon={this.state.selectedParkWeatherData.lng}
              lat={this.state.selectedParkWeatherData.lat} />
            <WeatherCard
              weatherData={this.state.selectedParkWeatherData} />
            <SearchBar allParks= {
                this.state.dataListParkData ?
                this.state.dataListParkData : null
              }
              getParkWeatherData={this.getParkWeatherData}
              handleStateSearch={this.handleStateSearch}
              updateParkDataList={event => this.updateParkDataList(event.target.value)} />

          <Footer />
        </div>
      </MuiThemeProvider>
    );
  }
}
