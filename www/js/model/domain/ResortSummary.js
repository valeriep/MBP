"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} name
 * @param {String} country
 * @param {String} area
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSummary = function(id, lastUpdate, name, country, area) {
    /** @type String */
    this.id = id;
    
    /** @type String */
    this.lastUpdate = lastUpdate;
    
    /** @type String */
    this.name = name;

    /** @type String */
    this.country = country;

    /** @type String */
    this.area = area;
    
    Object.preventExtensions(this);
};