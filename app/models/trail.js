import Backbone from 'backbone';

var Trail = Backbone.Collection.extend({

  url(){
    return 'https://trailapi-trailapi.p.mashape.com/?q[unique_id_eq]=' + this.id
  },

  setTrail(id) {
        this.id = id;
  },

  parse(response) {
    return response.places;
  }
})

export default Trail;
