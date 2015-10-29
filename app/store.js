import Session from './models/session';
import TrailCollection from './models/trailCollection';



let session;
export default {
  getSession() {
    return (session = session || new Session());
  },

  getTrailCollection(model, city, state) {
    return (new TrailCollection(model, {city: city, state: state}))
  }
}


// encodeURIComponent
