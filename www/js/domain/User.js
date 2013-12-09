"use strict";

/**
 * @constructor
 * @param {String} id
 * @param {String} login
 * @param {String} password
 * @param {String} sessionId
 * @author ch4mp@c4-soft.com
 */
mbp.User = function(id, login, password, sessionId) {
    /** @type String */
    this.id = id;

    /** @type String */
    this.login = login;

    /** @type String */
    this.pwd = password;
    
    /** @type String */
    this.sessionId = sessionId ? sessionId : null;

    /**
     * @return {Boolean} true if user has a sessionId
     */
    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    Object.preventExtensions(this);
};