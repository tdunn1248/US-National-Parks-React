import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Weather  from './weather'
import _ from 'lodash'

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
    console.log('stop passing prop')
    if (!expanded)
    this.setState({isExpanded : false})
  }
  render() {
    return (
      <Card
        initiallyExpanded={this.state.isExpanded}
        onExpandChange={this.toggleExpansion}
        actAsExpander={true}
        showExpandableButton={true} >
        <CardHeader
          title="Check out Current Park Info and Weather Data"
          subtitle="From all National Parks, Historical sites, and Protected preserves"
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText expandable={true}>
          <Weather
            weatherData={this.props.weatherData}
          />
        </CardText>
      </Card>
    )
  }
}

export default WeatherCard;
