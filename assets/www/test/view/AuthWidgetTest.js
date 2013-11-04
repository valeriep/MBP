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
test('createTemplateData() fills username with user login', function() {
    var user = new mbp.User('ch4mp', 'foo');
    var widget = new mbp.AuthWidget(submitCallback, user);
    var actual = widget.createTemplateData();
    equal(actual.username, 'ch4mp');
});
test('createTemplateData() sets username to undefined if user is undefined', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display();
    var actual = widget.createTemplateData();
    strictEqual(actual.username, undefined);
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display();
    equal(jQuery('div[data-role="content"] form').attr('id'), 'loginForm');
});
test('if user is undefined, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback);
    widget.display();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('if user is defined with valid login, value attribute should be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback, new mbp.User('ch4mp'));
    widget.display();
    strictEqual(jQuery('#username').attr('value'), 'ch4mp');
});
test('if user is defined with invalid login, value attribute should not be present on input with id="username"', function() {
    var widget = new mbp.AuthWidget(submitCallback, new mbp.User(''));
    widget.display();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('submit callback', function() {
    expect(2);
    var widget = new mbp.AuthWidget(submitCallback, new mbp.User(''));
    widget.display();
    $('#username').val('testUser');
    $('#password').val('testPassword');
    $('#loginForm').submit();
});