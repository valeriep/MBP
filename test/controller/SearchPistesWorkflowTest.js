"use strict";

var resorts = null;
var app = null;


module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        resorts = new mbp.TestCase().getResorts();
        app = {
            services : {
                resortsSyncyncService : {
                    run : function() {},
                    getPistesByCriteria : function(criteria, onPistesRetrieved) {onPistesRetrieved(new Array());}
                }
            }
        };
        var resortRepo = mbp.LocalResortRepository.getInstance();
        resortRepo.clear();
        resortRepo.saveResort(resorts[Object.keys(resorts)[0]]);
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes serach Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #search-pistes-form').html());
});
test("submit() displays pistes brief Widget as content", function() {
    var wf = new mbp.SearchPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    wf.submit(new mbp.SearchPistesCriteria());
    equal(jQuery('.pistes-brief').length, 1);
});