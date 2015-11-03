import Backbone from 'backbone';

var TrailCollection = Backbone.Collection.extend({

  url(){
    return 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=' + this.city + '&q[state_cont]=' + this.state;
  },

  setLocation(city, state) {
        this.city = city;
        this.state = state;
  },

  parse(response) {
    return response.places;
  }
});

export default TrailCollection;
