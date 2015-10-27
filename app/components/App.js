import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';

const App = React.createClass({

  propTypes: {
      children: React.PropTypes.object
  },

  getInitialState() {
    return {
      loggedIn: false
    }
  },

  expandHamburger() {
    $('.mobileLink').addClass('showMobileLink');
  },

  collapseHamburger() {
    $('.mobileLink').removeClass('showMobileLink');
  },

  render() {
    return (
      <div>
        <header className="appHeader">
          <p className="headerName">Carin</p>
        </header>

        <nav className="top-bar" data-topbar role="navigation">
          <ul className="title-area">
            <li className="name">
              <h1><Link to="/">Home</Link></h1>
            </li>
            <li className="toggle-topbar menu-icon"><a href="#"><span onClick={this.expandHamburger}>Menu</span></a></li>
          </ul>
          <section className="top-bar-section">
            <ul className="right">
              <li><Link to="/myAccount">My Account</Link></li>
              {this.state.loggedIn && <li><a href="#">Sign Out</a></li>}
              {!this.state.loggedIn && <li><Link to="/login">Login</Link></li>}
            </ul>
          </section>
        </nav>
        <div onClick={this.collapseHamburger}>

          {this.props.children}

        </div>
      </div>
    )
  }
})

export default App
