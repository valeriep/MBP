"use strict";

/**
 * Copy constructor
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.Comment = function(other) {
    /** @type String */
    this.id = other ? mbp.setStringProperty(other.id) : null;
    
    /** @type String */
    this.lastUpdate = other ? mbp.setStringProperty(other.lastUpdate) : null;

    /** @type String */
    this.creatorId = other ? mbp.setStringProperty(other.creatorId) : null;
    
    /** @type String */
    this.text = other ? mbp.setStringProperty(other.text) : null;

    /** @type Boolean */
    this.accepted = other ? other.accepted : null;
    
    /** @type String */
    this.pisteId = other ? other.pisteId : null;
    
    Object.preventExtensions(this);
};