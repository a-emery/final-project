import Backbone from 'backbone';

var YesterdayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'http://api.wunderground.com/api/8f944a40d548965e/history_' + this.today + '/q/' + this.state + '/' + this.city + '.json';
  },

  setTwoDayLocation(today, state, city) {
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
