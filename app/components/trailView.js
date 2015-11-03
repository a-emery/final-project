import React from 'react';
import { Link } from 'react-router';
import store from '../store';
import moment from 'moment';
import _ from 'underscore';
import Backbone from 'backbone';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    activities: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      favorite: store.getFavorites(),
    };
  },

  getInitialState() {
    return {
      isAdding: false,
      user: store.getSession().get('currentUser')
    };
  },

  componentWillMount() {
    this.props.favorite.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.favorite.setUser(this.state.user.toJSON().objectId);
    this.props.favorite.fetch();
    if(_.where(this.props.favorite.toJSON(), {trailId: this.props.unique_id}).length > 0){
      this.setState({
        isFavorited: true
      });
    } else {
      this.setState({
        isFavorited: false
      });
    }
  },

  componentWillUnmount() {
    this.props.favorite.off('add remove change', null, this);
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

  handleFavorite(e) {
    store.favoriteTrail({
      trailId: this.props.unique_id,
      trailName: this.props.name,
      user: this.state.user,
    });
    this.setState({
      isFavorited: true
    });
  },

  handleUnfavorite(e) {
    console.log(e);
  },

  handleAddRide(e) {
    e.preventDefault();
    console.log({
      trailId: this.props.unique_id,
      condition: this.refs.condition.value,
      comment: this.refs.comment.value,
      user: this.state.user.get('objectId')
    });
    this.setState({
      isAdding: false
    });
  },

  render() {
    var user = store.getSession().get('currentUser');

    return (
      <div className="trailViewTrailContainer">
        <div className="trailViewTrailInfoContainer">
          <div className="trailViewTrailName">
            <h3>{this.props.name}</h3>
            <p>{this.props.city}, {this.props.state}</p>
            <p>Current Rating: 4/5</p>
          </div>
          <div className="trailViewTrailOptions">
            {this.state.isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleUnfavorite}>Unfavorite</button>}
            {!this.state.isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleFavorite}>Favorite</button>}
            {!this.state.isAdding && <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Add a ride</button>}
            {this.state.isAdding &&
              <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Cancel</button>
            }
          </div>
        </div>
        {this.state.isAdding &&
          <div className="trailViewFormContainer">
            <h3>Add a Ride:</h3>
              <form name="addRideForm" onSubmit={this.handleAddRide}>
                <div className="small-10 columns">
                  <div className="row">
                    <div className="small-3 columns">
                      <label htmlFor="trail" className="right inline">trail</label>
                      <label htmlFor="contitionsRating" className="right inline">conditions</label>
                      <label htmlFor="comments" className="right inline">comments</label>
                    </div>
                    <div className="small-9 columns">
                      <input name="addRideForm" type="text" value={this.props.name} readOnly id="trail" ref="trail" />
                      <input name="addRideForm" type="number"clasName="" defaultValue="5" step="1" min="1" max="5" id="conditionsRating" ref="condition" />
                      <textarea name="addRideForm" placeholder="comments" id="comments" className="trailViewAddTrailTextarea" ref="comment" />
                    </div>
                    <input name="addRideForm" className="button right" type="submit" value="Submit Ride" />
                  </div>
                </div>
              </form>
          </div>
        }
        <div>
          <img src={this.props.activities[0].thumbnail} alt="" />
        </div>
      </div>
    );
  }
});

export default IndexTrail;
