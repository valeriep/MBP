"use strict";

var submitCallback = function(response) {
    ok(response);
    return false;//prevent submit event from being propagated
};

module('AuthWidget', {
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('createTemplateData fills username with user login', function() {
    var user = new slopes.SeolanUser('ch4mp', 'foo');
    var widget = new slopes.AuthWidget(submitCallback, user);
    var actual = widget.createTemplateData();
    equal(actual.username, 'ch4mp');
});
test('createTemplateData sets username to undefined if user is undefined', function() {
    var widget = new slopes.AuthWidget(submitCallback);
    widget.display();
    var actual = widget.createTemplateData();
    strictEqual(actual.username, undefined);
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new slopes.AuthWidget(submitCallback);
    widget.display();
    equal(jQuery('div[data-role="content"] form').attr('id'), 'loginForm');
});
test('if user is undefined, value attribute should not be present on input with id="username"', function() {
    var widget = new slopes.AuthWidget(submitCallback);
    widget.display();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('if user is defined with valid login, value attribute should be present on input with id="username"', function() {
    var widget = new slopes.AuthWidget(submitCallback, new slopes.SeolanUser('ch4mp'));
    widget.display();
    strictEqual(jQuery('#username').attr('value'), 'ch4mp');
});
test('if user is defined with invalid login, value attribute should not be present on input with id="username"', function() {
    var widget = new slopes.AuthWidget(submitCallback, new slopes.SeolanUser(''));
    widget.display();
    strictEqual(jQuery('#username').attr('value'), undefined);
});
test('submit callback', function() {
    expect(1);
    var widget = new slopes.AuthWidget(submitCallback, new slopes.SeolanUser(''));
    widget.display();
    $('#loginForm').submit();
});