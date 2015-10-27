import Session from './models/Session';

let session;
export default {
  getSession() {
    return (session || new Session());
  }
}
