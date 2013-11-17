"use strict";

var submitCallback = function(username, password) {
    equal(username, 'testUser');
    equal(password, 'testPassword');
    return false;// prevent submit event from being propagated
};

module('AuthWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display();
    equal(jQuery('div[data-role="content"] form').attr('id'), 'login-form');
});
test('if user is undefined, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('if user is defined with valid login, value attribute should be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display(new mbp.User('ch4mp'));
    strictEqual(jQuery('#username').attr('value'), 'ch4mp');
});
test('if user is defined with invalid login, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display(new mbp.User(''));
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('submit callback', function() {
    expect(2);
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display(new mbp.User(''));
    $('#username').val('testUser');
    $('#password').val('testPassword');
    $('#login-form').submit();
});