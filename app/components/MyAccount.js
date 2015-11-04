import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import _ from 'underscore';
import backbone from 'backbone';



const MyAccount = React.createClass({

  getDefaultProps() {
    return {
      favorite: store.getFavorites(),
    };
  },

  getInitialState() {
    return {
      user: store.getSession().get('currentUser').toJSON(),
    };
  },

  componentWillMount() {
    var session = store.getSession().on('change', this.forceUpdate.bind(this, null), this);
    this.props.favorite.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.favorite.fetch();
  },

  componentWillUnmount() {
    store.getSession().off('change', null, this);
    this.props.favorite.off('add remove change', null, this);
  },

  render() {
    let user = store.getSession().get('currentUser').toJSON();
    let favorites = this.props.favorite.toJSON();

    return (
      <div>
        <h1>Welcome, {user.firstname} </h1>
        <h3>Favorite Trails:</h3>
        {favorites.length === 0 && <Link to="/"><h6>You have yet to add any favorite trails</h6><h6>Add some favorite trails to make your life easier</h6></Link>}
        {favorites.map((t)=><Link key={t.trailId} to={`/carin/trail/${t.trailId}`}><h5>{t.trailName}</h5></Link>)}
      </div>
    );
  }
});

export default MyAccount;
