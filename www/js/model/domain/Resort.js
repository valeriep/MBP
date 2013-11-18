"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} name
 * @param {String} country
 * @param {String} massif
 * @author ch4mp@c4-soft.com
 */
mbp.Resort = function(id, name, country, massif) {
    var instance = this;
    
    /**
     * @type String
     */
    this.id = id;
    
    /**
     * @type String
     */
    this.name = name;

    /**
     * @type String
     */
    this.country = country;

    /**
     * @type String
     */
    this.massif = massif;

    /**
     * Map of pistes indexed by id
     */
    var pistes = {};
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
        if(piste.getResort() != instance) {
            piste.setResort(instance);
        }
        pistes[piste.id] = piste;
    };
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.removePiste = function(piste) {
        if(piste) {
            delete pistes[piste.id];
            piste.setResort(null);
        }
    };
    
    /**
     * 
     * @return {Array}
     */
    this.getPistesIds = function() {
        var pisteId = null;
        var pistesIds = new Array();
        for(pisteId in pistes) {
            pistesIds.push(pisteId);
        }
        return pistesIds;
    };
    
    /**
     * @param {String} pisteId
     * @returns {mbp.Piste}
     */
    this.getPiste = function(pisteId) {
        return pistes[pisteId];
    };
    
    /**
     * @param {Function} func
     */
    this.eachPiste = function(func) {
        var iPiste = null, piste;

        for(iPiste in pistes) {
            piste = pistes[iPiste];
            func(piste);
        }
    };
    
    Object.preventExtensions(this);
};