import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <header style={{backgroundColor: '#81C784', height: 'auto', width: '100%'}}>
        <div className='header-title'>
          <h1 style={{fontFamily: 'Montserrat', fontWeight: 'light'}}>Explore Americas National Parks!</h1>
        </div>
      </header>
    )
  }
}
