"use strict";

var testLogoutCallback = function() {
    ok(true);
};
var testHomeData = {
        user : new mbp.User('Ch4mp'),
        device : new mbp.Device()
};

module('HomeWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('logout callback is registered', function() {
    expect(1);
    var widget = new mbp.HomeWidget(testLogoutCallback);
    widget.display(testHomeData);
    $('.logout').click();
});
test('Home is diplayed in content div', function() {
    var widget = new mbp.HomeWidget(testLogoutCallback);
    widget.display(testHomeData);
    ok(jQuery('div[data-role="content"]').html());
});