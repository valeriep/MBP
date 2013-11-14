"use strict";

/**
 * @constructor
 * @param {String} login
 * @param {String} password
 * @param {String} sessionId
 * @author ch4mp@c4-soft.com
 */
mbp.User = function(login, password, sessionId) {
    /**
     * @type String
     */
    this.pwd = password ? password : null;
    
    /**
     * @type String
     */
    this.sessionId = sessionId ? sessionId : null;

    /**
     * @return {Boolean} true if user has a sessionId
     */
    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    /**
     * @return {String} user name
     */
    this.getLogin = function() {
        return login;
    };

    Object.preventExtensions(this);
};