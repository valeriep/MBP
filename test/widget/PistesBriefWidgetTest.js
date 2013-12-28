"use strict";

var resorts = new mbp.TestCase().getResorts();
var resort = resorts[Object.keys(resorts)[0]];
var testPistes = new Array();
resort.eachPiste(function(piste) {
    testPistes.push(piste);
});

module('PistesBriefWidget', {
    setup : function() {
        jQuery('#content').html('');
    },
    teardown : function() {
        jQuery('#content').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget('#content', function() {});
    widget.show(testPistes);
    equal(jQuery('#content .piste-brief').length, 4);
});
test('widget is empty but displayed if pistes is undefined or null', function() {
    var widget = new mbp.PistesBriefWidget('#content', function() {});
    widget.show(undefined);
    equal(jQuery('#content .piste-brief').length, 0);
    equal(jQuery('#content ul[data-role="listview"]').length, 1);
});