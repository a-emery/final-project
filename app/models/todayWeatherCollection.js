import Backbone from 'backbone';

var TodayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'http://api.wunderground.com/api/49bc60d4eee16416/history_' + this.today + '/q/' + this.state + '/' + this.city + '.json';
  },

  setTodayLocation(today, state, city) {
        this.city = city;
        this.state = state;
        this.today = today;
  },

  parse(response) {
    // console.log(response.history.dailysummary[0]);
    if (response && response.history && response.history.dailysummary[0]) {
      return response.history.dailysummary[0];
    } else {
      return response;
    }
  }
});

export default TodayWeatherCollection;
