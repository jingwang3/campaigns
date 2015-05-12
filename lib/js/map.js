/*global jQuery, google, ga */
var curLocationLink, curPhoneLink;
var sendTrackingData = function(ele){
	ga('send', 'event', 'gMap InfoWindow Click', 'ACT=Click TAG='+ele.prop("tagName"), 'LABEL='+ele.attr('trackingLabel')+' LINK='+ele.attr('href')+' COPY='+ele.text()+' ALT='+ele.attr('alt')+' SRC='+ele.attr('src')+' ID='+ele.attr('id')+' WIDTH='+ele.width()+' HEIGHT='+ele.height());
};

var Gmap = (function($) {
    'use strict';

    var s,
        wrap = $('.js-gmap');
        
    var smallScreen = function(params) {
        return $(window).width() <= 600;
    };
    
    var largeScreen = function(params) {
        return $(window).width() > 600;
    };

    return {
        settings: {
            infoWindow: {},
            locationDetailsMobile: $('.js-map-location-details-mobile'),
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
            }, {
                featureType: 'poi.business',
                stylers: [{
                    visibility: 'off'
                }]
            }, {
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
                this.bindResizeEvents();
            }
        },

        initGoogleMaps: function() {
            var customMapType = new google.maps.StyledMapType(s.customMapFeatureOptions, {}),
                mapOptions = {
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

        bindResizeEvents: function() {
            var timer;
            $(window).on('resize', function() {
                window.clearTimeout(timer);
                timer = window.setTimeout(function() {
                    if (smallScreen()) {
                        s.infoWindow.close();
                    }
                }, 400);
            });
        },

        addInfoWindowContent: function(addressObject, marker) {
            var infoWindowString = '',
                infoWindowAddressString = '',
                mobileLocationDetailString = '',
                mobileLocationDetailAddressString = '',
                totalLocations = addressObject.locations.length,
                modifier = totalLocations > 1 ? 'multi' : 'single';

            $.each(addressObject.addressLines, function(index, val) {
                if (val && val !== '') {
                    infoWindowAddressString +=
                        '<span class="gmap-popup-address-line">'+
                            addressObject.addressLines[index]+
                        '</span>';
                }
            });
            
            $.each(addressObject.locations, function(index, location) {
                infoWindowString +=
                '<div class="gmap-popup gmap-popup-' + modifier + '">'+
                    '<div class="gmap-popup-img" style="background-image: url('+ location.imgSrc +')"></div>'+
                    '<div class="gmap-popup-text">'+
                        '<h3 class="gmap-popup-title">'+
                            '<a class="gmap-popup-title-link" href="' + (location.detailLink || '#') + '" onclick="sendTrackingData(curLocationLink)">' + (location.name || '') + '</a>'+
                        '</h3>'+
                        '<address class="gmap-popup-address">'+
                            (infoWindowAddressString || '')+
                        '</address>'+
                        '<span class="gmap-popup-tel">Appointments: <a class="gmap-popup-tel-link" target="_blank" href="tel:'+ location.tel +'" onclick="sendTrackingData(curPhoneLink)">' + (location.telFormatted || '') + '</a></span>'+
                    '</div>'+
                '</div>';
            });
            
            $.each(addressObject.addressLines, function(index, val) {
                if (val && val !== '') {
                    mobileLocationDetailAddressString +=
                        '<span class="map-loc-address-line">'+
                            addressObject.addressLines[index]+
                        '</span>';
                }
            });

            $.each(addressObject.locations, function(index, location) {
                mobileLocationDetailString +=
                '<div class="map-loc map-loc-' + modifier + '">'+
                    '<div class="map-loc-text">'+
                        '<h3 class="map-loc-title">'+
                            '<a class="map-loc-title-link" href="' + (location.detailLink || '#') + '" onclick="sendTrackingData(curLocationLink)">' + (location.name || '') + '</a>'+
                        '</h3>'+
                        '<address class="map-loc-address">'+
                            (mobileLocationDetailAddressString || '')+
                        '</address>'+
                        '<span class="map-loc-tel">Appointments: <a class="map-loc-tel-link" target="_blank" href="tel:'+ location.tel +'" onclick="sendTrackingData(curPhoneLink)">' + (location.telFormatted || '') + '</a></span>'+
                    '</div>'+
                '</div>';
            });

            google.maps.event.addListener(marker, 'click', function() {
                s.infoWindow.close();
                s.infoWindow.setContent(infoWindowString);
                s.locationDetailsMobile.html(mobileLocationDetailString).addClass('is-active');
                curLocationLink = $(infoWindowString).find('.gmap-popup-title-link');//allow accessing infowindow element globally - Jing
                curPhoneLink = $(infoWindowString).find('.gmap-popup-tel-link');//allow accessing infowindow element globally - Jing
                if (largeScreen()) {
                    s.infoWindow.open(s.map, marker);
                } else if (smallScreen()) {
                    Gmap.scrollToLocationDetails();
                }
                //event tracking for marker clicks
                ga('send', 'event', 'gMap Marker Click', 'ACT=Click MAP_URL='+s.map.mapUrl, 'Label='+$(infoWindowString).attr('trackingLabel')+' LINK='+curLocationLink.attr('href')+' COPY='+curLocationLink.text()+' PHONE='+curPhoneLink.attr('href'));
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
                markerImgSrc = 'files/images/pin_sm_mobile.png';

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
        },
        
        scrollToLocationDetails: function() {
            $('html, body').animate({
                scrollTop: s.locationDetailsMobile.offset().top - $('nav.navbar-fixed-top').outerHeight()
            }, 1000);
        } 

    };
})(jQuery);

Gmap.init();