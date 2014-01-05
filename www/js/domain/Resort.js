"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.Resort = function(other) {
    /** @type String */
    this.id = other ? other.id : null;
    
    /** @type String */
    this.lastUpdate = other ? other.lastUpdate : null;
    
    /** @type String */
    this.name = other ? other.name : null;

    /** @type String */
    this.country = other ? other.country : null;

    /** @type String */
    this.area = other ? other.area : null;

    /** @type Number */
    this.lat = other ? other.lat : null;

    /** @type Number */
    this.lng = other ? other.lng : null;
    
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

mbp.Resort.build = function(id, lastUpdate, name, country, area, lat, lng) {
    return new mbp.Resort({
        id : id,
        lastUpdate : lastUpdate,
        name : name,
        country : country,
        area : area,
        lat : lat,
        lng : lng,
    });
};