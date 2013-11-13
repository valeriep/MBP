"use strict";

module('PositionWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('<div class="position"></div>');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('display()', function() {
    var widget = new mbp.PositionWidget();
    widget.display({
        latitude: 6.222714118155557,
        longitude: 44.097544578645575,
        altitude: 610,
        accuracy: 400,
        heading: undefined,
        velocity: undefined,
        altitudeAccuracy: 800
    });
    ok(jQuery('.position').html());
});