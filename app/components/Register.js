import React from 'react';
import { Link } from 'react-router';

import User from '../models/User';
import store from '../store';



const Register = React.createClass({

  propTypes: {
    location: React.PropTypes.object
  },

  handleLogin(e) {
    e.preventDefault()

    let email = this.refs.email.value;
    let username = email;
    let password = this.refs.password.value;
    let name = this.refs.name.value;

    let user = new User({username, password, email, name});

    user.save()

    // .then(() => {
    //   return store.getSession().authenticate({sessionToken: user.get('sessionToken')}).then(() => {
    //     let { location } = this.props;
    //     if (location.state && location.state.nextPathname) {
    //       this.history.replaceState(null, location.state.nextPathname);
    //     } else {
    //       this.history.replaceState(null, '/');
    //     }
    //   });
    // }, (xhr) => {
    //   this.setState({ error: xhr.responseJSON.error });
    // });
  },

  render() {
    return (
      <form className="loginForm" name="registerForm" onSubmit={this.handleLogin}>
        <h1>Register a new account</h1>
        <div className="row">
          <div className="small-12 medium-4 small-centered columns">
            <div className="row">
              <div className="small-12 columns">
                <input type="text" name="registerForm" id="name-label" placeholder="name" ref="name" />
                <input type="text" name="registerForm" id="email-label" placeholder="email" ref="email" />
                <input type="text" name="registerForm" id="password-label" placeholder="password" ref="password" />
              </div>
                <input type="submit" name="registerForm" className="small-12 button" value="Register"/>
            </div>
          </div>
        </div>
      </form>
    )
  }
});

export default Register
