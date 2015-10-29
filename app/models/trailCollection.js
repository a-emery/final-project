import Backbone from 'backbone';
import Trail from '../models/trail.js'

var TrailCollection = Backbone.Collection.extend({
  initialize: function(model, options) {
      this.city = options.city || "spartanburg";
      this.state = options.state || "south carolina";
      this.url = 'https://jsonp.afeld.me/?url=' + 'https://outdoor-data-api.herokuapp.com/api.json?api_key=1f2e7f9b0adb2b7ea93268b8846110b1&q[activities_activity_type_name_cont]=mountain%20biking&q[city_cont]='
       + this.city + '&q[state_cont]=' + this.state
  },

  model: Trail,

  parse(response) {
    return response.places;
  }
})

export default TrailCollection;
