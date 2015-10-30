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
      <div className="indexTrailContainer small-10 columns">
        <div className="small-5 columns">
          <h3>{this.props.name}</h3>
          <p>{this.props.city}, {this.props.state}</p>
        </div>
        <div className="small-5 columns right">
          <img src={this.props.activities[0].thumbnail} alt="" />
        </div>
      </div>
    )
  }
});

export default IndexTrail;
