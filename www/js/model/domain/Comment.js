"use strict";

/**
 * 
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {mbp.Piste} aPiste
 * @param {String} creatorId
 * @param {String} text
 * @param {Boolean} accepted
 * @param {String} rejectCause
 * @author ch4mp@c4-soft.com
 */
mbp.Comment = function(id, lastUpdate, aPiste, creatorId, text, accepted, rejectCause) {
    var instance = this;
    
    /** @type String */
    this.id = id;
    
    /** @type String */
    this.lastUpdate = lastUpdate;

    /** @type String */
    this.creatorId = creatorId;
    
    /** @type String */
    this.text = text;

    /** @type Boolean */
    this.accepted = accepted;

    /** @type String */
    this.rejectCause = rejectCause;
    
    /** @type mbp.Piste */
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
        if(aPiste != piste) {
            if(piste) {
                var tmp = piste;
                piste = null;
                tmp.removeComment(instance);
            }
            piste = aPiste;
            if(piste) {
                piste.addComment(instance);
            }
        }
    };

    this.clone = function(piste) {
        return new mbp.Comment(instance.id, instance.lastUpdate, piste, instance.creatorId, instance.text, instance.accepted, instance.rejectCause);
    };
    
    instance.setPiste(aPiste);
    Object.preventExtensions(this);
};