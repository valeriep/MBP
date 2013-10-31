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
     * @return {Boolean} whether authentication succeeded
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
            success: function(data, textStatus) {
                if ('object' == typeof data && data.SESSIONID) {
                    user.sessionId = data.SESSIONID;
                } else {
                    user.sessionId = null;
                }
            },
            error: function(data, textStatus) {
                user.sessionId = null;
            }
        });
        return user.isAuthenticated();
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
    this.createLogoutData = function(user) {
        return {
            'username' : user.getLogin(),
            'SESSIONID' : user.sessionId
        };
    };

    Object.preventExtensions(this);
};