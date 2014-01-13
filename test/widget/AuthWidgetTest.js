"use strict";

var app;

module('AuthWidget', {
    setup : function() {
        app = {
            user : null,
            authService : {
                login : function(user) {
                    user.id = user.login;
                    user.sessionId = 'test';
                    return true;
                },
            },
            save : function() {},
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('if user is undefined, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget('#content');
    widget.show();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('if user is defined with valid login, value attribute should be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget('#content');
    widget.show(new mbp.User.build('U1', 'ch4mp'));
    strictEqual(jQuery('#username').attr('value'), 'ch4mp');
});
test('if user is defined with invalid login, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget('#content');
    widget.show(new mbp.User.build(''));
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('sucess callback', function() {
    expect(4);
    var widget = new mbp.AuthWidget('#content', function(user) {
        equal(user.id, 'testUser');
        equal(user.login, 'testUser');
        equal(user.pwd, 'testPassword');
        equal(user.sessionId, 'test');
    });
    widget.show(new mbp.User());
    jQuery('#username').val('testUser');
    jQuery('#password').val('testPassword');
    jQuery('#login-form').submit();
});