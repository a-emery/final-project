import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';

var AccountRides = React.createClass({

  propTypes: {
    time: React.PropTypes.number,
    trailName: React.PropTypes.string,
    condition: React.PropTypes.string,
    comment: React.PropTypes.string,
    img: React.PropTypes.string,
    trailId: React.PropTypes.number
  },

  render(){
    return (
      <div className="trailViewRideContainer">
        <div className="trailViewRideDateContainer">
          <h5 className="trailViewRideDate">{moment(this.props.time).calendar()}</h5>
          <Link to={`/carin/trail/${this.props.trailId}`}><p className="trailViewRideDate">{this.props.trailName}</p></Link>
        </div>
        <div className="trailViewRideInfoContainer">
          <p className="trailViewRideCondition">Condition rating: {this.props.condition}</p>
          <p className="trailViewRideComment">Comments: {this.props.comment}</p>
          <img className="trailViewRideImage" src={this.props.img} alt="" />
        </div>
      </div>
    );
  }
});

export default AccountRides;
