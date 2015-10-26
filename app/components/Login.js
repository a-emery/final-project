import React from 'react';



const Login = React.createClass({

  handleLogin(e) {
    e.preventDefault()
    console.log(this.refs.email.value)
    console.log(this.refs.password.value)
  },

  render() {
    return (
      <form className="loginForm" name="loginForm" onSubmit={this.handleLogin}>
        <div className="row">
          <div className="small-10 columns">
            <div className="row">
              <div className="small-3 columns">
                <label htmlFor="email-label" className="right inline">email</label>
                <label htmlFor="password-label" className="right inline">password</label>
              </div>
              <div className="small-9 columns">
                <input type="text" name="loginForm" id="email-label" placeholder="email" ref="email" />
                <input type="password" name="loginForm" id="password-label" placeholder="password" ref="password" />
              </div>
                <input type="submit" name="loginForm" className="button right" value="Login"/>
            </div>
          </div>
        </div>
      </form>
    )
  }
});

export default Login
