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
    var user = initialUser;
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
     * @param {String} login as typed by user
     * @param {String} password as typed by user
     */
    this.submit = function(login, password) {
        //Create new user if login changes
        if(username !== user.getLogin()) {
            user = new mbp.User(login, password);
        }
        
        //Delegate to appropriate service according to connection state
        if(instance.isOnline()) {
            localAuthService.login(user);
        } else {
            remoteAuthService.login(user);
        }
        
        //persist user state
        userRepo.save(user);
        
        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if(user.sessionId) {
            onSuccess(user);
        } else {
            instance.enter();
        }
    };

    /**
     * Triggers authentication widget display
     */
    this.enter = function() {
        var authWidget = new mbp.AuthWidget(instance.submit, user);
        authWidget.display();
    };

    Object.preventExtensions(this);
};