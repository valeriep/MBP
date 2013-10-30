"use strict";

mbp.AuthWidget = function(submitCallback, user) {
    mbp.Widget.call(this, '#dot-auth');
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

mbp.AuthWidget.prototype.constructor = mbp.AuthWidget;