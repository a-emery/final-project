import React from 'react';
import { Link, History } from 'react-router';

import store from '../store';



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
      <form className="loginForm" name="loginForm" onSubmit={this.handleLogin}>
        <h3>Login</h3>
        <div className="row">
          <div className="small-12 medium-4 small-centered columns">
            <div className="row">
              <div className="small-12 columns">
                <input type="text" name="loginForm" id="email-label" placeholder="email" ref="email" />
                <input type="password" name="loginForm" id="password-label" placeholder="password" ref="password" />
                {this.state.error &&
                <p>{this.state.error}</p>}
              </div>
                <input type="submit" name="loginForm" className="small-12 button" value="Login"/>
                <p className="newUserTest left">Not a user? <Link to="/carin/register">Register now</Link></p>
            </div>
          </div>
        </div>
      </form>
    );
  }
});

export default Login;
