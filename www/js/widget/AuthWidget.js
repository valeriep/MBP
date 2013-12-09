"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @author ch4mp@c4-soft.com
 */
mbp.AuthWidget = function(onSubmit) {
    mbp.Widget.call(this, '#dot-auth');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
     */
    this.display = function(user) {
        parentDisplay.call(this, user);
        jQuery('#login-form').unbind('submit').submit(function(event) {
            onSubmit(mbp.sanitize(jQuery('#username').val()), mbp.sanitize(jQuery('#password').val()));
            event.preventDefault();
            return false;
        });
    };

    Object.preventExtensions(this);
};