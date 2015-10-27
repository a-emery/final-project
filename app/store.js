import Session from './models/User';

let session;
export default {
  getSession() {
    return (session || new Session());
  }
}
