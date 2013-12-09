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
    this.id = mbp.setStringProperty(id);

    /** @type String */
    this.login = mbp.setStringProperty(login);

    /** @type String */
    this.pwd = mbp.setStringProperty(password);
    
    /** @type String */
    this.sessionId = mbp.setStringProperty(sessionId);

    /**
     * @return {Boolean} true if user has a sessionId
     */
    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    Object.preventExtensions(this);
};