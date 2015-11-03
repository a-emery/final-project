import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import store from '../store';
import Navbar from '../components/navbar';


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
        <header className="nonHomeHeader">
          <p className="nonHomeHeaderName">Carin</p>
        </header>

        <Navbar />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
});

export default App;
