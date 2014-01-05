"use strict";

var testCase;

module("SynchronizationService", {
    setup : function() {
        testCase = new mbp.TestCase();
        localStorage.clear();
        app = new mbp.MyBestPistes();
        app.device.isOnline = function() {
            return true;
        };
        app.localResortRepo = new mbp.LocalResortRepository();
        app.seolanRepo = new mbp.StubSeolanRepository();
        app.user = new mbp.User();
        app.user.id = 'U1';
        app.user.login = 'Ch4mp';
        app.user.sessionId = 'test';
    },
    teardown : function() {
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("run() creates new resorts and pistes in local repos", function() {
    var service = new mbp.SynchronizationService();
    var i = null, resortId = null;
    expect(20);
    service.run();
    for (i in testCase.resorts) {
        app.localResortRepo.getResortById(testCase.resorts[i].id, function(resort) {
            deepEqual(resort, testCase.resorts[i]);
        });
    }
    for (resortId in testCase.pistesByResortId) {
        for (i in testCase.pistesByResortId[resortId]) {
            app.localPisteRepo.getPisteById(testCase.pistesByResortId[resortId][i].id, function(piste) {
                deepEqual(piste, testCase.pistesByResortId[resortId][i]);
            });
        }
    }
});