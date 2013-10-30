"use strict";

/**
 * 
 * @Author ch4mp@c4-soft.com
 */
mbp.AuthenticationService = function(remoteServiceUri, user) {
    var authService = this;
    if (!(user instanceof mbp.SeolanUser)) {
        throw new Error('Invalid user');
    }

    this.login = function() {
        $.post(remoteServiceUri + '?moid=43&function=login', authService.createLoginData(), authService.loginCallback,
                'json');
    };

    this.createLoginData = function() {
        return {
            'username' : user.getLogin(),
            'password' : user.pwd
        };
    };

    this.loginCallback = function(answer) {
        if (!('object' == typeof answer)) {
            return;
        }
        user.sessionId = answer.SESSIONID;
        if (!user.sessionId) {
            user.pwd = undefined;
        }
    };

    this.logout = function() {
        if (user.sessionId) {
            user.sessionId = undefined;
            $.post(remoteServiceUri + '?moid=43&function=logout', authService.createLogoutData(),
                    authService.logoutCallback, 'json');
        }
    };

    this.createLogoutData = function() {
        return {
            'username' : user.getLogin(),
            'SESSIONID' : user.sessionId
        };
    };

    this.logoutCallback = function() {
    };

    Object.preventExtensions(this);
};