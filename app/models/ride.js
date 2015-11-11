import Backbone from 'backbone';
import _ from 'underscore';
import store from '../store';

var Ride = Backbone.Model.extend({

  idAttribute: 'objectId',

  urlRoot: "https://api.parse.com/1/classes/Ride",

  url: function() {
    return Backbone.Model.prototype.url.apply(this, arguments) + "?include=creator";
  },

  defaults() {
    return {
      trailId: "",
      trailName: "",
      condition: "",
      comment: "{no comment submitted}",
      creator: {},
      time: Date.now(),
      firstname: "",
      userId: "",
      img: ""
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

export default Ride;
