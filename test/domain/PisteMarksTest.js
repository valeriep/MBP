"use strict";

var testCase;

module("PisteMarks", {
	setup : function() {
    },
    teardown : function() {
    }
});
test('constructor with no argument', function() {
    var actual = new mbp.PisteMarks();
    
    strictEqual(actual.snow, null);
    strictEqual(actual.sun, null);
    strictEqual(actual.verticalDrop, null);
    strictEqual(actual.length, null);
    strictEqual(actual.view, null);
    strictEqual(actual.access, null);
    strictEqual(actual.pisteId, null);
    strictEqual(actual.lastUpdate, null);
});
test('copy and original objects are independent', function() {
	var original = new mbp.PisteMarks();
    original.sun = 1;
    original.snow = 2;
    original.verticalDrop = 3;
    original.length = 4;
    original.view = 5;
    original.access = 6;
    original.pisteId = 'testPisteId';
    original.lastUpdate = '42';
	
    var actual = new mbp.PisteMarks(original);
    equal(actual.sun, 1);
    equal(actual.snow, 2);
    equal(actual.verticalDrop, 3);
    equal(actual.length, 4);
    equal(actual.view, 5);
    equal(actual.access, 6);
    equal(actual.pisteId, 'testPisteId');
    equal(actual.lastUpdate, '42');
    
    original.sun = null;
    original.snow = null;
    original.verticalDrop = null;
    original.length = null;
    original.view = null;
    original.access = null;
    original.pisteId = 'other';
    original.lastUpdate = 'other';
    
    equal(actual.sun, 1);
    equal(actual.snow, 2);
    equal(actual.verticalDrop, 3);
    equal(actual.length, 4);
    equal(actual.view, 5);
    equal(actual.access, 6);
    equal(actual.pisteId, 'testPisteId');
    equal(actual.lastUpdate, '42');
});