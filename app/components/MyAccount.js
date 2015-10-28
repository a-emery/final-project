import React from 'react';
import store from '../store';



const MyAccount = React.createClass({

  render() {
    var user = store.getSession().get('currentUser');

    return (
      <h1>Welcome, {user.get('firstname')}</h1>
    )
  }
});

export default MyAccount
