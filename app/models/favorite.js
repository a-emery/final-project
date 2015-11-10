import Backbone from 'backbone';
import _ from 'underscore';
import store from '../store';

// adapted from https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/models/recipe.js

var Favorite = Backbone.Model.extend({

  idAttribute: 'objectId',

  urlRoot: "https://api.parse.com/1/classes/Favorite",

  url: function() {
    return Backbone.Model.prototype.url.apply(this, arguments) + "?include=creator";
  },

  defaults() {
    return {
      trailId: "",
      trailName: "",
      creator: {},
    };
  },

  toJSON(options) {
    // I'm saving the model
    if(options) {
      return _.extend({}, this.attributes, {
        creator: {
          "__type": "Pointer",
          "className": "_User",
          "objectId": this.get('creator').objectId
        }
      });
    } else {
      return _.clone(this.attributes);
    }
  },

  save() {
    let currentUser = store.getSession().get('currentUser').toJSON();
    if(currentUser) {
      if(this.isNew()) {
        this.set('creator', currentUser);
      }
      Backbone.Model.prototype.save.apply(this, arguments);
    } else {
      return new Promise((_, reject) => reject("Invalid session"));
    }
  }

});

export default Favorite;
