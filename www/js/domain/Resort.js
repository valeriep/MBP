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
mbp.Resort = function(id, lastUpdate, name, country, area) {
    var instance = this;
    
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

    /** Map of pistes indexed by id */
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
    
    this.setPistes = function(pistes) {
        var i = null;
        pistes = {};
        for(i in pistes) {
            instance.addPiste(pistes[i]);
        }
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
    
    this.clearPistes = function() {
        pistes = {};
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
    
    this.clone = function() {
        var clone = new mbp.Resort(instance.id, instance.lastUpdate, instance.name, instance.country, instance.area);
        instance.eachPiste(function(piste) {
            clone.addPiste(piste.clone());
        });
        return clone;
    };
    
    Object.preventExtensions(this);
};