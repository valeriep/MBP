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

    /**
     * Picture management (camera & gallery)
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
            quality : 100,
            sourceType : isExisting ? Camera.PictureSourceType.PHOTOLIBRARY : Camera.PictureSourceType.CAMERA,
            destinationType : navigator.camera.DestinationType.FILE_URI,
            targetWidth : 75,
            targetHeight : 75,
            correctOrientation : true,
            saveToPhotoAlbum : false
        };
        navigator.camera.getPicture(onSuccess, onError, cameraOptions);
    };
};
