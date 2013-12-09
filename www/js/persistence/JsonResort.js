"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} name
 * @param {String} country
 * @param {String} area
 * @param {Array} pistes
 * @author ch4mp@c4-soft.com
 */
mbp.JsonResort = function(id, lastUpdate, name, country, area, pistes) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.name = name;
    this.country = country;
    this.area = area;
    this.pistes = pistes;
};