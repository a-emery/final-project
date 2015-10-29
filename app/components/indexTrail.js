import React from 'react';
import { Link } from 'react-router';

const TrailView = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    unique_id: React.PropTypes.number
  },

  render() {
    return (
      <div className="indexTrailContainer small-10 columns">
        <Link to={`/trail/${this.props.unique_id}`}><h3>{this.props.name}</h3></Link>
        <p>{this.props.city}, {this.props.state}</p>
      </div>
    )
  }
});

export default TrailView;
