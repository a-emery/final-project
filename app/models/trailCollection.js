import Backbone from 'backbone';

var TrailCollection = Backbone.Collection.extend({

  url(){
    return 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking' + this.city + this.state + this.lat + this.lon + this.radius;
  },

  setLocation(city, state) {
    this.city = '&q[city_cont]=' + city;
    this.state = '&q[state_cont]=' + state;
    this.lat = "";
    this.lon = "";
    this.radius = "";
  },

  setGeoLocation(lat, lon) {
    this.city = "";
    this.state ="";
    this.lat = '&lat=' + lat;
    this.lon = '&lon=' + lon;
    this.radius = '&radius=25';
    console.log(this.lat, this.lon, this.radius);
  },

  parse(response) {
    return response.places;
  }
});

export default TrailCollection;

// &q[city_cont]=' + this.city + '&q[state_cont]=' + this.state
