"use strict";

/**
 * @constructor
 * @param {Number} snow
 * @param {Number} sun
 * @param {Number} slope
 * @param {Number} length
 * @param {Number} view
 * @param {Number} average
 */
mbp.PisteMarks = function(snow, sun, slope, length, view, average) {

    /** @type Number */
    this.snow = snow;

    /** @type Number */
    this.sun = sun;

    /** @type Number */
    this.slope = slope;

    /** @type Number */
    this.length = length;

    /** @type Number */
    this.view = view;

    /** @type Number */
    this.average = average;
    
};