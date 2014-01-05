"use strict";

/**
 * Copy constructor
 * @constructor
 * @param {Object} comment
 * @author ch4mp@c4-soft.com
 */
mbp.Comment = function(comment) {
    /** @type String */
    this.id = comment ? comment.id : null;
    
    /** @type String */
    this.lastUpdate = comment ? comment.lastUpdate : null;

    /** @type String */
    this.creatorId = comment ? comment.creatorId : null;
    
    /** @type String */
    this.text = comment ? comment.text : null;

    /** @type Boolean */
    this.accepted = comment ? comment.accepted : false;
    
    /** @type String */
    this.pisteId = comment ? comment.pisteId : null;
    
    Object.preventExtensions(this);
};

/**
 * 
 * @param {String} id
 * @param {String} lastUpdate
 * @param {String} pisteId
 * @param {String} creatorId
 * @param {String} text
 * @param {Boolean} accepted
 */
mbp.Comment.build = function(id, lastUpdate, pisteId, creatorId, text, accepted) {
    return new mbp.Comment({
        id : id,
        lastUpdate : lastUpdate,
        pisteId : pisteId,
        creatorId : creatorId,
        text : text,
        accepted : accepted,
    });
};