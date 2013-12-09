"use strict";

/**
 * Picture gallery widget (swipe-able miniatures and detail popup)
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @author ch4mp@c4-soft.com
 */
mbp.PictureGalleryWidget = function(jQuerySelector) {
    mbp.Widget.call(this, '#dot-picture-gallery', jQuerySelector);// parent constructor

    Object.preventExtensions(this);
};