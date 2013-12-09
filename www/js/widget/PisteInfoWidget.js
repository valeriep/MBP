"use strict";

/**
 * Piste info (resort, name, color, ...) Widget
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @author ch4mp@c4-soft.com
 */
mbp.PisteInfoWidget = function(jQuerySelector) {
    mbp.Widget.call(this, '#dot-piste-info', jQuerySelector);// parent constructor

    Object.preventExtensions(this);
};