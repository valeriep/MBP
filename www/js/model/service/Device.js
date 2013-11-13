"use strict";

mbp.Device = function() {
    /*
     * Connection management
     */
    this.isConnected = function() {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    };
    
    /*
     * Position management
     */
    this.refreshPosition = function(geolocationSuccess, geolocationError) {
        if(navigator.geolocation) {
            var options = { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, options);
        } else if(positionError) {
            positionError({msg: 'Position API is not available'});
        }
    };
};
