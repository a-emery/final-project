import Backbone from 'backbone';

var Trail = Backbone.Collection.extend({
  initialize: function(model, options) {
      this.id = options.id;
      this.url = 'https://trailapi-trailapi.p.mashape.com/?q[unique_id_eq]='
       + this.id;
  },

  parse(response) {
    return response.places;
  }
})

export default Trail;
