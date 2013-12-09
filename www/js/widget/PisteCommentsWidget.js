"use strict";

/**
 * Piste comments widget
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @author ch4mp@c4-soft.com
 */
mbp.PisteCommentsWidget = function(jQuerySelector) {
    mbp.Widget.call(this, '#dot-piste-comments', jQuerySelector);// parent constructor

    Object.preventExtensions(this);
};