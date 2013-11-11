"use strict";

var testResort = null;

module('PistesBriefWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        testResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
        new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg', 4, testResort);
        new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', 'img/piste/testPiste2.jpg', 2.5, testResort);
        new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/piste/testPiste3.jpg', undefined, testResort);
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget();
    widget.display(testResort);
    equal(jQuery('div[data-role="content"] .pistBrief').length, 3);
});