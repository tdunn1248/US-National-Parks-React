import React, { Component } from 'react'
import allStates from '../models/datasets/fifty-states'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = { term: ''  }
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }
  listMaker(allParks) {
    if (!allParks) return
    return allParks.map(park => {
      return (
        <option
          key={park.id}
          value={park.name}> {park.states} </option>
      )
    })
  }
  statesSelectList() {
    return allStates.map(state => {
      const states = state.split(' - ')

      return <option
              key={states[0]}
              value={states[1]}> {states[1]} </option>
    })
  }
  onSubmit(e) {
    e.preventDefault()
    const searchedTerm = this.state.term
    const coordinates = this.props.allParks
                        .filter(park => park.name === searchedTerm)

    this.props.getParkWeatherData(
      searchedTerm,
      coordinates[0].lat,
      coordinates[0].long
    )

    this.setState({ term: '' })
  }
  handleChange(e) {
    this.setState({ term: e.target.value })
  }
  render() {
    const dropDownOptions = this.listMaker(this.props.allParks)
    return (
      <div style={{display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', padding: '2%', backgroundColor: '#424242'}}>
        <form style={{margin: 0}}>
          <input
            className='input-selected'
            type={'text'}
            list={'national-park-dropdown'}
            value={this.state.term}
            onChange={this.handleChange}
            className='form-control'
            placeholder={'Search for National Parks By Name...'} />
          <datalist id='national-park-dropdown'>
            {(this.props.allParks ? dropDownOptions : null)}
          </datalist>
          <select
            onChange={this.props.updateParkDataList}>
              {this.statesSelectList()}
          </select>
          <button
            className='btn btn-success'
            onClick={this.onSubmit}
            type='submit'>
              Go!
          </button>
        </form>
      </div>
    )
  }
}
