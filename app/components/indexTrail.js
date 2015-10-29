import React from 'react';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string
  },

  render() {
    return (
      <div className="indexTrailContainer small-10 columns">
        <h1>{this.props.name}</h1>
        <p>{this.props.city}, {this.props.state}</p>
      </div>
    )
  }
});

export default IndexTrail;
