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
    params: React.PropTypes.object,
    trail: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      trail: store.getTrail(),
    };
  },

  componentWillMount() {
    this.props.trail.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.trail.setTrail(this.props.params.id);
    this.props.trail.fetch();
    document.getElementById("body").scrollIntoView();
  },

  componentWillUnmount() {
    this.props.trail.off('add remove change', null, this);
  },

  render() {
    return (
      <div>
        {this.props.trail.toJSON().map((t)=> <TrailView key={t.unique_id} {...t} />)}


      </div>
    );
  }
});

export default ShowTrail;
