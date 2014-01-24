"use strict";

var testCase;

module("PisteCriteria", {
    setup : function() {
        testCase = {};
        
        testCase.piste = new mbp.Piste();
        testCase.piste.resortId = 'C1_M1_R1';
        testCase.piste.name = 'Test Piste';
        testCase.piste.color = mbp.Piste.BLUE;
        testCase.piste.averageMarks.sun = 3;
        testCase.piste.averageMarks.snow = 3;
        testCase.piste.averageMarks.verticalDrop = 3;
        testCase.piste.averageMarks.length = 3;
        testCase.piste.averageMarks.view = 3;
        testCase.piste.averageMarks.access = 3;
    }
});
test('matches() returns true if criteria is empty (properties unset)', function() {
    ok(new mbp.PisteCriteria().matches(new mbp.Piste()));
});
test('matches() returns true if all criteria set properties match and other are unset', function() {
    ok(new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste));
    ok(new mbp.PisteCriteria('', mbp.Piste.BLUE).matches(testCase.piste));
    ok(new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE).matches(testCase.piste));
    ok(new mbp.PisteCriteria(['C1_M1_R1']).matches(testCase.piste));
    ok(new mbp.PisteCriteria([], '').matches(testCase.piste));
    ok(new mbp.PisteCriteria([], '').matches(testCase.piste));
    ok(new mbp.PisteCriteria(['C1_M1_R1'], '').matches(testCase.piste));
    ok(new mbp.PisteCriteria([], mbp.Piste.BLUE).matches(testCase.piste));
    ok(new mbp.PisteCriteria([], '').matches(testCase.piste));
});
test("matches() returns false if at least one criteria property is set but doesn't match", function() {
    ok(! (new mbp.PisteCriteria('Bad', mbp.Piste.BLUE).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], 'Bad').matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 4, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 2, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 4, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 2, 1, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 4, 5, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 2, 1, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 4, 5, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 2, 1, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 4, 5, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 2, 1, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 4, 5).matches(testCase.piste)));
    ok(! (new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 2).matches(testCase.piste)));
});
test('filter()', function() {
    var a = new mbp.Piste(), b = new mbp.Piste(), c = new mbp.Piste();
    a.resortId = 'C1_M1_R1';
    a.color = mbp.Piste.BLUE;
    b.resortId = 'C1_M1_R2';
    b.color = mbp.Piste.BLUE;
    c.resortId = 'C1_M1_R1';
    c.color = mbp.Piste.RED;
    var actual = new mbp.PisteCriteria(['C1_M1_R1'], mbp.Piste.BLUE).filter([a, b, c]);
    
    equal(actual.length, 1);
    deepEqual(actual[0], a);
});