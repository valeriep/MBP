"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector jQuery selector into which the map should be inserted
 * @param {Function} onResortSelected 
 * @author ch4mp@c4-soft.com
 */
mbp.MapWidget = function(hookSelector, initCenterLat, initCenterLon, onResortSelected) {
    mbp.Widget.call(this, '#dot-map', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;
    var mapOptions = {
        center : new google.maps.LatLng(initCenterLat, initCenterLon),
        zoom : 10
    };
    
    this.map = null;
    this.markers = [];
    
    this.populateMarkers = function(map, infoWindow) {
        var i = null, laLng, marker;
        
        for(i in instance.markers) {
            instance.markers[i].setMap(null);
        }
        instance.markers = [];

        app.localResortRepo.getResortNamesHavingPistes(function(resorts) {
            var country = null, area = null, resortId = null;
            
            for (country in resorts) {
                for(area in resorts[country]) {
                    for(resortId in resorts[country][area]) {
                        app.localResortRepo.getResortById(resortId, function(resort) {
                            laLng = new google.maps.LatLng(resort.lat, resort.lng);
                            if(map.getBounds().contains(laLng)) {
                                marker = createMarker(map, laLng, resort.id, resort.name);
                                addMarkerClickListener(map, infoWindow, marker);
                                instance.markers.push(marker);
                            }
                        });
                    }
                }
            }
        });
    };

    this.show = function() {
        parentShow.call(instance);
        if(!instance.map) {
            instance.map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        }
        var infoWindow = new google.maps.InfoWindow();
        
        google.maps.event.addListener(instance.map, 'bounds_changed', function() {
            instance.populateMarkers(instance.map, infoWindow);
        });
        
        google.maps.event.addListener(instance.map, 'click', function(event) {
            infoWindow.close();
        });
        
        jQuery('#map-canvas').on('remove', function() {
            google.maps.event.clearInstanceListeners(instance.map);
            delete(instance.map);
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
                    onResortSelected(this.attributes['data-id'].value);
                });
            }
        });
    }
};