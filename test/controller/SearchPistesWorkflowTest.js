"use strict";

var resorts = new mbp.TestCase().getResorts();


module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resorts[Object.keys(resorts)[0]]);
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes serach Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #search-pistes-form').html());
});
test("submit() displays pistes brief Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    wf.submit(new mbp.SearchPistesCriteria());
    ok(jQuery('div[data-role="content"] .piste-brief').html());
});