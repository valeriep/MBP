"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.PisteMarks = function(other) {
    var instance = this;
    
    /** @type String */
    this.pisteId = other ? other.pisteId : null;

    /** @type String */
    this.lastUpdate = other ? other.lastUpdate : null;

    /** @type Number */
    this.snow = other && other.snow ? parseInt(other.snow) : null;

    /** @type Number */
    this.sun = other && other.sun ? parseInt(other.sun) : null;

    /** @type Number */
    this.access = other && other.access ? parseInt(other.access) : null;

    /** @type Number */
    this.verticalDrop = other && other.verticalDrop ? parseInt(other.verticalDrop) : null;

    /** @type Number */
    this.length = other && other.length ? parseInt(other.length) : null;

    /** @type Number */
    this.view = other && other.view ? parseInt(other.view) : null;

    /**
     * @returns {?Number}
     */
    this.getAverage = function() {
        if(instance.sun && instance.snow && instance.verticalDrop && instance.length && instance.view && instance.access) {
            var summ = instance.sun + instance.snow + instance.verticalDrop + instance.length + instance.view + instance.access;
            return summ / 6;
        }
        return null;
    };
    
    Object.preventExtensions(this);
};

/**
 * 
 * @param {String} pisteId
 * @param {String} lastUpdate
 * @param {Number} snow
 * @param {Number} sun
 * @param {Number} verticalDrop
 * @param {Number} length
 * @param {Number} view
 * @param {Number} access
 */
mbp.PisteMarks.build = function(pisteId, lastUpdate, snow, sun, verticalDrop, length, view, access) {
    return new mbp.PisteMarks({
        pisteId : pisteId,
        lastUpdate : lastUpdate,
        snow : snow ? parseInt(snow) : null,
        sun : sun ? parseInt(sun) : null,
        verticalDrop : verticalDrop ? parseInt(verticalDrop) : null,
        length : length ? parseInt(length) : null,
        view : view ? parseInt(view) : null,
        access : access ? parseInt(access) : null,
    });
};