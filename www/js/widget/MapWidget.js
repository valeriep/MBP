"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.MapWidget = function(hookSelector) {
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
            marker = createMarker(map, spot.lat, spot.lon, spot.name);
            addMarkerClickListener(map, infoWindow, marker);
        }
        
        google.maps.event.addListener(map, 'click', function(event) {
            infoWindow.close();
        });
    };
    
    function createMarker(map, lat, lon, title) {
        return new google.maps.Marker({
            position : new google.maps.LatLng(lat, lon),
            map : map,
            title : title,
        });
    }
    
    function addMarkerClickListener(map, infoWindow, marker) {
        google.maps.event.addListener(marker, 'click', function(event) {
            infoWindow.close();
            infoWindow.setContent(marker.title);
            infoWindow.open(map, marker);
        });
    }

    Object.preventExtensions(this);
};