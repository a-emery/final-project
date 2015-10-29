import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import store from '../store';


const App = React.createClass({

  propTypes: {
      children: React.PropTypes.object
  },

  componentWillMount() {
    store.getSession().on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    store.getSession().off('change', null, this);
  },

  logout() {
    store.getSession().invalidate();
    window.location.reload();
  },

  render() {

    var loggedIn = store.getSession().isAuthenticated();
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
            <li className="toggle-topbar menu-icon"><a href="#"><span>Menu</span></a></li>
          </ul>
          <section className="top-bar-section">
            <ul className="right">
              <li><Link to="/myAccount">My Account</Link></li>
              {loggedIn && <li onClick={this.logout}><a href="#">Sign Out</a></li>}
              {!loggedIn && <li><Link to="/login">Login</Link></li>}
            </ul>
          </section>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default App
