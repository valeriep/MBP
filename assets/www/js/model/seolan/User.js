"use strict";

/**
 * @constructor
 * @param {String} login
 * @param {String} password
 * @author ch4mp@c4-soft.com
 */
mbp.User = function(login, password) {
    /**
     * @type String
     */
    this.pwd = password;
    /**
     * @type String
     */
    this.sessionId = undefined;

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