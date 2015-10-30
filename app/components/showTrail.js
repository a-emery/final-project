import React from 'react';
import $ from 'jquery';
import store from '../store';
import TrailView from '../components/trailView';
import IndexTrail from '../components/indexTrail';

const ShowTrail = React.createClass({

  propTypes: {
    name: React.PropTypes.string,
    city: React.PropTypes.string,
    state: React.PropTypes.string,
    params: React.PropTypes.object
  },

  getInitialState() {
    return {
      trail: store.getTrail([], this.props.params.id)
    }
  },

  componentWillMount() {
    this.state.trail.on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    this.state.trail.off('change', null, this);
  },


  render() {

    // this.state.trail.fetch().then(() => {
    //   setState({
    //     trail: this.state.trail.toJSON()
    //   })
    // });

    window.trail = this.state.trail
    this.state.trail.fetch().then(() => {
      this.setState({
        trail: this.state.trail
      })
    });


    return (
      <div>
        {this.state.trail.toJSON().map((t)=> <TrailView key={t.unique_id} {...t}/>)}


      </div>
    )
  }
});

export default ShowTrail;
