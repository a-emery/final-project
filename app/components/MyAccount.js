import React from 'react';
import store from '../store';
import { Link } from 'react-router';



const MyAccount = React.createClass({

  getDefaultProps() {
    return {
      favorite: store.getFavorites(),
    }
  },

  getInitialState() {
    return {
      user: store.getSession().get('currentUser').toJSON(),
    }
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
    console.log(favorites.length);

    return (
      <div>
        <h1>Welcome, {this.state.user.firstname}</h1>
        <h3>Favorite Trails:</h3>
        {favorites.length === 0 && <Link to="/"><h5>You have yet to add any favorite trails</h5><h5>Add some favorite trails to make your life easier</h5></Link>}
        {favorites.map((t)=><Link key={t.trailId} to={`/carin/trail/${t.trailId}`}><h5>{t.trailName}</h5></Link>)}
      </div>
    )
  }
});

export default MyAccount
