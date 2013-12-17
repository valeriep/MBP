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
        var i = null, marker;
        for (i in data.markers) {
            marker = data.markers[i];
            new google.maps.Marker({
                position : new google.maps.LatLng(marker.lat, marker.lon),
                map : map,
                title : marker.name,
            });
        }
    };

    Object.preventExtensions(this);
};