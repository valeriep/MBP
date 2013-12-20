"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector jQuery selector into which the map should be inserted
 * @param {Function} onInfoWindowClicked 
 * @author ch4mp@c4-soft.com
 */
mbp.MapWidget = function(hookSelector, onInfoWindowClicked) {
    mbp.Widget.call(this, '#dot-map', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;

    this.show = function(data) {
        parentShow.call(instance, data);
        var mapOptions = {
            center : new google.maps.LatLng(data.lat, data.lon),
            zoom : 10
        };
        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var infoWindow = new google.maps.InfoWindow();
        var i = null, spot, marker;
        
        for (i in data.markers) {
            spot = data.markers[i];
            marker = createMarker(map, spot.lat, spot.lon, spot.id, spot.name);
            addMarkerClickListener(map, infoWindow, marker);
        }
        
        google.maps.event.addListener(map, 'click', function(event) {
            infoWindow.close();
        });
    };
    
    function createMarker(map, lat, lon, id, label) {
        return new google.maps.Marker({
            position : new google.maps.LatLng(lat, lon),
            map : map,
            id : id,
            label : label,
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