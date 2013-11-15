"use strict";

mbp.Device = function() {
    /*
     * Connection management
     */
    this.isOnline = function() {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    };

    /*
     * Position management
     */
    var positionOptions = {
        maximumAge : 180000,
        timeout : 50000,
        enableHighAccuracy : true
    };

    this.refreshPosition = function(geolocationSuccess, geolocationError) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        } else if (positionError) {
            positionError({
                msg : 'Position API is not available'
            });
        }
    };
};