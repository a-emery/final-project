import Session from './models/session';
import TrailCollection from './models/trailCollection';
import Trail from './models/trail';



let session;
export default {
  getSession() {
    return (session = session || new Session());
  },

  getTrailCollection(model, city, state) {
    return (new TrailCollection(model, {city: city, state: state}))
  },

  getTrail(model, id) {
    return (new Trail(model, {id: id}))
  }
}


// encodeURIComponent
