import React from 'react';
import { Link } from 'react-router';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string
  },

  render() {
    return (
      <div className="indexTrailContainer small-10 columns">
        <h3>{this.props.name}</h3>
        <p>{this.props.city}, {this.props.state}</p>
      </div>
    )
  }
});

export default IndexTrail;
