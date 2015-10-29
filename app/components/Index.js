import React from 'react';

import TrailCollection from '../models/trailCollection';
import store from '../store';

const Index = React.createClass({

  getInitialState() {
    return {
      trails: store.getTrailCollection()
    }
  },

  componentWillMount() {
    this.state.trails.on('change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    this.state.trails.off('change', null, this);
  },

  handleTrailSearch(e) {
    e.preventDefault();
    this.state.trails = store.getTrailCollection([], this.refs.city.value, this.refs.state.value);
    this.state.trails.fetch().then(
      ()=> {
        this.setState({
          trails: this.state.trails
        })
      }
    )

  },

  render() {
    return (
      <div className="indexContainer">
        <h1>Find a Trail:</h1>


          <form className="findATrailForm" onSubmit={this.handleTrailSearch}>
            <div className="row">
              <div className="small-10 columns">
                <div className="row">
                  <div className="small-3 columns">
                    <label htmlFor="city-label" className="right inline">city</label>
                    <label htmlFor="state-label" className="right inline">state</label>
                  </div>
                  <div className="small-9 columns">
                    <input name="trailForm" type="text" id="city-label" placeholder="city" ref="city" />
                    <select name="trailForm" id="state-label" ref="state">
                      <option value="select">- Select a State -</option>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="Arkansas">Arkansas</option>
                      <option value="Califonia">California</option>
                      <option value="Colorado">Colorado</option>
                      <option value="Connecticut">Connecticut</option>
                      <option value="Delaware">Delaware</option>
                      <option value="Florida">Florida</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Hawaii">Hawaii</option>
                      <option value="Idaho">Idaho</option>
                      <option value="Illinois">Illinois</option>
                      <option value="Indiana">Indiana</option>
                      <option value="Iowa">Iowa</option>
                      <option value="Kansas">Kansas</option>
                      <option value="Kentucky">Kentucky</option>
                      <option value="Louisiana">Louisiana</option>
                      <option value="Maine">Maine</option>
                      <option value="Maryland">Marylad</option>
                      <option value="Massachusetts">Massachusetts</option>
                      <option value="Michigan">Michigan</option>
                      <option value="Minnesotta">Minnesotta</option>
                      <option value="Mississippi">Mississippi</option>
                      <option value="Missouri">Missouri</option>
                      <option value="Montana">Montana</option>
                      <option value="Nebraska">Nebraska</option>
                      <option value="Nevada">Nevada</option>
                      <option value="New Hampshire">New Hampshire</option>
                      <option value="New Jersey">New Jersey</option>
                      <option value="New Mexico">New Mexico</option>
                      <option value="New York">New York</option>
                      <option value="North Carolina">North Carolina</option>
                      <option value="North Dakota">North Dakota</option>
                      <option value="Ohio">Ohio</option>
                      <option value="Oklahoma">Oklahoma</option>
                      <option value="Oregon">Oregon</option>
                      <option value="Pennsylvania">Pennsylvania</option>
                      <option value="Rhode Island">Rhode Island</option>
                      <option value="South Carolina">South Carolina</option>
                      <option value="South Dakota">South Dakota</option>
                      <option value="Tennessee">Tennessee</option>
                      <option value="Texas">Texas</option>
                      <option value="Utah">Utah</option>
                      <option value="Vermont">Vermont</option>
                      <option value="Virginia">Virginia</option>
                      <option value="Washington">Washington</option>
                      <option value="West Virginia">West Virginia</option>
                      <option value="Wisconsin">Wisconsin</option>
                      <option value="Wyoming">Wyoming</option>
                    </select>
                  </div>
                  <input name="trailForm" className="button right" type="submit" value="Search" />
                </div>
              </div>
            </div>
          </form>
          <div>
            {this.state.trails && this.state.trails.toJSON().map((t) => <p key={t.unique_id}>{t.city}</p>)}
          </div>
      </div>
    )
  }
})

export default Index
