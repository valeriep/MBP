"use strict";

var resorts = null;
var app = null;


module("SearchPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        resorts = new mbp.TestCase().getResorts();
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resorts[Object.keys(resorts)[0]]);
        app = {
            services : {
                resortsSyncService : {
                    run : function() {},
                    getPistesByCriteria : function(criteria, onPistesRetrieved) {onPistesRetrieved(new Array());}
                },
                resortRepo : resortRepo,
                localResortRepo : resortRepo,
                seolanResortRepo : resortRepo,
            }
        };
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
    equal(jQuery('ul').length, 1);
});