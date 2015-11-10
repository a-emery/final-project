import React from 'react';

const Footer = React.createClass({

  render() {
    return (
      <footer className="footerContainer">
        <p className="footerCopyrightLeft">&copy; 2015 Aaron Emery</p>
        <div className="footerCopyrightRight">
          <a href="http://www.trailapi.com"><p className="footerCopyrightRightTrailAPI">Copyright 2012 TrailAPI</p></a>
          <img src="../../public/assets/images/weatherunderground.png" alt=""  className="footerCopyrightRightWU"/>
        </div>

      </footer>
    );
  }

});

export default Footer;
