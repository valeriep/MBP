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
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('click event is bound to the function given as constructor arg, with complete Piste as argument', function() {
    var widget = new mbp.PistesBriefWidget('#content', function(piste) {
        deepEqual(piste, testCase.pistesByResortId[testCase.resorts[0].id][2]);
    });
    
    widget.show(testCase.pistesByResortId[testCase.resorts[0].id]);
    
    expect(2);
    equal(jQuery('#content .piste-brief').length, 4);
    jQuery('#content .piste-brief:eq(2)').click();
});