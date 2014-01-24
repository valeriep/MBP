"use strict";

module('PositionWidget', {
    setup : function() {
        jQuery('#content').html('<div class="position"></div>');
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('show()', function() {
    var widget = new mbp.PositionWidget('#content');
    widget.show({
        lat: 6.222714118155557,
        lng: 44.097544578645575,
    });
    equal(jQuery('#content').text(), 'Last known position is lat: 6.223, lng: 44.098');
});