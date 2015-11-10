import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import MyAccount from './components/myAccount';
import Register from './components/register';
import ShowTrail from './components/showTrail';
import NonHomeApp from './components/nonHomeApp';

import store from './store';

// requireAuth adapted from https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/router.js

function requireAuth(nextState, replaceState) {
  if( ! store.getSession().isAuthenticated() ) {
    replaceState({ nextPathname: nextState.location.pathname }, '/carin/login');
  }
}

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
    </Route>
    <Route path="/carin/" component={NonHomeApp}>
      <Route path="login" component={Login} />
      <Route path="myAccount" component={MyAccount} onEnter={requireAuth} />
      <Route path="register" component={Register} />
      <Route path="trail/:id" component={ShowTrail} />
    </Route>
  </Router>
), document.getElementById('application'));
