import React from 'react';
import moment from 'moment';

var AccountRides = React.createClass({

  propTypes: {
    time: React.PropTypes.number,
    trailName: React.PropTypes.string,
    condition: React.PropTypes.string,
    comment: React.PropTypes.string
  },

  render(){
    return (
      <div className="trailViewRideContainer">
        <div className="trailViewRideDateContainer">
          <h5 className="trailViewRideDate">{moment(this.props.time).calendar()}</h5>
          <p className="trailViewRideDate">{this.props.trailName}</p>
        </div>
        <div className="trailViewRideInfoContainer">
          <p className="trailViewRideCondition">Condition rating: {this.props.condition}</p>
          <p className="trailViewRideComment">Comments: {this.props.comment}</p>
        </div>
      </div>
    );
  }
});

export default AccountRides;
