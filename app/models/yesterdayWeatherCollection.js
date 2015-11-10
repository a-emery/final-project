import Backbone from 'backbone';

var YesterdayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'http://api.wunderground.com/api/bf1f146c870bfe6a/history_' + this.today + '/q/' + this.state + '/' + this.city + '.json';
  },

  setYesterdayLocation(today, state, city) {
        this.city = city;
        this.state = state;
        this.today = today;
  },

  parse(response) {
    if (response && response.history && response.history.dailysummary[0]) {
      return response.history.dailysummary[0];
    } else {
      return response;
    }
  }
});

export default YesterdayWeatherCollection;
