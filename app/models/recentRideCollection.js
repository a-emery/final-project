import Backbone from 'backbone';
import Ride from './ride';

var RecentRideCollection = Backbone.Collection.extend({

  model: Ride,

  url() {
    return 'https://api.parse.com/1/classes/Ride?include=creator&where={"trailId":' + this.trailId + ',"time":{"$gte":' + this.previousDays + ',"$lte":' + this.today + '}}';
  },

  setTimeAndTrail(trailId, previousDays, today) {
    this.trailId = trailId;
    this.previousDays = previousDays;
    this.today = today;
  },

  comparator(model) {
    return -model.get('time');
  },

  parse(response) {
    return response.results;
  }

});

export default RecentRideCollection;
