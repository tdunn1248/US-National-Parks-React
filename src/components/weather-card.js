import React from 'react';
import Weather  from './weather'

class WeatherCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isExpanded: true
    }
    this.toggleExpansion = this.toggleExpansion.bind(this)
  }
  componentDidUpdate() {
    this.toggleExpansion(true)
  }
  toggleExpansion(expanded) {
    if (!expanded)
    this.setState({isExpanded : false})
  }
  render() {
    console.log('weahter card props', this.props)
    return (
      <div>
        <Weather
          weatherData={this.props.weatherData}
        />
      </div>
    )
  }
}

export default WeatherCard;
