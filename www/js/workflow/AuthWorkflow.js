"use strict";

/**
 * Drives the authentication use case
 * @constructor
 * @param {Function} onSuccess on success event (should expect to be provided a newly created user)
 * @author ch4mp@c4-soft.com
 */
mbp.AuthWorkflow = function(onSuccess) {
    var instance = this;
    if(!app.user) {
        app.user = new mbp.User();
    }
    var userRepo = new mbp.UserRepository();
    var authWidget = null;

    /**
     * Captures authentication widget submit events and delegates to authentication service (local or remote depending on connection state).<br>
     * If authentication succeeds, exits on success event.<br>
     * Otherwise, loop back to 'enter'
     * @param {String} username as typed by user
     * @param {String} password as typed by user
     */
    this.submit = function(username, password) {
        //Create new user if login changes
        if (username !== app.user.login) {
            app.user = new mbp.User(null, username, password);
        }

        //Delegate to appropriate service according to connection state
        app.authService.login(app.user);

        //persist user state
        userRepo.save(app.user);

        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if (app.user.isAuthenticated()) {
            app.save();
            onSuccess(app.user);
        } else {
            instance.activate();
        }
    };

    /**
     * Triggers authentication widget display
     */
    this.activate = function() {
        if(!authWidget) {
            authWidget = new mbp.AuthWidget(instance.submit);
        }
        authWidget.display(app.user);
    };

    Object.preventExtensions(this);
};