"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector jQuery selector into which the map should be inserted
 * @param {Function} onInfoWindowClicked 
 * @author ch4mp@c4-soft.com
 */
mbp.MapWidget = function(hookSelector, initCenterLat, initCenterLon, onInfoWindowClicked) {
    mbp.Widget.call(this, '#dot-map', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;
    var mapOptions = {
        center : new google.maps.LatLng(initCenterLat, initCenterLon),
        zoom : 10
    };
    var markers = new Array();
    
    this.populateMarkers = function(map) {
        var i = null, laLng, marker;
        
        for(i in markers) {
            markers[i].setMap(null);
        }
        markers = new Array();

        app.localResortRepo.getAllResorts(map, function(resorts) {
            for (i in resorts) {
                laLng = new google.maps.LatLng(resorts[i].lat, resorts[i].lng);
                if(map.contains(laLng)) {
                    marker = createMarker(map, laLng, spot.id, spot.name);
                    addMarkerClickListener(map, infoWindow, marker);
                    markers.push(marker);
                }
            }
        });
    };

    this.show = function() {
        parentShow.call(instance);
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        
        instance.populateMarkers(map);
        
        google.maps.event.addListener(map, 'click', function(event) {
            infoWindow.close();
        });
        
        google.maps.event.addListener(map, 'center_changed', function() {
            mapOptions.center = map.getCenter();
            instance.populateMarkers(map);
        });
        
        google.maps.event.addListener(map, 'zoom_changed', function() {
            mapOptions.zoom = map.getZoom();
            instance.populateMarkers(map);
        });
    };
    
    function createMarker(map, latLng, id, label) {
        return new google.maps.Marker({
            position : latLng,
            map : map,
            id : id,
            label : label,
            icon : 'icon/maps-resort-orange.png',
        });
    }
    
    function addMarkerClickListener(map, infoWindow, marker) {
        google.maps.event.addListener(marker, 'click', function(event) {
            infoWindow.close();
            if(marker.id && marker.label) {
                infoWindow.setContent('<a href="#" data-id="' + marker.id + '" class="map-info-window-link">' + marker.label + '</a>');
                infoWindow.open(map, marker);
                jQuery('.map-info-window-link').click(function(event) {
                    event.preventDefault();
                    onInfoWindowClicked(this.attributes['data-id'].value);
                });
            }
        });
    }

    Object.preventExtensions(this);
};