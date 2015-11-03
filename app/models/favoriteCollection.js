import Backbone from 'backbone';
import Favorite from './favorite';

var FavoriteCollection = Backbone.Collection.extend({

  model: Favorite,

  url () {
    return "https://api.parse.com/1/classes/Favorite?include=creator&where=" + JSON.stringify({
      creator: {
        __type: "Pointer",
        className: "_User",
        objectId: this.user
      }
    })
  },

  setUser(user) {
    this.user = user;
  },

  parse(response) {
    return response.results;
  }


})

export default FavoriteCollection;
