import React from 'react';
import { Link } from 'react-router';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    activities: React.PropTypes.array
  },

  render() {

    return (
      <div className="trailViewTrailContainer">
        <div className="trailViewTrailInfoContainer">
          <div className="trailViewTrailName">
            <h3>{this.props.name}</h3>
            <p>{this.props.city}, {this.props.state}</p>
            <p>Current Rating: 4/5</p>
          </div>
          <div className="trailViewConditionsRating">
            <button>Favorite</button>
          </div>
        </div>
        <div>
          <img src={this.props.activities[0].thumbnail} alt="" />
        </div>
      </div>
    )
  }
});

export default IndexTrail;
