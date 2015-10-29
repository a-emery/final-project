import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/app';
import Index from './components/index';
import Login from './components/login';
import MyAccount from './components/myAccount';
import Register from './components/register';
import ShowTrail from './components/showTrail';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="login" component={Login} />
      <Route path="myAccount" component={MyAccount} />
      <Route path="register" component={Register} />
      <Route path="trail/:id" component={ShowTrail} />
    </Route>
  </Router>
), document.getElementById('application'));
