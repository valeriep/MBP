"use strict";

var testPistes = null;

module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        testPistes = new Array();
        
        var testResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
        new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', 'img/piste/testPiste1.jpg', 4, testResort);
        new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', 'img/piste/testPiste2.jpg', 2.5, testResort);
        new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/piste/testPiste3.jpg', undefined, testResort);
        resortRepo.save(testResort);
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes serach Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow(function() {});
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #search-pistes-form').html());
});