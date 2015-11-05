import Backbone from 'backbone';
import Ride from './ride';

var RideCollection = Backbone.Collection.extend({

  model: Ride,

  url() {
    return 'https://api.parse.com/1/classes/Ride?include=creator&where={"trailId":' + this.trailId + '}';
  },

  setTrail(trailId) {
    this.trailId = trailId;
  },

  comparator(model) {
    return -model.get('time');
  },

  parse(response) {
    return response.results;
  }

});

export default RideCollection;
