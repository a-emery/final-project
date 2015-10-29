import Backbone from 'backbone';

var TrailCollection = Backbone.Collection.extend({
  initialize: function(model, options) {
      this.city = options.city;
      this.state = options.state;
      this.url = 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]='
       + this.city + '&q[state_cont]=' + this.state;
      // this.url = 'https://trailapi-trailapi.p.mashape.com/?q[unique_id_eq]=28508'
  },

  parse(response) {
    return response.places;
  }
})

export default TrailCollection;
