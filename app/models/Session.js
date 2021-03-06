import $ from 'jquery';
import Backbone from 'backbone';
import User from './user';

// from https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/models/session.js;

const Session = Backbone.Model.extend({
  authenticate(options) {
      if (options.username && options.password) {
        return $.ajax({
          url: "https://api.parse.com/1/login",
          data: {
            username: options.username,
            password: options.password
          }
        }).then((response) => {
          this.set('currentUser', new User(response));
          localStorage.setItem('parse-session-token', response.sessionToken);
          return true;
        }, () => false);
      } else if (options.sessionToken) {
        // I'm authenticating with a sessionToken
        var user = new User(options);
        localStorage.setItem('parse-session-token', options.sessionToken);
        this.set('currentUser', user);
        return user.fetch().then(() => {
          this.set('currentUser', user.clone());
          return true;
        }, () => false);
      } else {
        console.error("Invalid arguments to authenticate");
        var dfd = new $.Deferred();
        dfd.reject("Invalid arguments to authenticate");
        return dfd.promise();
      }
    },

    restore() {
      var token = localStorage.getItem('parse-session-token');
      if (token) {
        this.authenticate({
          sessionToken: token
        });
      }
    },

    invalidate() {
      localStorage.removeItem('parse-session-token');
      this.set('currentUser', null);
      window.location.reload();
    },

    isAuthenticated() {
      return !!this.get('currentUser');
    }
});
export default Session;
