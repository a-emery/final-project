import Backbone from 'backbone';
import Trail from '../models/trail.js'

var TrailCollection = Backbone.Collection.extend({
  initialize: function(model, options) {
      this.city = options.city || "spartanburg";
      this.state = options.state || "south carolina";
      this.url = 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]='
       + this.city + '&q[state_cont]=' + this.state
  },

  model: Trail,

  parse(response) {
    return response.places;
  }
})

export default TrailCollection;
