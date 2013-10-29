"use strict";

slopes.AuthWidget = function(submitCallback, user) {
    slopes.Widget.call(this, '#dot-auth');
    var instance = this;

    this.createTemplateData = function() {
        return {
            username : user ? user.getLogin() : undefined
        };
    };

    this.parentDisplay = this.display;

    this.display = function() {
        instance.parentDisplay();
        $('#loginForm').submit(function() {
            submitCallback($('#username').val(), $('#password').val());
            return false;
        });
        $('#submitButton').click(function() {
            $('#loginForm').submit();
        });
    };

    Object.preventExtensions(this);
};

slopes.AuthWidget.prototype.constructor = slopes.AuthWidget;