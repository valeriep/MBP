"use strict";

/**
 * Drives the authentication use case
 * @constructor
 * @param {mbp.LocalAuthenticationService} localAuthService
 * @param {mbp.RemoteAuthenticationService} remoteAuthService
 * @param {mbp.User} initialUser user to authenticate
 * @param {Function} onSuccess on success event (should expect to be provided a newly created user)
 * @author ch4mp@c4-soft.Com
 */
mbp.AuthWorkflow = function(localAuthService, remoteAuthService, initialUser, onSuccess) {
    var instance = this;
    var user = initialUser ? initialUser : new mbp.User();
    var userRepo = new mbp.UserRepository();

    /**
     * @return {Boolean} true if device has data connection
     */
    this.isOnline = function() {
        //FIXME implement
        return false;
    };

    /**
     * Captures authentication widget submit events and delegates to authentication service (local or remote depending on connection state).<br>
     * If authentication succeeds, exits on success event.<br>
     * Otherwise, loop back to 'enter'
     * @param {String} username as typed by user
     * @param {String} password as typed by user
     */
    this.submit = function(username, password) {
        //Create new user if login changes
        if (username !== user.getLogin()) {
            user = new mbp.User(username, password);
        }

        //Delegate to appropriate service according to connection state
        if (instance.isOnline()) {
            remoteAuthService.login(user);
        } else {
            localAuthService.login(user);
        }

        //persist user state
        userRepo.save(user);

        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if (user.isAuthenticated()) {
            onSuccess(user);
        } else {
            instance.enter();
        }
    };

    /**
     * Triggers authentication widget display
     */
    this.enter = function() {
        var authWidget = new mbp.AuthWidget(instance.submit);
        authWidget.display(user);
    };

    Object.preventExtensions(this);
};