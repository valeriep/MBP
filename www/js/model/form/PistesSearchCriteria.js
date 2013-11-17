"use strict";

/**
 * 
 * @param {String} countryName
 * @param {String} massifName
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 */
mbp.PistesSearchCriteria = function(countryName, massifName, resortId, name, color) {
    /** @type String */
    this.countryName = countryName;
    
    /** @type String */
    this.massifName = massifName;
    
    /** @type String */
    this.resortId = resortId;
    
    /** @type String */
    this.name = name;
    
    /** @type String */
    this.color = color;
};