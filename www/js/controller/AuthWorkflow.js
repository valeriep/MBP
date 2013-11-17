"use strict";

/**
 * Drives the authentication use case
 * @constructor
 * @param {mbp.MyBestPistes} mbp
 * @param {Function} onSuccess on success event (should expect to be provided a newly created user)
 * @author ch4mp@c4-soft.Com
 */
mbp.AuthWorkflow = function(mbp, onSuccess) {
    var instance = this;
    if(!mbp.user) {
        mbp.user = new mbp.User();
    }
    var userRepo = new mbp.UserRepository();

    /**
     * Captures authentication widget submit events and delegates to authentication service (local or remote depending on connection state).<br>
     * If authentication succeeds, exits on success event.<br>
     * Otherwise, loop back to 'enter'
     * @param {String} username as typed by user
     * @param {String} password as typed by user
     */
    this.submit = function(username, password) {
        //Create new user if login changes
        if (username !== mbp.user.getLogin()) {
            mbp.user = new mbp.User(username, password);
        }

        //Delegate to appropriate service according to connection state
        mbp.services.authService.login(mbp.user);

        //persist user state
        userRepo.save(mbp.user);

        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if (mbp.user.isAuthenticated()) {
            onSuccess(mbp.user);
        } else {
            instance.enter();
        }
    };

    /**
     * Triggers authentication widget display
     */
    this.enter = function() {
        var authWidget = new mbp.AuthWidget(instance.submit);
        authWidget.display(mbp.user);
    };

    Object.preventExtensions(this);
};