import Backbone from 'backbone';
import _ from 'underscore';
import store from '../store';

var Ride = Backbone.Model.extend({

  idAttribute: 'objectId',

  urlRoot: "https://api.parse.com/1/classes/Ride",

  url: function() {
    var base = _.result(this, 'urlRoot');
    if (this.isNew()) return base;
    var id = this.get(this.idAttribute);
    return base.replace(/[^\/]$/, '$&/') + encodeURIComponent(id) + "?include=creator";
  },

  defaults() {
    return {
      trailId: "",
      trailName: "",
      condition: "",
      comment: "",
      creator: {},
      time: Date.now(),
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
