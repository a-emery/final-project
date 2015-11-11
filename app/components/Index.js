import React from 'react';
import moment from 'moment';
import { History } from 'react-router';

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

  getInitialState() {
    return {
      isLoading: false,
    };
  },

  componentWillMount() {
    this.props.trails.on('add remove change', this.forceUpdate.bind(this, null), this);
    this.props.trails.fetch();
    document.getElementById("body").scrollIntoView();
  },

  componentWillUnmount() {
    this.props.trails.off('add remove change', null, this);
  },

  handleTrailSearch(e) {
      e.preventDefault();
      this.setState({
        isLoading: true
      });
      this.props.trails.setLocation(this.refs.city.value, this.refs.state.value.substr(2));
      this.props.trails.fetch({success: () =>{
        this.setState({
          isLoading: false,
          hasResults: true
        });
        document.getElementById("results").scrollIntoView();
      }});
  },

  geo(e) {
    e.preventDefault();
    this.setState({
      isLoading: true
    });
    this.refs.city.value = "";
    this.refs.state.value = "";
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.trails.setGeoLocation(position.coords.latitude, position.coords.longitude);
      this.props.trails.fetch({success: () =>{
        this.setState({
          isLoading: false,
          hasResults: true
        });
        document.getElementById("results").scrollIntoView();
        }});
    });
  },

  render() {
    var hasTrails;
    if(this.props.trails.length>0){
      hasTrails = true;
    } else {
      hasTrails = false;
    }

    return (
      <div>
      <div className="appHeader">
        <div className="appHeaderContainer">
          <div className="indexContainer">
            <div className="indexFormContainer">
            <h1 className="indexFormHeader">Find a Trail:</h1>
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
                      <option value="">- Select a State -</option>
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
                <div className="indexSubmitButtonContainer">
                  {!this.state.isLoading && <input name="trailForm" className="indexSubmitButton" type="submit" value="Search" />}
                  {this.state.isLoading && <input type="submit" className="indexSubmitButton" value="Loading Results..." disabled/>}
                  {!this.state.isLoading && <input type="submit" onClick={this.geo} className="indexSubmitButton" value="Trails Around Me" />}
                  {this.state.isLoading && <input type="submit" onClick={this.geo} className="indexSubmitButton" value="Trails Around Me" disabled/>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {hasTrails &&
        <div className="indexSearchResults" id="results">
          <h3>Search Results:</h3>
          {this.props.trails.toJSON().map((t) => <IndexTrail key={t.unique_id} index={this.props.trails.toJSON().map(function(e) { return e.unique_id; }).indexOf(t.unique_id)+1} {...t} />)}
        </div>
      }
    </div>
    );
  }
});

export default Index;
