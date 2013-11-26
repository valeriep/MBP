"use strict";

/**
 * @constructor
 * @param {Number} snow
 * @param {Number} sun
 * @param {Number} verticalDrop
 * @param {Number} length
 * @param {Number} view
 * @param {String} pisteId
 * @param {String} lastUpdate
 */
mbp.PisteMarks = function(snow, sun, verticalDrop, length, view, pisteId, lastUpdate) {
    /** @type String */
    this.pisteId = pisteId;

    /** @type String */
    this.lastUpdate = lastUpdate;

    /** @type Number */
    this.snow = snow;

    /** @type Number */
    this.sun = sun;

    /** @type Number */
    this.verticalDrop = verticalDrop;

    /** @type Number */
    this.length = length;

    /** @type Number */
    this.view = view;

    /** @type Number */
    this.getAverage = function() {
        return (sun + snow + verticalDrop + length + view) / 5;
    };
    
};