"use strict";

var app;

module('SettingsWidget', {
    setup : function() {
        app = {
            user : new mbp.User.build('U1', 'Ch4mp'),
            device : {
                isOnline : function() {
                    return true;
                }
            }
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('logout callback is registered', function() {
    expect(1);
    var widget = new mbp.SettingsWidget(function() {
        ok(true);
    });
    widget.show();
    jQuery('.logout').click();
});
test('Home is diplayed in content div', function() {
    var widget = new mbp.SettingsWidget(function() {
    });
    widget.show();
    ok(jQuery('#content').html());
});