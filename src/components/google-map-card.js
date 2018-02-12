import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import GoogleMap from './google_map'

const GoogleMapCard = props => (
  <div>
    <GoogleMap
      lon={props.lon}
      lat={props.lat}
    />
  </div>
)

export default GoogleMapCard;
