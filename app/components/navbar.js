import React from 'react';
import { Link } from 'react-router';
import store from '../store';



const Navbar = React.createClass({

  logout(e) {
    e.preventDefault();
    store.getSession().invalidate();
    window.location.reload();
  },


  render() {
    var loggedIn = store.getSession().isAuthenticated();
    return (
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><Link to="/">Home</Link></h1>
          </li>
          <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
        </ul>
        <section className="top-bar-section">
          <ul className="right">
            <li><Link to="/carin/myAccount">My Account</Link></li>
            {loggedIn && <li onClick={this.logout}><a href="#">Sign Out</a></li>}
            {!loggedIn && <li><Link to="/carin/login">Login</Link></li>}
          </ul>
        </section>
      </nav>
    );
  }
});

export default Navbar;
