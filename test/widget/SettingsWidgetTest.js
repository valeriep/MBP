"use strict";

var app;

module('SettingsWidget', {
    setup : function() {
        app = {
            user : new mbp.User.build('U1', 'Ch4mp', null, 'test'),
            device : {
                isOnline : function() {
                    return true;
                }
            },
            logout : function() {
                ok(true);
            },
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('logout callback is registered', function() {
    expect(1);
    var widget = new mbp.SettingsWidget('#content');
    widget.show();
    jQuery('.logout').click();
});
test('Home is diplayed in content div', function() {
    var widget = new mbp.SettingsWidget('#content');
    widget.show();
    ok(jQuery('#content').html());
});