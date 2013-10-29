"use strict";

/**
 * 
 * 
 * @Author ch4mp@c4-soft.com
 */

slopes.SeolanUser = function(login, password) {
    this.pwd = password;
    this.sessionId = undefined;

    this.isAuthenticated = function() {
        return this.sessionId ? true : false;
    };

    this.getLogin = function() {
        return login;
    };

    Object.preventExtensions(this);
};