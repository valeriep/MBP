"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {String} hookSelector where to insert the widget
 * @param {Function} onSuccess mandatory
 * @param {Function} onFailure optional
 * @author ch4mp@c4-soft.com
 */
mbp.AuthWidget = function(hookSelector, onSuccess, onFailure) {
    mbp.Widget.call(this, '#dot-auth', hookSelector);
    var instance = this, parentShow = this.show;
    var userRepo = new mbp.LocalUserRepository();
    
    if(!app.user) {
        app.user = new mbp.User();
    }

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
     */
    this.show = function(user) {
        parentShow.call(this, user);
        jQuery('#login-form').unbind('submit').submit(function(event) {
            instance.submit(mbp.sanitize(jQuery('#username').val()), mbp.sanitize(jQuery('#password').val()));
            event.preventDefault();
            return false;
        });
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
        if (username !== app.user.login) {
            app.user = mbp.User.build(null, username, password);
        }

        //Delegate to appropriate service according to connection state
        app.authService.login(app.user);

        //persist user state
        userRepo.save(app.user);

        //Exit workflow if user.sessionId was set, loop to enter() otherwise
        if (app.user.isAuthenticated()) {
            app.save();
            instance.hide();
            onSuccess(app.user);
        } else if(onFailure) {
            onFailure(app.user);
        } else {
            instance.show();
        }
    };

    Object.preventExtensions(this);
};