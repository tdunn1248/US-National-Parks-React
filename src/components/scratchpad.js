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
