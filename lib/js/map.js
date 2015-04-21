var map;
var brooklyn = new google.maps.LatLng(39.0308284,-77.0183044);

var MY_MAPTYPE_ID = 'custom_style';

function initialize() {

  var featureOpts = [
	  {
	    "stylers": [
	      { "visibility": "simplified" },
	      { "saturation": -100 },
	      { "lightness": -54 }
	    ]
	  },{
	    "featureType": "road.local",
	    "elementType": "labels.text",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "featureType": "poi.business",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  },{
	    "stylers": [
	      { "weight": 2 }
	    ]
	  },{
	    "featureType": "poi",
	    "elementType": "labels.icon",
	    "stylers": [
	      { "visibility": "off" }
	    ]
	  }
  ];

  var locations = [
      ['Location 1', 39.0308284,-77.0103044, 4],
      ['Location 2', 39.0308284,-77.0123044, 5],
      ['Location 3', 39.0308284,-77.0143044, 3],
      ['Location 4',39.0308284,-77.0163044, 2],
      ['Location 5', 39.0308284,-77.0183044, 1]
    ];

  var infowindow = new google.maps.InfoWindow();
  var marker, i;

  var mapOptions = {
    zoom: 15,
    center: brooklyn,
    disableDefaultUI: true,
    scrollwheel: false,
    navigationControl: false,
    mapTypeControl: false,
    scaleControl: false,
    draggable: true,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
    },
    mapTypeId: MY_MAPTYPE_ID
  };

  map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);

  var styledMapOptions = {
    name: 'Custom Style'
  };

  var customMapType = new google.maps.StyledMapType(featureOpts, styledMapOptions);

  map.mapTypes.set(MY_MAPTYPE_ID, customMapType);

    for (i = 0; i < locations.length; i++) {  
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          console.log(i);
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

google.maps.event.addDomListener(window, 'load', initialize);