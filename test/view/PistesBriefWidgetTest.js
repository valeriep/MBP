"use strict";

var pistes = null;

module('PistesBriefWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        pistes = new Array();
        pistes.push(new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg'));
        pistes.push(new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', 'img/piste/testPiste2.jpg'));
        pistes.push(new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/piste/testPiste3.jpg'));
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test('createTemplateData() fills username with user login', function() {
    var widget = new mbp.PistesBriefWidget(pistes);
    var actual = widget.createTemplateData();
    equal(actual.pistes.length, 3);
});
test('widget is displayed in div with data-role="content"', function() {
    var widget = new mbp.PistesBriefWidget(pistes);
    widget.display();
    equal(jQuery('div[data-role="content"] .pistBrief').length, 3);
});