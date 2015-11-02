import Session from './models/session';
import TrailCollection from './models/trailCollection';
import Trail from './models/trail';



let session;
var trails = new TrailCollection();
var trail = new Trail();


export default {
  getSession() {
    return (session = session || new Session());
  },

  getTrailCollection() {
    return (trails)
  },

  getTrail() {
    return (trail)
  },
}
