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
    store.resetTrails();
  },

  render() {
    var loggedIn = store.getSession().isAuthenticated();
    return (
      <Navbar className="navContainer" inverse toggleNavKey={0}>
        <NavBrand><Link to="/" onClick={this.refresh}>CARIN</Link></NavBrand>
        <Nav right eventKey={0}> {/* This is the eventKey referenced */}
          <NavItem eventKey={1} href="#/carin/myAccount">My Account</NavItem>
          {loggedIn &&
            <NavItem eventKey={2} href="#" onClick={this.logout}>Sign Out</NavItem>
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
