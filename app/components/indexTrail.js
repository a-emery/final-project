import React from 'react';
import { Link } from 'react-router';

import Map from '../components/map';

const TrailView = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    unique_id: React.PropTypes.number,
    index: React.PropTypes.number
  },

  // https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/components/signup.js

  render() {
    var markers = [{position: {"lat":this.props.lat, "lng":this.props.lon}}];
    console.log(markers);
    return (
      <div className="indexTrailContainer">
        <Link to={`/carin/trail/${this.props.unique_id}`}><div>
          <h3 className="indexTrailHeader">{this.props.index}. {this.props.name}</h3>
          <p>{this.props.city}, {this.props.state}</p>
        </div></Link>
      </div>
    );
  }
});

export default TrailView;
