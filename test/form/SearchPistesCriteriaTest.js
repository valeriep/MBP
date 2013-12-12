"use strict";

var resorts = new mbp.TestCase().getResorts();
var resort = resorts[Object.keys(resorts)[0]];
var piste = resort.getPiste(resort.getPistesIds()[0]);

module("SearchPistesCriteria");
test('matches() returns true if criteria is empty (properties unset)', function() {
    ok(new mbp.SearchPistesCriteria().matches(piste));
});
test('matches() returns true if all criteria set properties match and other are unset', function() {
    ok(new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'C1_M1_R1', 'Piste 1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.SearchPistesCriteria('', 'Area 1', 'C1_M1_R1', 'Piste 1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.SearchPistesCriteria('Country 1', '', 'C1_M1_R1', 'Piste 1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.SearchPistesCriteria('Country 1', 'Area 1', '', 'Piste 1', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'C1_M1_R1', '', mbp.Piste.BLUE).matches(piste));
    ok(new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'C1_M1_R1', 'Piste 1', '').matches(piste));
    ok(new mbp.SearchPistesCriteria('Country 1', '', '', '', '').matches(piste));
    ok(new mbp.SearchPistesCriteria('', 'Area 1', '', '', '').matches(piste));
    ok(new mbp.SearchPistesCriteria('', '', 'C1_M1_R1', '', '').matches(piste));
    ok(new mbp.SearchPistesCriteria('', '', '', 'Piste 1', '').matches(piste));
    ok(new mbp.SearchPistesCriteria('', '', '', '', mbp.Piste.BLUE).matches(piste));
});
test("matches() returns false if at least one criteria property is set but doesn't match", function() {
    ok(! (new mbp.SearchPistesCriteria('Bad', 'Area 1', 'C1_M1_R1', 'Piste 1', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.SearchPistesCriteria('Country 1', 'Bad', 'C1_M1_R1', 'Piste 1', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'Bad', 'Piste 1', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'C1_M1_R1', 'Bad', mbp.Piste.BLUE).matches(piste)));
    ok(! (new mbp.SearchPistesCriteria('Country 1', 'Area 1', 'C1_M1_R1', 'Piste 1', 'Bad').matches(piste)));
});
test("matches() returns true if Piste name contains name criteria (and not just equal)", function() {
    ok(new mbp.SearchPistesCriteria('', '', '', 'Piste', '').matches(piste));
});
test('getMatchingPistes()', function() {
    var actual = new mbp.SearchPistesCriteria('Country 1', null, null, null, null).getMatchingPistes(resort);
    equal(actual.length, 4);
    resort.eachPiste(function(piste) {
        ok(actual.indexOf(piste) != -1);
    });
});