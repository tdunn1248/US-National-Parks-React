import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import GoogleMap from './google_map'

const CardExampleExpandable = (props) => (
  <Card>
    <CardHeader
      title="Check out the Satellite View"
      subtitle="From Google Maps"
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

// class CardExampleExpandable extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       long: this.props.lon,
//       lat: this.props.lat
//     }
//   }
//   render() {
//     console.log('state from card', this.state)
//
//     return (
//       <Card>
//         <CardHeader
//           title="Check out the Satellite View"
//           subtitle="On Google Maps"
//           actAsExpander={true}
//           showExpandableButton={true}
//         />
//
//         <CardText expandable={true}>
//           <GoogleMap
//             lon={this.state.long}
//             lat={this.state.lat}
//           />
//         </CardText>
//       </Card>
//     )
//   }
// }

export default CardExampleExpandable;
