import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Weather  from './weather'

const WeatherCard = (props) => (
  <Card initiallyExpanded={props.weatherData !== '{}' ? true : false} showExpandableButton={true}>
    <CardHeader
      title="Check out Current Park Info and Weather Data"
      subtitle="From all National Parks, Historical sites, and Protected preserves"
      actAsExpander={true}
      showExpandableButton={true}
    />

    <CardText expandable={true}>
      <Weather
        weatherData={props.weatherData}
      />
    </CardText>
  </Card>
);

export default WeatherCard;
