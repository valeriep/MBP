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
 * @author ch4mp@c4-soft.com
 */
mbp.PisteMarks = function(snow, sun, verticalDrop, length, view, pisteId, lastUpdate) {
    var instance = this;
    
    /** @type String */
    this.pisteId = mbp.setStringProperty(pisteId);

    /** @type String */
    this.lastUpdate = mbp.setStringProperty(lastUpdate);

    /** @type Number */
    this.snow = parseInt(snow);

    /** @type Number */
    this.sun = parseInt(sun);

    /** @type Number */
    this.verticalDrop = parseInt(verticalDrop);

    /** @type Number */
    this.length = parseInt(length);

    /** @type Number */
    this.view = parseInt(view);

    /** @type Number */
    this.getAverage = function() {
        return (sun + snow + verticalDrop + length + view) / 5;
    };

    this.clone = function() {
        return new mbp.PisteMarks(instance.snow, instance.sun, instance.verticalDrop, instance.length, instance.view, instance.pisteId, instance.lastUpdate);
    };
    
};