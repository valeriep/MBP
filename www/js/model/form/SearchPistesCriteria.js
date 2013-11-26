"use strict";

/**
 * 
 * @constructor
 * @param {String} country
 * @param {String} area
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 */
mbp.SearchPistesCriteria = function(country, area, resortId, name, color) {
    var instance = this;
    
    /** @type String */
    this.country = country;
    
    /** @type String */
    this.area = area;
    
    /** @type String */
    this.resortId = resortId;
    
    /** @type String */
    this.name = name;
    
    /** @type String */
    this.color = color;
    
    /**
     * 
     * @param {mbp.Piste} piste
     * @returns {Boolean}
     */
    this.matches = function(piste) {
        if(!piste) {
            throw new Error('Invalid Piste');
        }
        if(!piste.getResort()) {
            throw new Error('Invalid Resort');
        }
        if(instance.country && instance.country !== piste.getResort().country) {
            return false;
        }
        if(instance.area && instance.area !== piste.getResort().area) {
            return false;
        }
        if(instance.resortId && instance.resortId !== piste.getResort().id) {
            return false;
        }
        if(instance.color && instance.color !== piste.color) {
            return false;
        }
        if(instance.name) {
            if(!piste.name) {
                return false;
            }
            return piste.name.toLowerCase().indexOf(instance.name.toLowerCase()) != -1;
        }
        return true;
    };
    
    /**
     * 
     * @param {mbp.Resort} resort
     * @returns {Array} all matching {mbp.Piste}
     */
    this.getMatchingPistes = function(resort) {
        var pistes = new Array();
        
        resort.eachPiste(function(piste) {
            if(instance.matches(piste)) {
                pistes.push(piste);
            }
        });
        
        return pistes;
    };
};
