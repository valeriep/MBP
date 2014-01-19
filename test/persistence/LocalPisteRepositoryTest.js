"use strict";

var testCase;

module('LocalPisteRepository', {
    setup : function() {
        testCase = {};
        localStorage.clear();
        testCase.repo = new mbp.LocalPisteRepository();
        testCase.piste = new mbp.Piste();
        testCase.piste.id = 'testPisteId';
        testCase.piste.lastUpdate = '42';
        testCase.piste.resortId = 'testResortId';
        testCase.piste.creatorId = 'U1';
        testCase.piste.name = 'Test Piste';
        testCase.piste.description = 'Test Piste';
        testCase.piste.color = mbp.Piste.BLACK;
        testCase.piste.averageMarks.snow = 1;
        testCase.piste.averageMarks.sun = 2;
        testCase.piste.averageMarks.verticalDrop = 3;
        testCase.piste.averageMarks.length = 4;
        testCase.piste.averageMarks.view = 5;
        testCase.piste.averageMarks.access = 6;
        testCase.piste.averageMarks.pisteId = 'testPisteId';
        testCase.piste.averageMarks.lastUpdate = 51;
        testCase.piste.images = new Array('img/pistes/testPiste1.jpg', 'img/pistes/testPiste2.jpg');
        testCase.piste.marksCount = 69;
        testCase.piste.accepted = true;
        testCase.piste.userMarks = {
            'U1' : new mbp.PisteMarks(testCase.piste.averageMarks)
        };
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('createId()', function() {
    equal(testCase.repo.createId(testCase.piste), 'testResortId_Test Piste');
});
test('save() sets piste id if falsy, inserts a piste record and updates index in local storage', function() {
    testCase.piste.id = null;
    testCase.repo.savePiste(testCase.piste);
    equal(Object.keys(localStorage).length, 2);
    ok(localStorage.getItem('mbp.Piste.testResortId_Test Piste'));
    equal(localStorage.getItem('mbp.Piste.pbr'), '{"testResortId":{"testResortId_Test Piste":"42"}}');
});
test('getPisteById()', function() {
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.getPisteById('testPisteId', function(actual) {
        deepEqual(actual, testCase.piste);
    });
});
test('getPistesByResortId()', function() {
    var other = new mbp.Piste(testCase.piste), yetAnother = new mbp.Piste(testCase.piste);
    other.id = 'otherTestPisteId';
    yetAnother.id = 'yetAnotherTestPisteId';
    yetAnother.resortId = 'otherResortId';
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.savePiste(other);
    testCase.repo.savePiste(yetAnother);

    expect(2);
    testCase.repo.getPistesByResortId('testResortId', function(actual) {
        deepEqual(actual[0], testCase.piste);
        deepEqual(actual[1], other);
    });
});
test('getPistesByCreatorId()', function() {
    var other = new mbp.Piste(testCase.piste), yetAnother = new mbp.Piste(testCase.piste);
    other.id = 'otherTestPisteId';
    yetAnother.id = 'yetAnotherTestPisteId';
    yetAnother.creatorId = 'U2';
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.savePiste(other);
    testCase.repo.savePiste(yetAnother);

    expect(2);
    testCase.repo.getPistesByCreatorId('U1', function(actual) {
        deepEqual(actual[0], testCase.piste);
        deepEqual(actual[1], other);
    });
});
test('getPistesByCriteria()', function() {
    var other = new mbp.Piste(testCase.piste), yetAnother = new mbp.Piste(testCase.piste);
    other.id = 'otherTestPisteId';
    other.color = mbp.Piste.BLUE;
    yetAnother.id = 'yetAnotherTestPisteId';
    yetAnother.resortId = 'otherResortId';
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.savePiste(other);
    testCase.repo.savePiste(yetAnother);

    expect(2);
    testCase.repo.getPistesByCriteria(new mbp.PisteCriteria(new Array('testResortId', 'otherResortId'), mbp.Piste.Black), function(actual) {
        deepEqual(actual[0], testCase.piste);
        deepEqual(actual[1], other);
    });
});
test('removePiste()', function() {
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.removePiste(testCase.piste.id);
    
    equal(Object.keys(localStorage).length, 1);
    equal(localStorage.getItem('mbp.Piste.pbr'), '{"testResortId":{}}');
});
test('eachPistesToSend()', function() {
    var other = new mbp.Piste(testCase.piste), yetAnother = new mbp.Piste(testCase.piste);
    
    other.id = 'otherTestPisteId';
    other.lastUpdate = '';
    yetAnother.id = 'yetAnotherTestPisteId';
    yetAnother.lastUpdate = '';
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.savePiste(other);
    testCase.repo.savePiste(yetAnother);
    
    expect(2);
    testCase.repo.eachPistesToSend(function(actual) {
        if (actual.id == other.id) {
            deepEqual(actual, other);
        } else if (actual.id == yetAnother.id) {
            deepEqual(actual, yetAnother);
        }
    });
});
test('eachPistesMarksToSend()', function() {
    testCase.piste.userMarks['U2'] = mbp.PisteMarks.build('testPisteId', null, 1, 2, 3, 4, 5, 6);
    testCase.piste.userMarks['U3'] = mbp.PisteMarks.build('testPisteId', null, 5, 5, 4, 3, 2, 1);
    
    testCase.repo.savePiste(testCase.piste);
    
    expect(2);
    testCase.repo.eachPisteMarksToSend(function(userId, pisteMarks) {
        if (userId == 'U2') {
            deepEqual(pisteMarks, testCase.piste.userMarks['U2']);
        } else if (userId == 'U3') {
            deepEqual(pisteMarks, testCase.piste.userMarks['U3']);
        }
    });
});
test('getPistesByLastUpdate', function() {
    var other = new mbp.Piste(testCase.piste), yetAnother = new mbp.Piste(testCase.piste);
    
    other.id = 'otherTestPisteId';
    other.lastUpdate = '43';
    yetAnother.id = 'yetAnotherTestPisteId';
    yetAnother.lastUpdate = '44';
    testCase.repo.savePiste(testCase.piste);
    testCase.repo.savePiste(other);
    testCase.repo.savePiste(yetAnother);

    expect(3);
    testCase.repo.getPistesByLastUpdate(2, function(pistes) {
        equal(pistes.length, 2);
        deepEqual(pistes[0], yetAnother);
        deepEqual(pistes[1], other);
    });
});