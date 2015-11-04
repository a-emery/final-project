import $ from 'jquery';

import Session from './models/session';
import TrailCollection from './models/trailCollection';
import Trail from './models/trail';
import RideCollection from './models/rideCollection';
import FavoriteCollection from './models/favoriteCollection';
import TodayWeatherCollection from './models/todayWeatherCollection';
import YesterdayWeatherCollection from './models/yesterdayWeatherCollection';
import TwoDayWeatherCollection from './models/twoDayWeatherCollection';

/*
WEATHER API
1: 49bc60d4eee16416
2: bf1f146c870bfe6a
3: 8f944a40d548965e
*/


let session;
var trails = new TrailCollection();
var trail = new Trail();
var favorites = new FavoriteCollection();
var rides = new RideCollection();
var todayWeather = new TodayWeatherCollection();
var yesterdayWeather = new YesterdayWeatherCollection();
var twoDayWeather = new TwoDayWeatherCollection();


export default {
  getSession() {
    return (session = session || new Session());
  },

  getTrailCollection() {
    return (trails);
  },

  getTrail() {
    return (trail);
  },

  addRide(comment, options) {
    rides.create(comment, options);
  },

  favoriteTrail(comment, options) {
    favorites.create(comment, options);
  },

  getFavorites() {
    return (favorites);
  },

  getTodayWeather() {
    return (todayWeather);
  },

  getYesterdayWeather() {
    return (yesterdayWeather);
  },

  getTwoDayWeather() {
    return (twoDayWeather);
  },

  fixCity(city) {
    return city.replace(/ /g, "_");
  },

  getAbbr(state) {
    switch(state.toLowerCase()) {
      case "alabama":
        return "AL";
      case "alaska":
        return "AK";
      case "arizona":
        return "AZ";
      case "arkansas":
        return "AR";
      case "california":
        return "CA";
      case "colorado":
        return "CO";
      case "connecticut":
        return "CT";
      case "delaware":
        return "DE";
      case "florida":
        return "FL";
      case "georgia":
        return "GA";
      case "hawaii":
        return "HI";
      case "idaho":
        return "ID";
      case "illinois":
        return "IL";
      case "indiana":
        return "IN";
      case "iowa":
        return "IA";
      case "kansas":
        return "KS";
      case "kentucky":
        return "KY";
      case "louisiana":
        return "LA";
      case "maine":
        return "ME";
      case "maryland":
        return "MD";
      case "massachusetts":
        return "MA";
      case "michigan":
        return "MI";
      case "minnesota":
        return "MN";
      case "mississippi":
        return "MS";
      case "missouri":
        return "MO";
      case "montana":
        return "MT";
      case "nebraska":
        return "NE";
      case "nevada":
        return "NV";
      case "new hampshire":
        return "NH";
      case "new jersey":
        return "NJ";
      case "new mexico":
        return "NM";
      case "new york":
        return "NY";
      case "north carolina":
        return "NC";
      case "north dakota":
        return "ND";
      case "ohio":
        return "OH";
      case "oklahoma":
        return "OK";
      case "oregon":
        return "OR";
      case "pennsylvania":
        return "PA";
      case "rhode island":
        return "RI";
      case "south carolina":
        return "SC";
      case "south dakota":
        return "SD";
      case "tennessee":
        return "TN";
      case "texas":
        return "TX";
      case "utah":
        return "UT";
      case "vermont":
        return "VT";
      case "virginia":
        return "VA";
      case "washington":
        return "WA";
      case "west virginia":
        return "WV";
      case "wisconsin":
        return "WI";
      case "wyoming":
        return "WY";
      default:
        return "SC";
    }
  },

};
