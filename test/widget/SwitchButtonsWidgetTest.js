"use strict";

module('SwitchButtonsWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('logout callback is registered', function() {
    var widget = new mbp.SwitchButtonsWidget('closestPistes', '#content'), mapClicked = false, listClicked = false;
    widget.addOption('map', function() {
        mapClicked = true;
    });
    widget.addOption('resortList', function() {
        listClicked = true;
    });
    
    widget.show();
    ok(mapClicked);
    ok(!listClicked);
    
    jQuery('#resortList-switch-button').click();
    ok(mapClicked);
    ok(listClicked);
});