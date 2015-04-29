/*global jQuery, google */

var Gmap = (function($) {
    'use strict';

    var s,
        wrap = $('.js-gmap');

    return {
        settings: {
            infoWindow: {},
            mapMarkers: [],
            mapPointJSON: wrap.data('points'),
            customMapID: 'dark_map',
            customMapFeatureOptions: [{
                stylers: [{
                    visibility: 'simplified'
                }, {
                    saturation: -100
                }, {
                    lightness: -54
                }, {
                    weight: 2
                }]
            }, {
                featureType: 'road.local',
                elementType: 'labels.text',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
                featureType: 'road.local',
                elementType: 'geometry.fill',
                stylers: [{
                    color: '#675F5C'
                }]
            },{
                featureType: 'poi.business',
                stylers: [{
                    visibility: 'off'
                }]
            },{
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: [{
                    visibility: 'off'
                }]
            }]
        },

        init: function(args) {
            if (wrap && wrap.length) {
                s = $.extend({}, this.settings, args);
                this.initGoogleMaps();
                this.loadMapPointData();
            }
        },

        initGoogleMaps: function() {
            var customMapType = new google.maps.StyledMapType(s.customMapFeatureOptions, {}),
                mapOptions = {
                    disableDefaultUI: true,
                    scrollwheel: false,
                    navigationControl: false,
                    mapTypeControl: false,
                    scaleControl: false,
                    draggable: true,
                    mapTypeControlOptions: {
                        mapTypeIds: [google.maps.MapTypeId.ROADMAP, s.customMapID]
                    },
                    mapTypeId: s.customMapID
                };
            s.infoWindow = new google.maps.InfoWindow({
                content: '',
                maxWidth: 280
            });
            s.map = new google.maps.Map(wrap[0], mapOptions);
            s.map.mapTypes.set(s.customMapID, customMapType);
            google.maps.event.addListener(s.map, 'click', function() {
                s.infoWindow.close();
            });
        },

        loadMapPointData: function() {
            $.getJSON(s.mapPointJSON)
                .done(function(data) {
                    Gmap.addMarkers(data.points);
                    Gmap.setCenterAndZoom();
                });
        },

        addInfoWindowContent: function(addressObject, marker) {
            var infoWindowString = '',
                infoWindowAddressString = '';

            $.each(addressObject.addressLines, function(index, val) {
                if (val && val !== '') {
                    infoWindowAddressString +=
                        '<span class="gmap-popup-address-line">'+
                            addressObject.addressLines[index]+
                        '</span>';
                }
            });

            infoWindowString +=
                '<div class="gmap-popup">'+
                    '<div class="gmap-popup-img" style="background-image: url('+ addressObject.imgSrc +')"></div>'+
                    '<div class="gmap-popup-text">'+
                        '<h3 class="gmap-popup-title">'+
                            '<a href="' + (addressObject.detailLink || '#') + '">' + (addressObject.name || '') + '</a>'+
                        '</h3>'+
                        '<address class="gmap-popup-address">'+
                            (infoWindowAddressString || '')+
                        '</address>'+
                        '<span class="gmap-popup-tel">Appointments: <a target="_blank" href="tel:'+ addressObject.tel +'">' + (addressObject.telFormatted || '') + '</a></span>'+
                    '</div>'+
                '</div>';

            google.maps.event.addListener(marker, 'click', function() {
                s.infoWindow.close();
                s.infoWindow.setContent(infoWindowString);
                s.infoWindow.open(s.map, marker);
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                marker.setOpacity(0.8);
            });
            google.maps.event.addListener(marker, 'mouseout', function() {
                marker.setOpacity(1);
            });
        },

        plotSingleMarker: function(addressObject) {

            var markerLatLng = new google.maps.LatLng(addressObject.lat, addressObject.lng),
                marker,
                markerImgSrc = '/files/images/pin_sm_mobile.png';

            marker = new google.maps.Marker({
                map: s.map,
                position: markerLatLng,
                icon: markerImgSrc
            });
            Gmap.addInfoWindowContent(addressObject, marker);
            s.mapMarkers.push(marker);

        },

        addMarkers: function(points) {
            var totalPoints = points.length;
            for (var i = 0; i < totalPoints; i++) {
                Gmap.plotSingleMarker(points[i]);
            }
        },

        setCenterAndZoom: function() {
            var bounds = new google.maps.LatLngBounds(),
                markers = s.mapMarkers,
                totalMarkers = markers.length;
            for (var i = 0; i < totalMarkers; i++) {
                bounds.extend(markers[i].getPosition());
            }
            s.map.fitBounds(bounds);
        }

    };
})(jQuery);

Gmap.init();