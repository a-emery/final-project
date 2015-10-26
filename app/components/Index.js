import React from 'react';

const App = React.createClass({

  handleTrailSearch(e) {
    e.preventDefault();
    console.log(this.refs.city.value)
    console.log(this.refs.state.value)
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
                      <option value="alabama">Alabama</option>
                      <option value="alaska">Alaska</option>
                      <option value="arizona">Arizona</option>
                      <option value="arkansas">Arkansas</option>
                      <option value="califonia">California</option>
                      <option value="colorado">Colorado</option>
                      <option value="connecticut">Connecticut</option>
                      <option value="Delaware">Delaware</option>
                      <option value="Florida">Florida</option>
                      <option value="georgia">Georgia</option>
                      <option value="hawaii">Hawaii</option>
                      <option value="idaho">Idaho</option>
                      <option value="illinois">Illinois</option>
                      <option value="indiana">Indiana</option>
                      <option value="iowa">Iowa</option>
                      <option value="kansas">Kansas</option>
                      <option value="kentucky">Kentucky</option>
                      <option value="louisiana">Louisiana</option>
                      <option value="maine">Maine</option>
                      <option value="maryland">Marylad</option>
                      <option value="massachusetts">Massachusetts</option>
                      <option value="michigan">Michigan</option>
                      <option value="minnesotta">Minnesotta</option>
                      <option value="mississippi">Mississippi</option>
                      <option value="missouri">Missouri</option>
                      <option value="montana">Montana</option>
                      <option value="nebraska">Nebraska</option>
                      <option value="nevada">Nevada</option>
                      <option value="new hampshire">New Hampshire</option>
                      <option value="new jersey">New Jersey</option>
                      <option value="new mexico">New Mexico</option>
                      <option value="new york">New York</option>
                      <option value="north carolina">North Carolina</option>
                      <option value="north dakota">North Dakota</option>
                      <option value="ohio">Ohio</option>
                      <option value="oklahoma">Oklahoma</option>
                      <option value="oregon">Oregon</option>
                      <option value="pennsylvania">Pennsylvania</option>
                      <option value="rhode island">Rhode Island</option>
                      <option value="south carolina">South Carolina</option>
                      <option value="south dakota">South Dakota</option>
                      <option value="tennessee">Tennessee</option>
                      <option value="texas">Texas</option>
                      <option value="utah">Utah</option>
                      <option value="vermont">Vermont</option>
                      <option value="virginia">Virginia</option>
                      <option value="washington">Washington</option>
                      <option value="west virginia">West Virginia</option>
                      <option value="wisconsin">Wisconsin</option>
                      <option value="wyoming">Wyoming</option>
                    </select>
                  </div>
                  <input name="trailForm" className="button right" type="submit" value="Search" />
                </div>
              </div>
            </div>
          </form>
      </div>
    )
  }
})

export default App
