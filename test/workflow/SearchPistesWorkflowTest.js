"use strict";

var resorts = null;

module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        resorts = new mbp.TestCase().getResorts();
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resorts[Object.keys(resorts)[0]]);
        app.resortsSyncService.run = function() {
        };
        app.resortsSyncService.getPistesByCriteria = function(criteria, onPistesRetrieved) {
            onPistesRetrieved(new Array());
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays pistes serach Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #search-pistes-form').html());
});
test("criteriaSet() displays pistes brief Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    wf.criteriaSet(new mbp.SearchPistesCriteria());
    equal(jQuery('ul').length, 1);
});