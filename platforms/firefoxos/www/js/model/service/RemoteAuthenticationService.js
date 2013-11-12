"use strict";

/**
 * Remote authentication service. Used when connection is available
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.RemoteAuthenticationService = function() {
    var instance = this;
    var seolanLogin = new mbp.SeolanService('43', 'login');
    var seolanLogout = new mbp.SeolanService('43', 'logout');

    /**
     * Triggers a synchronous call to SeolanService login service.
     * 
     * @param {mbp.User} user User to authenticate
     * @return {Boolean} whether authentication succeeded
     * @throw {Error} if user is not instance of {@link mbp.User} (propagated from createLoginData())
     */
    this.login = function(user) {
        var answer = seolanLogin.getObject(instance.createLoginData(user), 6000);
        if (answer && answer.SESSIONID) {
            user.sessionId = answer.SESSIONID;
        } else {
            user.sessionId = null;
        }
        return user.isAuthenticated();
    };

    /**
     * @param {mbp.User} user User to authenticate
     * @return {Object} JSON data to send to SeolanService login service
     * @throw {Error} if user is not instance of {@link mbp.User}
     */
    this.createLoginData = function(user) {
        if (!(user instanceof mbp.User)) {
            throw new Error('Invalid user');
        }

        return {
            'username' : user.getLogin(),
            'password' : user.pwd
        };
    };

    /**
     * Deletes user session id and notifies Soelan logout service (no answer expected)
     * 
     * @param {mbp.User} user User to authenticate
     */
    this.logout = function(user) {
        if (user.sessionId) {
            user.sessionId = null;
            seolanLogout.trigger(instance.createLoginData(user), function() {
            }, 6000);
        }
    };

    /**
     * @return {Object} JSON data to send to SeolanService logout service
     */
    this.createLogoutData = function(user) {
        return {
            'username' : user.getLogin(),
            'SESSIONID' : user.sessionId
        };
    };

    Object.preventExtensions(this);
};