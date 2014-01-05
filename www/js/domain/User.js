"use strict";

/**
 * @constructor
 * @param {Object} other
 * @author ch4mp@c4-soft.com
 */
mbp.User = function(other) {
    /** @type String */
    this.id = other ? other.id : null;

    /** @type String */
    this.login = other ? other.login : null;

    /** @type String */
    this.pwd = other ? other.pwd : null;
    
    /** @type String */
    this.sessionId = other ? other.sessionId : null;

    /**
     * @return {Boolean} true if user has a sessionId
     */
    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    Object.preventExtensions(this);
};