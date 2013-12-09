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
    this.id = mbp.setStringProperty(id);
    
    /** @type String */
    this.lastUpdate = mbp.setStringProperty(lastUpdate);
    
    /** @type String */
    this.name = mbp.setStringProperty(name);

    /** @type String */
    this.country = mbp.setStringProperty(country);

    /** @type String */
    this.area = mbp.setStringProperty(area);
    
    Object.preventExtensions(this);
};