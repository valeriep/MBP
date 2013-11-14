"use strict";

/**
 * Home Widget
 * 
 * @constructor
 * @param {mbp.Device} device
 * @author Ch4mp
 * 
 */
mbp.PositionWidget = function(device) {
    mbp.Widget.call(this, '#dot-position', '.position');// parent constructor

    Object.preventExtensions(this);
};