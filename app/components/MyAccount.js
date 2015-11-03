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
    this.props.favorite.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.favorite.setUser(this.state.user.objectId);
    this.props.favorite.fetch();
  },

  componentWillUnmount() {
    this.props.favorite.off('add remove change', null, this);
  },

  render() {
    let favorites = this.props.favorite.toJSON();

    return (
      <div>
        <h1>Welcome {this.state.user.firstname} </h1>
        <h3>Favorite Trails:</h3>
        {favorites.length === 0 && <Link to="/"><h6>You have yet to add any favorite trails</h6><h6>Add some favorite trails to make your life easier</h6></Link>}
        {favorites.map((t)=><Link key={t.trailId} to={`/carin/trail/${t.trailId}`}><h5>{t.trailName}</h5></Link>)}
      </div>
    );
  }
});

export default MyAccount;
