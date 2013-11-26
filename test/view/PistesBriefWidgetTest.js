"use strict";

var testPistes = null;

module('PistesBriefWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var testResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
        testPistes = new Array();
        testPistes.push(new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg', 4, testResort));
        testPistes.push(new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', 'img/piste/testPiste2.jpg', 2.5, testResort));
        testPistes.push(new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/piste/testPiste3.jpg', undefined, testResort));
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget();
    widget.display(testPistes);
    equal(jQuery('div[data-role="content"] .piste-brief').length, 3);
});
test('widget is empty but displayed if pistes is undefined or null', function() {
    var widget = new mbp.PistesBriefWidget();
    widget.display(undefined);
    equal(jQuery('div[data-role="content"] .piste-brief').length, 0);
    equal(jQuery('div[data-role="content"] ul[data-role="listview"]').length, 1);
});