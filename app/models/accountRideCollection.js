import Backbone from 'backbone';
import Ride from './ride';

var FavoriteCollection = Backbone.Collection.extend({

  model: Ride,

  url () {
    return 'https://api.parse.com/1/classes/Ride?&order=-createdAt&limit=5&include=creator&where={"userId":"' + this.objectId + '"}';
  },

  setUser(options) {
    this.objectId = options.objectId;
  },

  comparator(model) {
    return -model.get('time');
  },

  parse(response) {
    return response.results;
  }


});

export default FavoriteCollection;
