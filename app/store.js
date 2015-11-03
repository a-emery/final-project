import Session from './models/session';
import TrailCollection from './models/trailCollection';
import Trail from './models/trail';
import Rides from './models/rideCollection';
import FavoriteCollection from './models/favoriteCollection';



let session;
var trails = new TrailCollection();
var trail = new Trail();
var favorites = new FavoriteCollection();


export default {
  getSession() {
    return (session = session || new Session());
  },

  getTrailCollection() {
    return (trails);
  },

  getTrail() {
    return (trail);
  },

  addRide(trailId, userId, conditions, comments) {
    let ride = new RideCollection(null, {});
  },

  favoriteTrail(comment, options) {
    favorites.create(comment, options);
  },

  getFavorites() {
    return (favorites);
  }

};
