"use strict";

var resorts = new mbp.TestCase().getResorts();
var resort = resorts[Object.keys(resorts)[0]];
var piste = resort.getPiste(resort.getPistesIds()[0]);

module("PisteCriteria");
test('matches() returns true if criteria is empty (properties unset)', function() {
    ok(new mbp.PisteCriteria().matches(piste));
});
test('matches() returns true if all criteria set properties match and other are unset', function() {
    ok(new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(piste));
    ok(new mbp.PisteCriteria('', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.PisteCriteria('Country 1', '', 'C1_M1_R1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.PisteCriteria('Country 1', 'Area 1', '', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1').matches(piste));
    ok(new mbp.PisteCriteria('Country 1', '', '', '').matches(piste));
    ok(new mbp.PisteCriteria('', 'Area 1', '', '').matches(piste));
    ok(new mbp.PisteCriteria('', '', 'C1_M1_R1', '').matches(piste));
    ok(new mbp.PisteCriteria('', '', '', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.PisteCriteria('', '', '', '').matches(piste));
});
test("matches() returns false if at least one criteria property is set but doesn't match", function() {
    ok(! (new mbp.PisteCriteria('Bad', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Bad', 'C1_M1_R1', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'Bad', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', 'Bad').matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 6, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 0, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 6, 5, 1, 5, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 0, 1, 5, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 6, 5, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 0, 1, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 6, 5, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 0, 1, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 6, 5, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 0, 1, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 6, 5).matches(piste)));
    ok(! (new mbp.PisteCriteria('Country 1', 'Area 1', 'C1_M1_R1', mbp.Piste.BLUE, 1, 5, 1, 5, 1, 5, 1, 5, 1, 5, 1, 0).matches(piste)));
});
test('getMatchingPistes()', function() {
    var actual = new mbp.PisteCriteria('Country 1', null, null, null, null).getMatchingPistes(resort);
    equal(actual.length, 4);
    resort.eachPiste(function(piste) {
        ok(actual.indexOf(piste) != -1);
    });
});