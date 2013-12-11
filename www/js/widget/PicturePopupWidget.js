"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {Function} onSelectedChanged
 * @author ch4mp@c4-soft.com
 */
mbp.PicturePopupWidget = function(jQuerySelector, onSelectedChanged) {
    mbp.Widget.call(this, '#dot-picture-popup', jQuerySelector);// parent constructor
    var parentDisplay = this.display, selected = '';

    this.display = function() {
        parentDisplay.call(this, {user : app.user, src : selected});
        
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
        if(app.user && app.user.isAuthenticated()) {
            selected = fileUri;
            onSelectedChanged(selected);
        }
    }

    function cameraError(message) {
        alert(message);
    }

    Object.preventExtensions(this);
};