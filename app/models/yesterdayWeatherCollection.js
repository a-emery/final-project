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
    // console.log(response.history.dailysummary[0]);
    if (response.history.dailysummary[0]) {
      return response.history.dailysummary[0];
    }
  }
});

export default YesterdayWeatherCollection;