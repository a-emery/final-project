import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';

import App from './components/App';
import Index from './components/Index';
import Login from './components/Login';
import MyAccount from './components/MyAccount';
import Register from './components/Register';

ReactDOM.render((
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Index} />
      <Route path="login" component={Login} />
      <Route path="myAccount" component={MyAccount} />
      <Route path="register" component={Register} />
    </Route>
  </Router>
), document.getElementById('application'));
