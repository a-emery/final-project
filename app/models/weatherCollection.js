import Backbone from 'backbone';

var TodayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'http://api.wunderground.com/api/49bc60d4eee16416/history_' + this.today + '/q/' + this.state + '/' + this.city + '.json';
  },

  setLocation(city, state, today) {
        this.city = city;
        this.state = state;
        this.today = today;
  },

  parse(response) {
    return response.places;
  }
});

var YesterdayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=' + this.city + '&q[state_cont]=' + this.state;
  },

  parse(response) {
    return response.places;
  }
});

export default { TodayWeatherCollection, YesterdayWeatherCollection };


// moment().subtract(1, "days").format("YYYYMMDD")
