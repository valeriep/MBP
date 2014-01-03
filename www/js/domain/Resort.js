"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.Resort = function(other) {
    /** @type String */
    this.id = other ? mbp.setStringProperty(other.id) : null;
    
    /** @type String */
    this.lastUpdate = other ? mbp.setStringProperty(other.lastUpdate) : null;
    
    /** @type String */
    this.name = other ? mbp.setStringProperty(other.name) : null;

    /** @type String */
    this.country = other ? mbp.setStringProperty(other.country) : null;

    /** @type String */
    this.area = other ? mbp.setStringProperty(other.area) : null;

    /** @type String */
    this.lat = other ? mbp.setStringProperty(other.lat) : null;

    /** @type String */
    this.lng = other ? mbp.setStringProperty(other.lng) : null;
    
    Object.preventExtensions(this);
};

mbp.Resort.compareNames = function(a, b) {
    if(!a || !a.name) {
        if(!b || !b.name) {
            return 0;
        }
        return -1;
    }
    if(!b || !b.name) {
        return 1;
    }
    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
};