import {default as React, Component} from "react";

import {GoogleMap, Marker} from "react-google-maps";

/*
 * This is the modify version of:
 * https://developers.google.com/maps/documentation/javascript/examples/event-arguments
 *
 * Add <script src="https://maps.googleapis.com/maps/api/js"></script> to your HTML to provide google.maps reference
 *
 * We use React 0.14 stateless function components here.
 * https://facebook.github.io/react/blog/2015/09/10/react-v0.14-rc1.html#stateless-function-components
 */
export default function SimpleMap (props) {

  return (
    <section style={{height: "300px"}}>
      <GoogleMap containerProps={{
          style: {
            height: "100%",
          },
        }}
          defaultZoom={12}
          defaultCenter={{lat: props.lat, lng: props.lon}}
          onClick={props.onMapClick}
      >
        {props.markers.map((marker, index) => {
          return (
            <Marker
                {...marker}
                onRightclick={() => console.log('you right clicked')} />
          );
        })}
      </GoogleMap>
    </section>
  );
}
