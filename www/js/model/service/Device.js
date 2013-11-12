"use strict";

mbp.Device = function() {
    this.isConnected = function() {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    };
    
    this.getPosition = function(onS) {
        
    };
};
