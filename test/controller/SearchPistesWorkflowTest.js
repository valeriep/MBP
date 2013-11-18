"use strict";

var testPistes = null;

module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var testResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
        testPistes = new Array();
        testPistes.push(new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg', 4, testResort));
        testPistes.push(new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', 'img/piste/testPiste2.jpg', 2.5, testResort));
        testPistes.push(new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/piste/testPiste3.jpg', undefined, testResort));
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes serach Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow(function() {});
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"] #search-pistes-form').html());
});