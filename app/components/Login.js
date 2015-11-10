import React from 'react';
import { Link, History } from 'react-router';

import store from '../store';


// Adapted from https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/components/login.js

const Login = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    };
  },

  handleLogin(event) {
    event.preventDefault();

    let username = this.refs.email.value;
    let password = this.refs.password.value;

    let session = store.getSession();

    session.authenticate({username, password}).then((loggedIn) => {
      if (!loggedIn)
        return this.setState({ error: true });

      var { location } = this.props;

      if (location.state && location.state.nextPathname) {
        this.history.replaceState(null, location.state.nextPathname);
      } else {
        this.history.replaceState(null, '/');
      }
    });
  },

  render() {
    return (
      <div className="loginFormContainer">
        <form className="loginForm" name="loginForm" onSubmit={this.handleLogin}>
          <h3>Login</h3>
          <input className="loginFormInput" type="text" name="loginForm" id="email-label" placeholder="email" ref="email" />
          <input className="loginFormInput" type="password" name="loginForm" id="password-label" placeholder="password" ref="password" />
          {this.state.error &&
          <p>{this.state.error}</p>}
          <div className="loginSubmitButtonContainer">
            <input type="submit" name="loginForm" className="loginSubmitButton" value="Login"/>
            <p className="loginNotAUser">Not a user? <Link to="/carin/register">Register now</Link></p>
          </div>
        </form>
      </div>
    );
  }
});

export default Login;
