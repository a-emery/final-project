import React from 'react';
import { Link, History } from 'react-router';

import User from '../models/user';
import store from '../store';


// Adapted from https://github.com/TIY-GVL-FEE-2015-August/9.5-relational-data/blob/master/app/components/signup.js

const Register = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  mixins: [ History ],

  getInitialState() {
    return {
      error: false
    };
  },

  handleLogin(e) {
    e.preventDefault();

    let email = this.refs.email.value;
    let username = email;
    let password = this.refs.password.value;
    let firstname = this.refs.firstname.value;

    let user = new User({username, password, email, firstname});

    user.save().then(() => {
      return store.getSession().authenticate({sessionToken: user.get('sessionToken')}).then(() => {
        let { location } = this.props;
        if (location.state && location.state.nextPathname) {
          this.history.replaceState(null, location.state.nextPathname);
        } else {
          this.history.replaceState(null, '/');
        }
      });
    }, (xhr) => {
      this.setState({ error: xhr.responseJSON.error });
    });
  },

  render() {
    return (
      <div className="loginFormContainer">
        <form className="loginForm" name="registerForm" onSubmit={this.handleLogin}>
          <h1>Register:</h1>
                  <input className="loginFormInput" type="text" name="registerForm" id="name-label" placeholder="first name" ref="firstname" />
                  <input className="loginFormInput" type="text" name="registerForm" id="email-label" placeholder="email" ref="email" />
                  <input className="loginFormInput" type="text" name="registerForm" id="password-label" placeholder="password" ref="password" />
                  {this.state.error &&
                  <p>{this.state.error}</p>}
                  <input type="submit" name="registerForm" className="loginSubmitButton" value="Register"/>
        </form>
      </div>
    );
  }
});

export default Register;
