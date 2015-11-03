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
      <Link to={`/carin/trail/${this.props.unique_id}`}><div className="indexTrailContainer small-10 columns">
        <h3>{this.props.name}</h3>
        <p>{this.props.city}, {this.props.state}</p>
      </div></Link>
    );
  }
});

export default TrailView;
