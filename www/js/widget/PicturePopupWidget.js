"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @param {String} jQuerySelector where to insert widget content
 * @author ch4mp@c4-soft.com
 */
mbp.PicturePopupWidget = function(app, jQuerySelector) {
    mbp.Widget.call(this, '#dot-picture-popup', jQuerySelector);// parent constructor
    var parentDisplay = this.display, selected = null;

    this.display = function() {
        parentDisplay.call(this, selected);
        
        jQuery('#picture-popup .take-picture').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            app.device.getPicture(cameraSuccess, cameraError, false);
        });
        jQuery('#picture-popup .gallery').unbind('click').click(function() {
            jQuery('#picture-popup').popup('close');
            app.device.getPicture(cameraSuccess, cameraError, true);
        });
    };
    
    this.getSelected = function() {
        return selected;
    };

    function cameraSuccess(fileUri) {
        var pic = document.getElementById('picture-popup-result');
        selected = fileUri;
        pic.src = fileUri;
        pic.style.display = 'block';
        pic.trigger('refresh');
    }

    function cameraError(message) {
        alert(message);
    }

    Object.preventExtensions(this);
};