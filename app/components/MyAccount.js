import React from 'react';
import store from '../store';
import { Link } from 'react-router';
import _ from 'underscore';
import backbone from 'backbone';

import Rides from '../components/myAccountRides';



const MyAccount = React.createClass({

  propTypes: {
    favorite: React.PropTypes.object,
    rides: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      favorite: store.getFavorites(),
      rides: store.getAccountRides(),
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
    document.getElementById("body").scrollIntoView();
    this.props.rides.on('add remove change', this.forceUpdate.bind(this, null), this);
    // this.props.rides.setUser(this.state.user);
    // this.props.rides.fetch();
  },

  componentWillUnmount() {
    store.getSession().off('change', null, this);
    this.props.favorite.off('add remove change', null, this);
    this.props.rides.off('add remove change', null, this);
  },

  handleUnfavorite(id) {
    let favorite = (_.where(this.props.favorite.toJSON(), id));
    favorite = (this.props.favorite.get(favorite[0].objectId));
    favorite.destroy();
    this.setState({
      isFavorited: false
    });
  },

  render() {
    let user = store.getSession().get('currentUser').toJSON();
    let favorites = this.props.favorite.toJSON();
    this.props.rides.setUser(user);
    this.props.rides.fetch();
    var rides = (this.props.rides.toJSON());
    var hasComments;
    if (rides.length < 1) {
      hasComments = false;
    } else {
      hasComments = true;
    }


    return (
      <div className="myAccountContainer">
        <h1>Welcome, {user.firstname} </h1>
        <h3>Favorite Trails:</h3>
        {favorites.length === 0 && <Link to="/"><h6>You have yet to add any favorite trails</h6><h6>Add some favorite trails to make your life easier</h6></Link>}
        {favorites.map((t)=><div key={t.trailId} className="myAccountFavoriteContainer"><button className="myAccountFavoriteButton" onClick={this.handleUnfavorite.bind(this, t.trailId)}>Unfavorite</button><Link to={`/carin/trail/${t.trailId}`}><h4 className="myAccountFavoriteTrailName">{t.trailName}</h4></Link></div>)}
          <div className="trailViewRideContainerer myAccountRides">
            <h3>My Recent Rides:</h3>
            {hasComments &&
              rides.map((r)=> <Rides key={r.objectId} {...r} />)
            }
            {!hasComments &&
              <p>You have not submitted any rides</p>
            }
          </div>
      </div>
    );
  }
});

export default MyAccount;
