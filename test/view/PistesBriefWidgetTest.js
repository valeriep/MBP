"use strict";

var resorts = new mbp.TestCase().getResorts();
var resort = resorts[Object.keys(resorts)[0]];
var testPistes = new Array();
resort.eachPiste(function(piste) {
    testPistes.push(piste);
});

module('PistesBriefWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget();
    widget.display(testPistes);
    equal(jQuery('div[data-role="content"] .piste-brief').length, 4);
});
test('widget is empty but displayed if pistes is undefined or null', function() {
    var widget = new mbp.PistesBriefWidget();
    widget.display(undefined);
    equal(jQuery('div[data-role="content"] .piste-brief').length, 0);
    equal(jQuery('div[data-role="content"] ul[data-role="listview"]').length, 1);
});