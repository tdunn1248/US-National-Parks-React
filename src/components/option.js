import React, { Component } from 'react'

export default class Option extends Component {
  render() {
    return <option key={this.props.park.id} value={park.name}> {park.name} </option>
  }
}
