"use strict";

/**
 * @constructor
 * @param {String} name
 * @param {String} country
 * @param {String} massif
 * @author ch4mp@c4-soft.com
 */
mbp.Resort = function(name, country, massif) {
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
     * @type Array.mbp.Piste
     */
    var pistes = new Array();
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
        if(piste.getResort() != instance) {
            piste.setResort(instance);
            pistes.push(piste);
        }
    };
    
    /**
     * 
     * @returns {Array.mbp.Piste}
     */
    this.getPistes = function() {
        return pistes;
    };
    
    Object.preventExtensions(this);
};