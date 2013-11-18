"use strict";

/**
 * 
 * @param {String} countryName
 * @param {String} massifName
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 */
mbp.SearchPistesCriteria = function(countryName, massifName, resortId, name, color) {
    var instance = this;
    
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
        if(instance.countryName && instance.countryName !== piste.getResort().country) {
            return false;
        }
        if(instance.massifName && instance.massifName !== piste.getResort().massif) {
            return false;
        }
        if(instance.resortId && instance.resortId !== piste.getResort().id) {
            return false;
        }
        if(instance.color && instance.color !== piste.color) {
            return false;
        }
        if(instance.name && piste.name.indexOf(instance.name) == -1) {
            return false;
        }
        return true;
    };
    
    /**
     * 
     * @param {Object} resorts a collection of {mbp.Resort}
     * @returns {Object} all matching {mbp.Piste} mapped by id
     */
    this.getMatchingPistes = function(resorts) {
        var pistes = {};
        var iResort = null, resort;
        
        for(iResort in resorts) {
            resort = resorts[iResort];
            resort.eachPiste(function(piste) {
                if(instance.matches(piste)) {
                    pistes[piste.id] = piste;
                }
            });
        }
        
        return pistes;
    };
};