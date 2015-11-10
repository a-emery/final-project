import React from 'react';
import { Link } from 'react-router';

const TrailView = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    unique_id: React.PropTypes.number,
    index: React.PropTypes.number
  },

  render() {
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
