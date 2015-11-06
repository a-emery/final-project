import React from 'react';
import {Navbar, NavBrand, NavItem, Nav, NavDropdown, MenuItem} from 'react-bootstrap';
import {Link} from 'react-router';
import store from '../store';

const navbarInstance = React.createClass({

  logout(e) {
    e.preventDefault();
    store.getSession().invalidate();
    window.location.reload();
  },

  refresh() {
    // window.location.reload();
  },

  render() {
    var loggedIn = store.getSession().isAuthenticated();
    return (
      <Navbar inverse toggleNavKey={0}>
        <NavBrand><Link to="/">Carin</Link></NavBrand>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem eventKey={1} href="#/carin/myAccount">My Account</NavItem>
          {loggedIn &&
            <NavItem eventKey={2} onClick={this.logout} href="#">Sign Out</NavItem>
          }
          {!loggedIn &&
            <NavItem eventKey={2} href="#/carin/login">Login</NavItem>
          }
        </Nav>
      </Navbar>
    );
  }

});

export default navbarInstance;