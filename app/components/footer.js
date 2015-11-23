import React from 'react';

const Footer = React.createClass({

  render() {
    return (
      <footer className="footerContainer">
        <p className="footerCopyrightLeft">&copy; 2015 Aaron Emery</p>
        <div className="footerCopyrightRight">
          <a href="http://www.trailapi.com"><p className="footerCopyrightRightTrailAPI">&copy; 2015 TrailAPI</p></a>
          <img src="http://s27.postimg.org/gwaykko0j/weatherunderground.png" alt=""  className="footerCopyrightRightWU"/>
        </div>

      </footer>
    );
  }

});

export default Footer;
