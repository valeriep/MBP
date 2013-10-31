"use strict";

/**
 * Remote authentication service. Used when connection is available
 * @constructor
 * @param {String} remoteServiceUrl
 * @param {Number} timeout in milliseconds
 * @author ch4mp@c4-soft.com
 */
mbp.RemoteAuthenticationService = function(remoteServiceUrl, timeout) {
    var instance = this;

    /**
     * Triggers a synchronous call to Seolan login service.
     * @param {mbp.User} user User to authenticate
     * @throw {Error} if user is not instance of {@link mbp.User} (propagated from createLoginData())
     */
    this.login = function(user) {
        $.ajax({
            type: 'POST',
            dataType: 'json',
            async: false,
            url: remoteServiceUrl + '?moid=43&function=login', 
            data: instance.createLoginData(user),
            timeout: timeout,
            success: instance.success,
            error: instance.error
        });
    };

    /**
     * @param {mbp.User} user User to authenticate
     * @return {Object} JSON data to send to Seolan login service
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
     * Sets user session id to what Seolan login service answers
     * @param {Object} data The data returned from the server
     * @param {String} http status
     */
    this.sucess = function(data, textStatus) {
        if ('object' == typeof answer && answer.SESSIONID) {
            user.sessionId = answer.SESSIONID;
        } else {
            user.sessionId = null;
        }
    };

    /**
     * Sets user session id to null
     * @param {Object} data The data returned from the server
     * @param {String} http status
     */
    this.error = function(data, textStatus) {
        user.sessionId = null;
    };

    /**
     * Deletes user session id and notifies Soelan logout service (no answer expected)
     * @param {mbp.User} user User to authenticate
     */
    this.logout = function(user) {
        if (user.sessionId) {
            user.sessionId = null;
            $.ajax({
                type: 'POST',
                dataType: 'json',
                async: true,
                url: remoteServiceUrl + '?moid=43&function=logout', 
                data: instance.createLoginData(user)
            });
        }
    };

    /**
     * @return {Object} JSON data to send to Seolan logout service
     */
    this.createLogoutData = function() {
        return {
            'username' : user.getLogin(),
            'SESSIONID' : user.sessionId
        };
    };

    Object.preventExtensions(this);
};