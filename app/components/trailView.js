import React from 'react';
import Backbone from 'backbone';
import _ from 'underscore';
import moment from 'moment';
import $ from 'jquery';

import { Link } from 'react-router';
import store from '../store';
import Map from '../components/map';

const IndexTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    unique_id: React.PropTypes.number,
    activities: React.PropTypes.array,
    todayWeather: React.PropTypes.object,
    favorite: React.PropTypes.object,
    yesterdayWeather: React.PropTypes.object,
    twoDayWeather: React.PropTypes.object,
    rides: React.PropTypes.object,
    lat: React.PropTypes.number,
    lon: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      favorite: store.getFavorites(),
      todayWeather: store.getTodayWeather(),
      yesterdayWeather: store.getYesterdayWeather(),
      twoDayWeather: store.getTwoDayWeather(),
      rides: store.getRides(),
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
    this.props.rides.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.rides.setTrail(this.props.unique_id);
    this.props.rides.fetch();
  },

  componentWillUnmount() {
    this.props.favorite.off('add remove change', null, this);
    this.props.todayWeather.off('add remove change', null, this);
    this.props.yesterdayWeather.off('add remove change', null, this);
    this.props.twoDayWeather.off('add remove change', null, this);
    this.props.rides.off('add remove change', null, this);
  },

  toggleAddRide(e) {
    e.preventDefault();
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
      comment: this.refs.comment.value || "{no comment submitted}",
      user: this.state.user,
      firstname: this.state.user.get('firstname'),
      userId: this.state.user.id
    });
    this.setState({
      isAdding: false
    });
  },

  averageConditions() {
    var conditionArray = [];
    this.props.rides.toJSON().filter((t) =>t.time > Date.now()-259200000).map((t)=> {
      conditionArray = conditionArray.concat(Number(t.condition));
    });
    var total = 0;
    for(var i = 0; i < conditionArray.length; i++){
      total += conditionArray[i];
    }
    return(Math.round((total/conditionArray.length) * 10) / 10);
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
    var rides = this.props.rides.toJSON() || [];
    var averageConditions = this.averageConditions() || "";
    if (rides === []) {
      console.log('hello');
    }
    var markers = [{position: {"lat":this.props.lat, "lng":this.props.lon}, key: this.props.unique_id}];

    return (
      <div className="trailViewTrailContainer">
        <div className="trailViewTrailInfoContainer">
          <div className="trailViewTrailName">
            <h3>{this.props.name}</h3>
            <p>{this.props.city}, {this.props.state}</p>
            <p><a href={this.props.activities[0].url} target="_blank">More trail info</a></p>
            {user &&
            <div>
              {isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleUnfavorite}>Unfavorite</button>}
              {!isFavorited && <button className="trailViewTrailOptionsButton" onClick={this.handleFavorite}>Favorite</button>}
              {!this.state.isAdding && <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Add a ride</button>}
              {this.state.isAdding &&
                <button className="trailViewTrailOptionsButton" onClick={this.toggleAddRide}>Cancel</button>
              }
            </div>
            }
          </div>
            <div className="weather">
              <h4 className="trailViewTrailConditionsHeader">Trail Conditions:</h4>
                {averageConditions &&
                  <h4 className="trailViewCurrentRating">Current Rating: {averageConditions}/5</h4>
                }
                {!averageConditions &&
                  <h4 className="trailViewCurrentRating">Current Rating: N/A (No recent reports)</h4>
                }
                {hasWeather &&
                  <div>
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
            </div>
                {!hasWeather &&
                  <div className="weather">
                    <p>Sorry, no weather is available for this location</p>
                  </div>
                }
        </div>
        {this.state.isAdding &&
          <div className="trailViewAddRideContainer">
            <div className="trailViewFormContainer">
              <h3 className="trailViewFormHeading">Add a Ride:</h3>
              <form name="addRideForm" onSubmit={this.handleAddRide}>
                <div className="trailViewFormPiece">
                  <div>
                    <div className="trailViewFormLabel">
                      <p>Trail Name:</p>
                    </div>
                    <div className="trailViewFormInput">
                      <input className="trailViewFormInputText trailViewFormInputDisabled" name="addRideForm" type="text" value={this.props.name} disabled id="trail" ref="trail" />
                    </div>
                  </div>
                </div>
                <div className="trailViewFormPiece">
                  <div>
                    <div className="trailViewFormLabel">
                      <p>Condition Rating:</p>
                    </div>
                    <div className="trailViewFormInput">
                      <input name="addRideForm" type="number" defaultValue="5" step="1" min="1" max="5" id="conditionsRating" ref="condition" />
                    </div>
                  </div>
                </div>
                <div className="trailViewFormPiece">
                  <div>
                    <div className="trailViewFormLabel">
                      <p>Comments:</p>
                    </div>
                    <div className="trailViewFormInput">
                      <textarea name="addRideForm" placeholder="comments (optional)" id="comments" className="trailViewAddTrailTextarea trailViewFormInputText" ref="comment" />
                    </div>
                  </div>
                </div>
                <div className="trailViewFormButtonsContainer">
                  <div className="trailViewFormButtons">
                    <button className="trailViewFormButton" onClick={this.toggleAddRide}>Cancel</button>
                    <input name="addRideForm" className="trailViewFormButton" type="submit" value="Submit Ride" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        }
        <div className="trailViewMapContainer">
          <Map markers={markers} {...this.props} />
        </div>
        <div className="trailViewRideContainerer">
          <h3 className="trailViewRidesHeading">Recent Rides:</h3>
            {rides.length > 0 &&
              rides.map((r)=>
              <div key={r.objectId || r.trailId} className="trailViewRideContainer">
                <div className="trailViewRideDateContainer">
                  <h5 className="trailViewRideDate">{moment(r.time).calendar()}</h5>
                  <p className="trailViewRideDate">Rider: {r.firstname}</p>
                </div>
                <div className="trailViewRideInfoContainer">
                  <p className="trailViewRideCondition">Condition rating: {r.condition}</p>
                  <p className="trailViewRideComment">Comments: {r.comment}</p>
                </div>
              </div>
            )}
            {rides.length < 1 &&
              <div>
                <p>Sorry, no rides have been recorded for this trail</p>
              </div>
            }
        </div>
        <div className="trailViewImagesContainer">
          <h3>Images:</h3>
          {this.props.activities[0].thumbnail &&
            <div className="trailViewImageContainer">
              <img className="trailViewImage" src={this.props.activities[0].thumbnail} alt="" />
            </div>
          }
          {!this.props.activities[0].thumbnail &&
            <div>
              <p>Sorry, there are no images for this trail</p>
            </div>

          }
        </div>
      </div>
    );
  }
});

export default IndexTrail;
