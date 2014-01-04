"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.User = function(other) {
    /** @type String */
    this.id = other ? mbp.setStringProperty(other.id) : null;

    /** @type String */
    this.login = other ? mbp.setStringProperty(other.login) : null;

    /** @type String */
    this.pwd = other ? mbp.setStringProperty(other.pwd) : null;
    
    /** @type String */
    this.sessionId = other ? mbp.setStringProperty(other.sessionId) : null;

    /**
     * @return {Boolean} true if user has a sessionId
     */
    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    Object.preventExtensions(this);
};