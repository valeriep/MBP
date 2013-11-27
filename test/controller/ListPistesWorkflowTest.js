"use strict";

var testPistes = null;

module("ListPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var testResorts = new mbp.TestCase().getResorts();
        testPistes = new Array();
        testResorts[Object.keys(testResorts)[0]].eachPiste(function(piste) {
            testPistes.push(piste);
        });
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.ListPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"]').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.ListPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(undefined);
    ok(jQuery('div[data-role="content"]').html());
});