"use strict";

var testCase = null;

module("ResortSynchronizationService", {
    setup : function() {
        testCase = new mbp.TestCase();
        localStorage.clear();
        app.device.isOnline = function() {
            return true;
        };
        app.localResortRepo = new mbp.LocalResortRepository();
        app.seolanResortRepo = new mbp.StubSeolanResortRepository();
        app.user = new mbp.User('U1', 'Ch4mp', null, 'tet');
        app.resortsSyncService.run();
    },
    teardown : function() {
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("run() creates new resorts in local repo", function() {
    var service = new mbp.ResortSynchronizationService();
    var resorts = testCase.getResorts(), resortId = null;
    expect(5);
    service.run();
    for (resortId in resorts) {
        app.localResortRepo.getResortById(resortId, function(resort) {
            equal(resort.id, resortId);
        });
    }
    app.localResortRepo.getAllCountries(function(countries) {
        equal(countries.length, 3);
    });
});
test("run() deletes deprecated resorts in local repo", function() {
    var service = new mbp.ResortSynchronizationService();
    expect(6);
    service.run();
    app.seolanResortRepo = new mbp.StubSeolanResortRepository();
    service.run();
    app.localResortRepo.getAllCountries(function(countries) {
        equal(countries.length, 3);
        equal(countries[0], 'Country 1');
    });
    app.localResortRepo.getAllAreas(function(areas) {
        equal(areas.length, 2);
        equal(areas[0], 'Area 1');
    });
    app.localResortRepo.getResortsNameByCountryAndArea('Country 1', 'Area 1', function(resorts) {
        equal(Object.keys(resorts).length, 1);
        equal(resorts['C1_M1_R1'], 'Resort 1');
    });
});