"use strict";

var resorts = null;

module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('#content').html('');
        jQuery('#left-panel').html('');
        app = new mbp.MyBestPistes();
    },
    teardown : function() {
        jQuery('#content').html('');
        jQuery('#left-panel').html('');
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays pistes serach Widget in left panel", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('#content .piste-brief').html());
    wf.activate();
    ok(jQuery('#content .piste-brief').html());
    ok(jQuery('#left-panel #search-pistes-form').html());
});
test("criteriaSet() displays pistes brief Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow();
    ok(!jQuery('#content').html());
    wf.activate();
    wf.criteriaSet(new mbp.SearchPistesCriteria());
    equal(jQuery('ul').length, 1);
});