import React from 'react';
import Backbone from 'backbone';
import _ from 'underscore';
import moment from 'moment';

import { Link } from 'react-router';
import store from '../store';

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
      todayWeather: store.getTodayWeather(),
      yesterdayWeather: store.getYesterdayWeather(),
      twoDayWeather: store.getTwoDayWeather(),
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
    this.props.favorite.fetch();
    this.props.todayWeather.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.todayWeather.setTodayLocation(moment().format('YYYYMMDD'), store.getAbbr(this.props.state), store.fixCity(this.props.city));
    this.props.todayWeather.fetch();
    this.props.yesterdayWeather.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.yesterdayWeather.setYesterdayLocation(moment().subtract(1, "days").format("YYYYMMDD"), store.getAbbr(this.props.state), store.fixCity(this.props.city));
    this.props.yesterdayWeather.fetch();
    this.props.twoDayWeather.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.twoDayWeather.setTwoDayLocation(moment().subtract(2, "days").format("YYYYMMDD"), store.getAbbr(this.props.state), store.fixCity(this.props.city));
    this.props.twoDayWeather.fetch();
  },

  componentWillUnmount() {
    this.props.favorite.off('add remove change', null, this);
    this.props.todayWeather.off('add remove change', null, this);
    this.props.yesterdayWeather.off('add remove change', null, this);
    this.props.twoDayWeather.off('add remove change', null, this);

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
    let favorite = (_.where(this.props.favorite.toJSON(), {trailId: this.props.unique_id}));
    favorite = (this.props.favorite.get(favorite[0].objectId));
    favorite.destroy();
    this.setState({
      isFavorited: false
    });
  },

  handleAddRide(e) {
    e.preventDefault();
    store.addRide({
      trailId: this.props.unique_id,
      trailName: this.props.name,
      condition: this.refs.condition.value,
      comment: this.refs.comment.value,
      user: this.state.user,
    });
    this.setState({
      isAdding: false
    });
  },

  render() {
    var user = store.getSession().get('currentUser');
    var isFavorited;
    if(_.where(this.props.favorite.toJSON(), {trailId: this.props.unique_id}).length > 0){
      isFavorited = true;
    } else {
      isFavorited = false;
    }
    var todayWeather = this.props.todayWeather.toJSON()[0] || {};
    var yesterdayWeather = this.props.yesterdayWeather.toJSON()[0] || {};
    var twoDayWeather = this.props.twoDayWeather.toJSON()[0] || {};
    var hasWeather;
    if(this.props.todayWeather && this.props.todayWeather.toJSON() && this.props.todayWeather.toJSON()[0] && this.props.todayWeather.toJSON()[0].precipi) {
      hasWeather = true;
    } else {
      hasWeather = false;
    }
    // console.log(hasWeather);
    // console.log(todayWeather);
    // console.log(yesterdayWeather);
    // console.log(twoDayWeather);

    return (
      <div className="trailViewTrailContainer">
        <div className="trailViewTrailInfoContainer">
          <div className="trailViewTrailName">
            <h3>{this.props.name}</h3>
            <p>{this.props.city}, {this.props.state}</p>
            <p>Current Rating: 4/5</p>
            <p><a href={this.props.activities[0].url} target="_blank">More trail info</a></p>
          </div>
          <div className="trailViewTrailOptions">
            {isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleUnfavorite}>Unfavorite</button>}
            {!isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleFavorite}>Favorite</button>}
            {!this.state.isAdding && <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Add a ride</button>}
            {this.state.isAdding &&
              <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Cancel</button>
            }
          </div>
        </div>
        {hasWeather &&
          <div className="weather">
            <div className="temperatureContainer">
              <h5>Todays Temperature</h5>
              <p>High: {todayWeather.maxtempi}&#8457; </p>
              <p>Low: {todayWeather.mintempi}&#8457; </p>
              <p>Avg: {todayWeather.meantempi}&#8457;</p>
            </div>
            <div className="precipContainer">
              <h5>Precipication Totals</h5>
              <p>Today: {todayWeather.precipi}&#34; </p>
              <p>Yesterday: {yesterdayWeather.precipi}&#34; </p>
              <p>Two-Days Ago: {twoDayWeather.precipi}&#34;</p>
            </div>
          </div>
        }
        {!hasWeather &&
          <div className="weather">
            <p>Sorry, no weather is available for this location</p>
          </div>
        }
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
                      <textarea name="addRideForm" placeholder="comments (optional)" id="comments" className="trailViewAddTrailTextarea" ref="comment" />
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
