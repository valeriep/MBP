"use strict";

/**
 * Local authentication service. Used as fall-back when no connection is available
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.LocalAuthenticationService = function() {
    var userRepo = new mbp.UserRepository();

    /**
     * Always succeeds (no password check as password is not persisted locally).
     * Retrieves an existing user session id or creates a local one.
     * @param {mbp.User} user User to authenticate
     * @returns {Boolean} whether authentication succeeded (true unless username is falsy)
     * @throw {Error} if user is not instance of {@link mbp.User}
     */
    this.login = function(user) {
        if (!(user instanceof mbp.User)) {
            throw new Error('Invalid user');
        }

        if (!user.login) {
            user.sessionId = null;
            return false;
        }

        var savedUser = userRepo.get(user.login, user.pwd);
        if (savedUser && savedUser.sessionId) {
            //user was persisted with a session id, so restore it
            user.sessionId = savedUser.sessionId;
        } else {
            //user was not persisted or without session id, create a local one
            user.sessionId = 'local';
        }

        if (!user.id) {
            user.id = user.login;
        }

        return user.isAuthenticated();
    };

    /**
     * Deletes user session id
     * @param {mbp.User} user User to authenticate
     * @throw {Error} if user is not instance of {@link mbp.User}
     */
    this.logout = function(user) {
        user.sessionId = '';
        userRepo.save(user);
    };

    Object.preventExtensions(this);
};