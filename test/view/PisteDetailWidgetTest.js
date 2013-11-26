"use strict";

var resorts = new mbp.TestCase().getResorts();
var resort = resorts[Object.keys(resorts)[0]];
var piste1 = resort.getPiste(resort.getPistesIds()[0]);

module('PisteDetailWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PisteDetailWidget();
    widget.display(piste1);
    equal(jQuery('div[data-role="content"] .comment-text').length, 4);
});