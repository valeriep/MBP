"use strict";

/**
 * Authentication Widget
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
 * @author Ch4mp
 *
 */
mbp.AuthWidget = function(onSubmit, user) {
    mbp.Widget.call(this, '#dot-auth');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * @returns {Object} template variable data
     */
    this.createTemplateData = function() {
        return {
            username : user ? user.getLogin() : undefined
        };
    };

    /**
     * Triggers Widget display and registers UI & form event handlers
     */
    this.display = function() {
        parentDisplay();
        $('#loginForm').submit(function() {
            onSubmit($('#username').val(), $('#password').val());
            return false; //interrupt submit chain
        });
        $('#submitButton').click(function() {
            $('#loginForm').submit();
        });
    };

    Object.preventExtensions(this);
};

mbp.AuthWidget.prototype.constructor = mbp.AuthWidget;