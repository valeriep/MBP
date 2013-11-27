"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.Device = function() {
    /*-----------------------*/
    /* Connection management */
    /*-----------------------*/
    /**
     * returns true if Cordova API is available and device has data connection
     */
    this.isOnline = function() {
        return navigator.connection && navigator.connection.type != Connection.NONE;
    };


    /*---------------------*/
    /* Position management */
    /*---------------------*/
    var positionOptions = {
        maximumAge : 180000,
        timeout : 50000,
        enableHighAccuracy : true
    };

    /**
     * Triggers a position refresh if Cordova API is available and geolocation accessible
     * @param {Function} geolocationSuccess
     * @param {Function} geolocationError
     */
    this.refreshPosition = function(geolocationSuccess, geolocationError) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
        } else if (positionError) {
            positionError({
                msg : 'Position API is not available'
            });
        }
    };

    /*---------------------------------------*/
    /* Picture management (camera & gallery) */
    /*---------------------------------------*/
    /**
     * 
     * @param {Function} onSuccess callback expecting image {String} URI
     * @param {Function} onError callback expecting a {String} message
     * @param {Boolean} isExisting if true picture is taken from photo library (camera used otherwise)
     */
    this.getPicture = function(onSuccess, onError, isExisting) {
        if (!navigator.camera) {
            onError('Could not access camera');
            return;
        }
        var cameraOptions = {
            quality : 75,
            sourceType : isExisting ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
            destinationType : navigator.camera.DestinationType.FILE_URI,
            targetWidth : 1920,
            targetHeight : 1080,
            correctOrientation : true,
            saveToPhotoAlbum : false
        };
        navigator.camera.getPicture(onSuccess, onError, cameraOptions);
    };
};
