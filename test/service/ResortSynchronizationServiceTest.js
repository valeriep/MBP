"use strict";

/** @type mbp.MyBestPistes */
var app = null;

var testCase = null;
var localResortRepo = null;

module("ResortSynchronizationService", {
    setup : function() {
        localResortRepo = new mbp.LocalResortRepository();
        localResortRepo.clear();
        testCase = new mbp.TestCase();
        app = {
            device : {
                isOnline : function() {
                    return true;
                }
            },
            services : {
                resortRepo : localResortRepo,
                localResortRepo : localResortRepo,
                seolanResortRepo : new mbp.StubSeolanResortRepository(),
            },
            user : new mbp.User('U1', 'Ch4mp', null, 'tet')
        };
    },
    teardown : function() {
    }
});
test("run() creates new resorts in local repo", function() {
    var service = new mbp.ResortSynchronizationService(app);
    var resorts = testCase.getResorts(), resortId = null;
    expect(5);
    service.run();
    for (resortId in resorts) {
        localResortRepo.getResortById(resortId, function(resort) {
            equal(resort.id, resortId);
        });
    }
    localResortRepo.getAllCountries(function(countries) {
        equal(countries.length, 3);
    });
});
test("run() deletes deprecated resorts in local repo", function() {
    var service = new mbp.ResortSynchronizationService(app);
    expect(6);
    service.run();
    app.services.seolanResortRepo = {
        getRessortSummaries : function(func) {
            func(new mbp.ResortSummaries(new Array(new mbp.ResortSummary('testResort', '2600', 'Test Resort', 'Test Country', 'Test Area'))));
        }
    };
    service.run();
    localResortRepo.getAllCountries(function(countries) {
        equal(countries.length, 1);
        equal(countries[0], 'Test Country');
    });
    localResortRepo.getAllAreas(function(areas) {
        equal(areas.length, 1);
        equal(areas[0], 'Test Area');
    });
    localResortRepo.getResortsNameByCountryAndArea('Test Country', 'Test Area', function(resorts) {
        equal(Object.keys(resorts).length, 1);
        equal(resorts['testResort'], 'Test Resort');
    });
});