import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import store from '../store';
import Navbar from '../components/reactNav';
import Footer from '../components/footer';


const App = React.createClass({

  propTypes: {
      children: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      session: store.getSession()
    };
  },

  componentWillMount() {
    // store.getSession().restore();
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
        <Navbar />
        <div>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
});

export default App;
