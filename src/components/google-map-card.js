import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import GoogleMap from './google_map'

const GoogleMapCard = (props) => (
  <Card>
    <CardHeader
      title="Check out the Satellite View"
      actAsExpander={true}
      showExpandableButton={true}
    />

    <CardText expandable={true}>
      <GoogleMap
        lon={props.lon}
        lat={props.lat}
      />
    </CardText>
  </Card>
);

export default GoogleMapCard;
