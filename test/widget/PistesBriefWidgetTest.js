"use strict";

var testCase, resortsById;

module('PistesBriefWidget', {
    setup : function() {
        var i = null;
        testCase = new mbp.TestCase();
        resortsById = {};
        for(i in testCase.resorts) {
            resortsById[testCase.resorts[i].id] = testCase.resorts[i];
        }
        jQuery('#content').html('');
    },
    teardown : function() {
        jQuery('#content').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget('#content', function() {});
    widget.show({
        resorts : resortsById,
        pistes : testCase.pistesByResortId[testCase.resorts[0].id]
    });
    equal(jQuery('#content .piste-brief').length, 4);
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget('#content', function() {});
    widget.show({
        resorts : {},
        pistes : []
    });
    equal(jQuery('#content .piste-brief').length, 0);
});