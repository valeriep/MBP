"use strict";

var app, testCase;

module('ResortSelectionWidget', {
    setup : function() {
        testCase = {
            resorts : [ {
                id : 'testResort',
                name : 'Test Resort'
            }, {
                id : 'otherTestResort',
                name : 'Other Test Resort'
            } ],
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('widget is displayed in element specified by jQuerySelector', function() {
    var firstCall = true;
    var widget = new mbp.ResortSelectionWidget('#content', true, function(selectedResortId) {
        if(firstCall) {
            firstCall = false;
            equal(selectedResortId, '');
        } else {
            equal(selectedResortId, 'otherTestResort');
        }
    });

    expect(2);

    widget.show(testCase.resorts);

    jQuery('#content #resortId').val('otherTestResort');
    jQuery('#content #resortId').trigger('change');
});