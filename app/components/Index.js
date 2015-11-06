import React from 'react';
import moment from 'moment';

import TrailCollection from '../models/trailCollection';
import store from '../store';
import IndexTrail from '../components/indexTrail';
import Nav from '../components/reactNav';

const Index = React.createClass({

  propTypes: {
    trails: React.PropTypes.object
  },

  getDefaultProps() {
    return {
      trails: store.getTrailCollection(),
    };
  },

  componentWillMount() {
    this.props.trails.on('add remove change', this.forceUpdate.bind(this, null), this);
  },

  componentWillUnmount() {
    this.props.trails.off('add remove change', null, this);
  },


  handleTrailSearch(e) {
      e.preventDefault();
      // console.log(this.refs.state.value.slice(0,2));
      // console.log(this.refs.state.value.substr(2));
      this.props.trails.setLocation(this.refs.city.value, this.refs.state.value.substr(2));
      this.props.trails.fetch();
  },

  render() {
    return (

      <div className="indexContainer">
        <h1>Find a Trail:</h1>
          <form className="findATrailForm" onSubmit={this.handleTrailSearch}>
            <div className="indexCityContainer">
              <div className="indexCityTextContainer">
                <p className="indexFormText">City:</p>
              </div>
              <div className="indexCityInputContainer">
                <input className="indexFormInput" name="trailForm" type="text" id="city-label" placeholder="city" ref="city" />
              </div>
            </div>
            <div className="indexCityContainer">
              <div className="indexCityTextContainer">
                <p className="indexFormText">State:</p>
              </div>
              <div className="indexCityInputContainer">
                <select className="indexFormInput indexFormSelect" name="trailForm" id="state-label" ref="state">
                  <option value="">Any State</option>
                  <option value="ALAlabama">Alabama</option>
                  <option value="AKAlaska">Alaska</option>
                  <option value="AZArizona">Arizona</option>
                  <option value="ARArkansas">Arkansas</option>
                  <option value="CACalifornia">California</option>
                  <option value="COColorado">Colorado</option>
                  <option value="CTConnecticut">Connecticut</option>
                  <option value="DEDelaware">Delaware</option>
                  <option value="FLFlorida">Florida</option>
                  <option value="GAGeorgia">Georgia</option>
                  <option value="HIHawaii">Hawaii</option>
                  <option value="IDIdaho">Idaho</option>
                  <option value="IlIllinois">Illinois</option>
                  <option value="INIndiana">Indiana</option>
                  <option value="IAIowa">Iowa</option>
                  <option value="KSKansas">Kansas</option>
                  <option value="KYKentucky">Kentucky</option>
                  <option value="LALouisiana">Louisiana</option>
                  <option value="MEMaine">Maine</option>
                  <option value="MDMaryland">Marylad</option>
                  <option value="MAMassachusetts">Massachusetts</option>
                  <option value="MIMichigan">Michigan</option>
                  <option value="MNMinnesota">Minnesota</option>
                  <option value="MSMississippi">Mississippi</option>
                  <option value="MOMissouri">Missouri</option>
                  <option value="MTMontana">Montana</option>
                  <option value="NENebraska">Nebraska</option>
                  <option value="NVNevada">Nevada</option>
                  <option value="NHNew Hampshire">New Hampshire</option>
                  <option value="NJNew Jersey">New Jersey</option>
                  <option value="NMNew Mexico">New Mexico</option>
                  <option value="NYNew York">New York</option>
                  <option value="NCNorth Carolina">North Carolina</option>
                  <option value="NDNorth Dakota">North Dakota</option>
                  <option value="OHOhio">Ohio</option>
                  <option value="OKOklahoma">Oklahoma</option>
                  <option value="OROregon">Oregon</option>
                  <option value="PAPennsylvania">Pennsylvania</option>
                  <option value="RIRhode Island">Rhode Island</option>
                  <option value="SCSouth Carolina">South Carolina</option>
                  <option value="SDSouth Dakota">South Dakota</option>
                  <option value="TNTennessee">Tennessee</option>
                  <option value="TXTexas">Texas</option>
                  <option value="UTUtah">Utah</option>
                  <option value="VTVermont">Vermont</option>
                  <option value="VAVirginia">Virginia</option>
                  <option value="WAWashington">Washington</option>
                  <option value="WVWest Virginia">West Virginia</option>
                  <option value="WIWisconsin">Wisconsin</option>
                  <option value="WYWyoming">Wyoming</option>
                </select>
              </div>
            </div>

                  <input name="trailForm" className="button right" type="submit" value="Search" />
          </form>
          <div>
            {this.props.trails.toJSON().map((t) => <IndexTrail key={t.unique_id} {...t} />)}
          </div>
      </div>
    );
  }
});

export default Index;
