"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} lastUpdate
 * @param {Object} commentsUpdates a map of last update by comment id
 * @author ch4mp@c4-soft.com
 */
mbp.PisteSummary = function(id, lastUpdate, commentsUpdates) {
    /** @type String */
    this.id = mbp.setStringProperty(id);
    
    /** @type String */
    this.lastUpdate = mbp.setStringProperty(lastUpdate);
    
    /** @type String */
    this.commentsUpdates = commentsUpdates;
    
    Object.preventExtensions(this);
};