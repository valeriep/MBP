"use strict";

/**
 * Home Widget
 * @constructor
 * @param {mbp.Device} device
 * @author ch4mp@c4-soft.com
 */
mbp.PositionWidget = function(device) {
    mbp.Widget.call(this, '#dot-position', '.position');// parent constructor

    Object.preventExtensions(this);
};