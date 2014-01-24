"use strict";

var testCase;

module("ResortCriteria", {
    setup : function() {
        testCase = {};
        
        testCase.resort = new mbp.Resort();
        testCase.resort.country = 'Test Country';
        testCase.resort.area = 'Test Area';
    }
});
test('matches() returns true if criteria is empty (properties unset)', function() {
    ok(new mbp.ResortCriteria().matches(new mbp.Resort()));
});
test('matches() returns true if all criteria set properties match and other are unset', function() {
    ok(new mbp.ResortCriteria('Test Country', 'Test Area').matches(testCase.resort));
    ok(new mbp.ResortCriteria('Test Country', '').matches(testCase.resort));
    ok(new mbp.ResortCriteria('', 'Test Area').matches(testCase.resort));
});
test("matches() returns false if at least one criteria property is set but doesn't match", function() {
    ok(! (new mbp.ResortCriteria('Bad', 'Test Area').matches(testCase.resort)));
    ok(! (new mbp.ResortCriteria('Test Country', 'Bad').matches(testCase.resort)));
});
test('filter()', function() {
    var a = new mbp.Resort(), b = new mbp.Resort(), c = new mbp.Resort();
    a.country = 'Test Country';
    a.area = 'Test Area';
    b.country = 'Other Test Country';
    b.area = 'Test Area';
    c.country = 'Test Country';
    c.area = 'Other Test Area';
    var actual = new mbp.ResortCriteria('Test Country', 'Test Area').filter([a, b, c]);
    
    equal(actual.length, 1);
    deepEqual(actual[0], a);
});