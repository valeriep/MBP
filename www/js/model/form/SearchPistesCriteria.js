"use strict";

/**
 * 
 * @param {String} country
 * @param {String} massif
 * @param {String} resortId
 * @param {String} name
 * @param {String} color
 */
mbp.SearchPistesCriteria = function(country, massif, resortId, name, color) {
    var instance = this;
    
    /** @type String */
    this.country = country;
    
    /** @type String */
    this.massif = massif;
    
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
        if(instance.massif && instance.massif !== piste.getResort().massif) {
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
