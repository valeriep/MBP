"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 * 
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
        $('#login-form').submit(function() {
            onSubmit($('#username').val(), $('#password').val());
            return false; // interrupt submit chain
        });
        $('#login-form .submit').click(function() {
            $('#login-form').submit();
        });
    };

    Object.preventExtensions(this);
};