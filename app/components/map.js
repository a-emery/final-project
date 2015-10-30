// http://revelry.co/development/2015/02/19/react-google-maps/

// App.Components.GMap = React.createClass
//   map: null
//   marker: null
//   infoWindow: null
//
//   render: ->
//     <div className="GMap">
//       <div ref="map_canvas">
//       </div>
//     </div>
//
//   componentDidMount: ->
//     # create the map, marker and infoWindow after the component has
//     # been rendered because we need to manipulate the DOM for Google =(
//     @map = @createMap()
//     @marker = @createMarker()
//     @infoWindow = @createInfoWindow()
//
//     # have to define google maps event listeners here too
//     # because we can't add listeners on the map until its created
//     google.maps.event.addListener @map, 'zoom_changed', => @handleZoomChange()
//     google.maps.event.addListener @map, 'dragend', => @handleDragEnd()
//
//   createMap: ->
//     coords = @props.coords
//     mapOptions =
//       minZoom: 9
//       zoom: 10
//       center: new google.maps.LatLng(@props.coords.lat, @props.coords.lon)
//
//     new google.maps.Map(@refs.map_canvas.getDOMNode(), mapOptions)
//
//   createMarker: ->
//     marker = new google.maps.Marker
//       position: new google.maps.LatLng(@props.coords.lat, @props.coords.lon)
//       map: @map
//
//   createInfoWindow: ->
//     contentString = "<div class='InfoWindow'>I'm a Window that contains Info Yay</div>"
//     infoWindow = new google.maps.InfoWindow
//       map: @map
//       anchor: @marker
//       content: contentString
//
//   handleZoomChange: ->
//     # something happens when the zoom changes
//     # this is where it's handled
//
//   handleDragEnd: ->
//     # something else happens when the map is dragged somewhere
//     # this is where that's handled
