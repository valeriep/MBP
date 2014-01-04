"use strict";

/**
 * Copy constructor
 * @constructor
 * @param {Object} comment
 * @author ch4mp@c4-soft.com
 */
mbp.Comment = function(comment) {
    /** @type String */
    this.id = comment ? mbp.setStringProperty(comment.id) : null;
    
    /** @type String */
    this.lastUpdate = comment ? mbp.setStringProperty(comment.lastUpdate) : null;

    /** @type String */
    this.creatorId = comment ? mbp.setStringProperty(comment.creatorId) : null;
    
    /** @type String */
    this.text = comment ? mbp.setStringProperty(comment.text) : null;

    /** @type Boolean */
    this.accepted = comment ? comment.accepted : false;
    
    /** @type String */
    this.pisteId = comment ? comment.pisteId : null;
    
    Object.preventExtensions(this);
};