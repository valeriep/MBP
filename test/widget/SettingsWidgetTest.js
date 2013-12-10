"use strict";

var testLogoutCallback = function() {
    ok(true);
};
var testHomeData = null;

module('SettingsWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        app.user = new mbp.User('Ch4mp');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('logout callback is registered', function() {
    expect(1);
    var widget = new mbp.SettingsWidget(testLogoutCallback);
    widget.display();
    $('.logout').click();
});
test('Home is diplayed in content div', function() {
    var widget = new mbp.SettingsWidget(testLogoutCallback);
    widget.display();
    ok(jQuery('div[data-role="content"]').html());
});