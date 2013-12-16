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
        new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    };

    Object.preventExtensions(this);
};