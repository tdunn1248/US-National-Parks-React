import nationalParks from '../datasets/nationalParks.json'

export function getAllNationalParks() {
  // const ROOT_URL = 'https://developer.nps.gov/api/v1/parks'
  // const QS = '?designation=nationalpark&limit=600'
  // const API_KEY = '&api_key=Km0ie7jJWNP1vOxkQvrkVf2yyV4jTcHzw2iz3qA9'
  //
  // const nationalParkNamesAPI = `${ROOT_URL}${QS}${API_KEY}`
  //
  // const headers = new Headers({
  //   method: 'GET',
  //   mode: 'cors'
  // })
  // return fetch(nationalParkNamesAPI, {headers})
  return nationalParks

}

export function getParkWeatherByCoords(lat, long) {

  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/weather'
  const QS = `?lat=${lat}&lon=${long}`
  const API_KEY = '&APPID=89f1c016380fc4077b547f8b59a1b70f'

  const parkWeatherAPI = `${FORECAST_URL}${QS}${API_KEY}`

  const init = new Headers({
    method: 'GET',
    mode: 'cors'
  })
  return fetch(parkWeatherAPI, {init})
}

// export function getNationalParksImages() {
//   const ROOT_URL = 'https://developer.nps.gov/api/v1/places/'
//   const QS = `?limit=600`
//   const API_KEY = '&api_key=Km0ie7jJWNP1vOxkQvrkVf2yyV4jTcHzw2iz3qA9'
//
//   const nationalParkNamesAPI = `${ROOT_URL}${QS}${API_KEY}`
//
//   const headers = new Headers({
//     method: 'GET',
//     mode: 'no-cors',
//     Authorization: API_KEY,
//     credentials: 'include'
//   })
//   return fetch(nationalParkNamesAPI, {headers})
// }
