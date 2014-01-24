"use strict";

/**
 * Piste marks widget
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @author ch4mp@c4-soft.com
 */
mbp.PisteMarksWidget = function(jQuerySelector) {
    mbp.Widget.call(this, '#dot-mark-snippet, #dot-piste-marks', jQuerySelector);// parent constructor

    Object.preventExtensions(this);
};