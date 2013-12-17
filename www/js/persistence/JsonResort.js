"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} name
 * @param {String} country
 * @param {String} area
 * @param {String} lat
 * @param {String} lon
 * @param {Array} pistes
 * @author ch4mp@c4-soft.com
 */
mbp.JsonResort = function(id, lastUpdate, name, country, area, lat, lon, pistes) {
    this.id = id;
    this.lastUpdate = lastUpdate;
    this.name = name;
    this.country = country;
    this.area = area;
    this.lat = lat;
    this.lon = lon;
    this.pistes = pistes;
};