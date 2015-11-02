import Backbone from 'backbone';
import Favorite from './favorite';

var FavoriteCollection = Backbone.Collection.extend({

  model: Favorite,

  url: "https://api.parse.com/1/classes/Favorite",

  parse(response) {
    return response.results;
  }


})

export default FavoriteCollection;
