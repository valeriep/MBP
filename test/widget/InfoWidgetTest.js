"use strict";

module('InfoWidget', {
    setup : function() {
        jQuery('#content').html('');
    },
    teardown : function() {
        jQuery('#content').html('');
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var widget = new mbp.InfoWidget('#content');

    widget.show({
        text : 'Test info'
    });

    equal(jQuery('.info').text(), 'Test info');
});