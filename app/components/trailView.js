import React from 'react';
import { Link } from 'react-router';
import store from '../store';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    activities: React.PropTypes.array
  },

  getInitialState() {
    return {
      isAdding: false
    }
  },

  toggleAddRide() {
    if(!this.state.isAdding) {
      this.setState({
        isAdding: true
      });
    } else if (this.state.isAdding) {
      this.setState({
        isAdding: false
      });
    }
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
          <div className="trailViewTrailOptions">
            <button className="trailViewTrailOptionsButton">Favorite</button>
            {!this.state.isAdding && <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Add a ride</button>}
            {this.state.isAdding &&
              <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Cancel</button>
            }
          </div>
        </div>
        {this.state.isAdding &&
          <div>
            <h3>Add a Ride:</h3>
              <form action="">
                <div className="small-10 columns">
                  <div className="row">
                    <div className="small-3 columns">
                      <label htmlFor="trail" className="right inline">trail</label>
                      <label htmlFor="contitionsRating" className="right inline">conditions</label>
                      <label htmlFor="comments" className="right inline">comments</label>
                    </div>
                    <div className="small-9 columns">
                      <input type="text" value={this.props.name} readOnly id="trail" />
                      <input type="number" defaultValue="5" min="1" max="5" id="conditionsRating"/>
                      <textarea placeholder="comments" id="comments" className="trailViewAddTrailTextarea" />
                    </div>
                    <input name="trailForm" className="button right" type="submit" value="Submit Ride" />
                  </div>
                </div>
              </form>
          </div>
        }
        <div>
          <img src={this.props.activities[0].thumbnail} alt="" />
        </div>
      </div>
    )
  }
});

export default IndexTrail;
