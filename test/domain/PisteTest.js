"use strict";

var testCase;

module("Piste", {
	setup : function() {
		testCase = {};
		
		testCase.avgMarks = new mbp.PisteMarks();
        testCase.avgMarks.snow = 1;
        testCase.avgMarks.sun = 2;
        testCase.avgMarks.verticalDrop = 3;
        testCase.avgMarks.length = 4;
        testCase.avgMarks.view = 5;
        testCase.avgMarks.access = 6;
        testCase.avgMarks.pisteId = 'testPisteId';
        testCase.avgMarks.lastUpdate = '42';
        
        testCase.piste = new mbp.Piste();
        testCase.piste.id = 'testPisteId';
        testCase.piste.lastUpdate = '24';
        testCase.piste.resortId = 'testResortId';
        testCase.piste.creatorId = 'U1';
        testCase.piste.name = 'Test Piste';
        testCase.piste.color = mbp.Piste.BLACK;
        testCase.piste.description = 'A piste just for unit testing purposes';
        testCase.piste.accepted = true;
        testCase.piste.images = new Array('img/pistes/testPiste1.jpg', 'img/pistes/testPiste2.jpg');
        testCase.piste.averageMarks = new mbp.PisteMarks(testCase.avgMarks);
        testCase.piste.userMarks['U1'] = new mbp.PisteMarks(testCase.avgMarks);
        testCase.piste.marksCount = 51;
    },
    teardown : function() {
    }
});
test('constructor with no argument', function() {
    var actual = new mbp.Piste();
    
    strictEqual(actual.id, null);
    strictEqual(actual.lastUpdate, null);
    strictEqual(actual.resortId, null);
    strictEqual(actual.name, null);
    strictEqual(actual.color, null);
    strictEqual(actual.description, null);
    strictEqual(actual.accepted, false);
    equal(actual.images.length, 0);
    ok(actual.averageMarks);
    ok(actual.userMarks);
    equal(actual.marksCount, 0);
});
test('constructor copies all fields', function() {
    var actual = new mbp.Piste(testCase.piste);
    
    equal(actual.id, 'testPisteId');
    equal(actual.lastUpdate, '24');
    equal(actual.resortId, 'testResortId');
    equal(actual.name, 'Test Piste');
    equal(actual.color, mbp.Piste.BLACK);
    equal(actual.description, 'A piste just for unit testing purposes');
    equal(actual.accepted, true);
    equal(actual.images.length, 2);
    equal(actual.images[0], 'img/pistes/testPiste1.jpg');
    equal(actual.images[1], 'img/pistes/testPiste2.jpg');
    deepEqual(actual.averageMarks, testCase.avgMarks);
    deepEqual(actual.userMarks['U1'], testCase.avgMarks);
    equal(actual.marksCount, 51);
});
test('copy and original objects are independent', function() {
    var actual = new mbp.Piste(testCase.piste);
    
    testCase.piste.id = 'other';
    testCase.piste.lastUpdate = 'other';
    testCase.piste.resortId = 'other';
    testCase.piste.creatorId = 'other';
    testCase.piste.name = 'other';
    testCase.piste.color = mbp.Piste.RED;
    testCase.piste.description = 'other';
    testCase.piste.accepted = false;
    testCase.piste.images = new Array();
    testCase.piste.averageMarks.sun = null;
    testCase.piste.averageMarks.snow = null;
    testCase.piste.averageMarks.verticalDrop = null;
    testCase.piste.averageMarks.length = null;
    testCase.piste.averageMarks.view = null;
    testCase.piste.averageMarks.access = null;
    testCase.piste.averageMarks.pisteId = 'other';
    testCase.piste.averageMarks.lastUpdate = 'other';
    delete( testCase.piste.userMarks['U1']);
    testCase.piste.marksCount = 0;
    
    equal(actual.id, 'testPisteId');
    equal(actual.lastUpdate, '24');
    equal(actual.resortId, 'testResortId');
    equal(actual.name, 'Test Piste');
    equal(actual.color, mbp.Piste.BLACK);
    equal(actual.description, 'A piste just for unit testing purposes');
    equal(actual.accepted, true);
    equal(actual.images.length, 2);
    equal(actual.images[0], 'img/pistes/testPiste1.jpg');
    equal(actual.images[1], 'img/pistes/testPiste2.jpg');
    equal(actual.averageMarks.snow, 1);
    equal(actual.averageMarks.sun, 2);
    equal(actual.averageMarks.verticalDrop, 3);
    equal(actual.averageMarks.length, 4);
    equal(actual.averageMarks.view, 5);
    equal(actual.averageMarks.access, 6);
    equal(actual.averageMarks.pisteId, 'testPisteId');
    equal(actual.averageMarks.lastUpdate, '42');
    deepEqual(actual.userMarks['U1'], testCase.avgMarks);
    equal(actual.marksCount, 51);
});
test('updateMarksAverage() when no marks yet', function() {
	var newMarks = new mbp.PisteMarks();
    newMarks.snow = 6;
    newMarks.sun = 5;
    newMarks.verticalDrop = 4;
    newMarks.length = 3;
    newMarks.view = 2;
    newMarks.access = 1;
    testCase.piste.averageMarks = new mbp.PisteMarks();
    testCase.piste.marksCount = 0;
    testCase.piste.userMarks = {};
    testCase.piste.updateMarksAverage('U2', newMarks);
    
    deepEqual(testCase.piste.userMarks['U2'], newMarks);
    equal(testCase.piste.averageMarks.snow, 6);
    equal(testCase.piste.averageMarks.sun, 5);
    equal(testCase.piste.averageMarks.verticalDrop, 4);
    equal(testCase.piste.averageMarks.length, 3);
    equal(testCase.piste.averageMarks.view, 2);
    equal(testCase.piste.averageMarks.access, 1);
});
test('updateMarksAverage() same voter', function() {
	var newMarks = new mbp.PisteMarks();
    newMarks.snow = 6;
    newMarks.sun = 5;
    newMarks.verticalDrop = 4;
    newMarks.length = 3;
    newMarks.view = 2;
    newMarks.access = 1;
    testCase.piste.marksCount = 1;
    testCase.piste.userMarks['U1'] = testCase.avgMarks;
    testCase.piste.updateMarksAverage('U1', newMarks);
    
    deepEqual(testCase.piste.userMarks['U1'], newMarks);
    equal(testCase.piste.averageMarks.snow, 6);
    equal(testCase.piste.averageMarks.sun, 5);
    equal(testCase.piste.averageMarks.verticalDrop, 4);
    equal(testCase.piste.averageMarks.length, 3);
    equal(testCase.piste.averageMarks.view, 2);
    equal(testCase.piste.averageMarks.access, 1);
});
test('updateMarksAverage() other voter', function() {
	var newMarks = new mbp.PisteMarks();
    newMarks.snow = 6;
    newMarks.sun = 5;
    newMarks.verticalDrop = 4;
    newMarks.length = 3;
    newMarks.view = 2;
    newMarks.access = 1;
    testCase.piste.marksCount = 1;
    testCase.piste.updateMarksAverage('U2', newMarks);
    
    deepEqual(testCase.piste.userMarks['U2'], newMarks);
    equal(testCase.piste.averageMarks.snow, 3.5);
    equal(testCase.piste.averageMarks.sun, 3.5);
    equal(testCase.piste.averageMarks.verticalDrop, 3.5);
    equal(testCase.piste.averageMarks.length, 3.5);
    equal(testCase.piste.averageMarks.view, 3.5);
    equal(testCase.piste.averageMarks.access, 3.5);
});
test('updateMarksAverage() many voters', function() {
	var newMarks = new mbp.PisteMarks();
    newMarks.snow = 1;
    newMarks.sun = 1;
    newMarks.verticalDrop = 1;
    newMarks.length = 1;
    newMarks.view = 1;
    newMarks.access = 1;
    testCase.piste.averageMarks.snow = 5;
    testCase.piste.averageMarks.sun = 5;
    testCase.piste.averageMarks.verticalDrop = 5;
    testCase.piste.averageMarks.length = 5;
    testCase.piste.averageMarks.view = 5;
    testCase.piste.averageMarks.access = 5;
    testCase.piste.marksCount = 9;
    testCase.piste.updateMarksAverage('U2', newMarks);
    
    deepEqual(testCase.piste.userMarks['U2'], newMarks);
    equal(testCase.piste.averageMarks.snow, 4.6);
    equal(testCase.piste.averageMarks.sun, 4.6);
    equal(testCase.piste.averageMarks.verticalDrop, 4.6);
    equal(testCase.piste.averageMarks.length, 4.6);
    equal(testCase.piste.averageMarks.view, 4.6);
    equal(testCase.piste.averageMarks.access, 4.6);
});