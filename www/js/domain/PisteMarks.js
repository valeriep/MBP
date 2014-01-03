"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.PisteMarks = function(other) {
    var instance = this;
    
    /** @type String */
    this.pisteId = other ? mbp.setStringProperty(other.pisteId) : null;

    /** @type String */
    this.lastUpdate = other ? mbp.setStringProperty(other.lastUpdate) : null;

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
            return (instance.sun + instance.snow + instance.verticalDrop + instance.length + instance.view + instance.access) / 6;
        }
        return null;
    };
    
    Object.preventExtensions(this);
};