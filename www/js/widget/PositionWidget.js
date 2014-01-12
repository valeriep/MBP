"use strict";

/**
 * Home Widget
 * @constructor
 * @param {String} hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.PositionWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-position', hookSelector);// parent constructor

    Object.preventExtensions(this);
};