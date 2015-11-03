import Backbone from 'backbone';
import Ride from './ride';

var RideCollection = Backbone.Collection.extend({

  model: Ride,

  url: "https://api.parse.com/1/classes/Ride?include=creator",

  parse(response) {
    return response.results;
  }

});

export default RideCollection;
