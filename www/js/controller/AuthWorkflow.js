"use strict";

/**
 * Drives the authentication use case
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @param {Function} onSuccess on success event (should expect to be provided a newly created user)
 * @author ch4mp@c4-soft.Com
 */
mbp.AuthWorkflow = function(app, onSuccess) {
    var instance = this;
    if(!app.user) {
        app.user = new mbp.User();
    }
    var userRepo = new mbp.UserRepository();
    var mbpRepo = new mbp.MyBestPistesRepository();
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
        if (username !== app.user.getLogin()) {
            app.user = new mbp.User(username, password);
        }

        //Delegate to appropriate service according to connection state
        app.services.authService.login(app.user);

        //persist user state
        userRepo.save(app.user);

        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if (app.user.isAuthenticated()) {
            mbpRepo.save(app);
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