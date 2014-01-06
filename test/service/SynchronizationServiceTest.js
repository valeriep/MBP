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
test('uploadPiste', function() {
    var service = new mbp.SynchronizationService(), newPiste = new mbp.Piste.build('testPiste', null, 'C1_M1_R1', 'U1');
    app.localPisteRepo.removePiste = function(pisteId) {
        equal(pisteId, 'testPiste'); //Check that piste with local ID is removed from local repo
    };
    app.seolanRepo.addPiste = function(piste, onPisteAdded) {
        onPisteAdded({
            id : 'piste:' + piste.id,
            lastUpdate : '2014-01-05 22:49:00',
        });
    };
    app.localPisteRepo.savePiste = function(piste) {
        equal(piste.id, 'piste:testPiste'); //Check that piste with remote ID is saved to local repo
        equal(piste.lastUpdate, '2014-01-05 22:49:00'); //Check that update timestamp is set to server one
    };
    
    expect(3);
    service.uploadPiste(newPiste);
});
test('uploadPisteMarks', function() {
    var service = new mbp.SynchronizationService(), newMarks = new mbp.PisteMarks.build('testPiste', null, 1, 2, 3, 4, 5, 6);
    app.seolanRepo.addMarks = function(userId, marks, onMarksAdded) {
        onMarksAdded({
            lastUpdate : '2014-01-05 22:49:00',
        });
    };
    app.localPisteRepo.getPisteById = function(pisteId, onPisteRetrieved) {
        onPisteRetrieved(mbp.Piste.build('testPiste'));
    };
    app.localPisteRepo.savePiste = function(piste) {
        equal(piste.userMarks['U1'].lastUpdate, '2014-01-05 22:49:00');
    };
    
    expect(1);
    service.uploadPisteMarks('U1', newMarks);
});
test("run() creates new resorts and pistes in local repos and updates last run timeStamp", function() {
    var service = new mbp.SynchronizationService();
    var i = null, resortId = null;
    expect(21);
    service.run();
    ok(localStorage.getItem('mbp.sync.lastUpdate'));
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