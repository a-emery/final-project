import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import store from '../store';


const App = React.createClass({

  propTypes: {
      children: React.PropTypes.object
  },

  getInitialState() {
    return {
      loggedIn: !!window.session.get('currentUser')
    }
  },

  componentWillMount() {
    store.getSession().on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    store.getSession().off('change', null, this);
  },

  logout() {
    store.getSession().invalidate();
  },

  render() {
    console.log(window.session);
    console.log(store.getSession());
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
              {this.state.loggedIn && <li onClick={this.logout}><a href="#">Sign Out</a></li>}
              {!this.state.loggedIn && <li><Link to="/login">Login</Link></li>}
            </ul>
          </section>
        </nav>

          {this.props.children}
      </div>
    )
  }
})

export default App
