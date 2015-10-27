import React from 'react';
import { Link } from 'react-router';



const Login = React.createClass({

  handleLogin(e) {
    e.preventDefault()
    console.log(this.refs.email.value)
    console.log(this.refs.password.value)
  },

  render() {
    return (
      <form className="loginForm" name="loginForm" onSubmit={this.handleLogin}>
        <h1>Login</h1>
        <div className="row">
          <div className="small-12 medium-4 small-centered columns">
            <div className="row">
              <div className="small-12 columns">
                <input type="text" name="loginForm" id="email-label" placeholder="email" ref="email" />
                <input type="password" name="loginForm" id="password-label" placeholder="password" ref="password" />
              </div>
                <input type="submit" name="loginForm" className="small-12 button" value="Login"/>
                <p className="newUserTest left">Not a user? <Link to="/register">Register now</Link></p>
            </div>
          </div>
        </div>
      </form>
    )
  }
});

export default Login
