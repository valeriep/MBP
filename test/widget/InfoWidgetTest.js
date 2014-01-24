"use strict";

module('InfoWidget', {
    setup : function() {
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var widget = new mbp.InfoWidget('#content');

    widget.show({
        text : 'Test info'
    });

    equal(jQuery('.info').text(), 'Test info');
});