"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} text
 * @param {Number} snowMark
 * @param {Number} sunMark
 * @param {mbp.Piste} aPiste
 * @author ch4mp@c4-soft.com
 */
mbp.Comment = function(id, text, snowMark, sunMark, aPiste) {
    /**
     * @type String
     */
    this.id = id;
    
    /**
     * @type String
     */
    this.text = text;

    /**
     * @type Number
     */
    this.snowMark = snowMark;

    /**
     * @type Number
     */
    this.sunMark = sunMark;
    
    /**
     * @type mbp.Piste
     */
    var piste = null;
    
    /**
     * 
     * @return {mbp.Piste}
     */
    this.getPiste = function() {
        return piste;
    };
    
    /**
     * 
     * @param {mbp.Piste} aPiste
     */
    this.setPiste = function(aPiste) {
        piste = aPiste;
        if(piste) {
            piste.addComment(instance);
        }
    };
    
    instance.setPiste(aPiste);
    Object.preventExtensions(this);
};