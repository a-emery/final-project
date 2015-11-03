import Backbone from 'backbone';

var TodayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'http://api.wunderground.com/api/Your_Key/history_' + this.today + '/q/' + this.state + '/San_Francisco.json';
  },

  setLocation(city, state) {
        this.city = city;
        this.state = state;
  },

  parse(response) {
    return response.places;
  }
});

var YesterdayWeatherCollection = Backbone.Collection.extend({

  url(){
    return 'https://trailapi-trailapi.p.mashape.com/?q[activities_activity_type_name_eq]=mountain+biking&q[city_cont]=' + this.city + '&q[state_cont]=' + this.state;
  },

  setLocation() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var yesterday = now.getFullYear()+"-"+(month)+"-"+(day);
    return yesterday;
  },

  parse(response) {
    return response.places;
  }
});

export default { TodayWeatherCollection, YesterdayWeatherCollection };


// moment().subtract(1, "days").format("YYYYMMDD")
