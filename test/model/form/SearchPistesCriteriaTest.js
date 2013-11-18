"use strict";

mbp.SearchPistesCriteriaTestFixture = function() {
    this.resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    this.piste = new mbp.Piste('testPisteId', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, this.resort);
    this.otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', mbp.Piste.GREEN, 'An other piste just for unit testing purposes', 'img/pistes/test.jpg', 2.5, this.resort);
    
    this.otherResort = new mbp.Resort('totherTestResortId', 'Other Test Resort', 'Test Country', 'Other Massif');
    this.yetAnotherPiste = new mbp.Piste('yetAnotherTestPisteId', 'Yet An Other Test Piste', mbp.Piste.RED, 'An other piste just for unit testing purposes', 'img/pistes/test.jpg', 2.5, this.otherResort);
};

module("SearchPistesCriteria");
test('matches() returns true if criteria is empty (properties unset)', function() {
    var fixture = new mbp.SearchPistesCriteriaTestFixture();
    ok(new mbp.SearchPistesCriteria().matches(fixture.piste));
});
test('matches() returns true if all criteria set properties match and other are unset', function() {
    var fixture = new mbp.SearchPistesCriteriaTestFixture();
    ok(new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'testResortId', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('', 'Test Massif', 'testResortId', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('Test Country', '', 'testResortId', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('Test Country', 'Test Massif', '', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'testResortId', '', mbp.Piste.BLACK).matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'testResortId', 'Test Piste', '').matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('Test Country', '', '', '', '').matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('', 'Test Massif', '', '', '').matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('', '', 'testResortId', '', '').matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('', '', '', 'Test Piste', '').matches(fixture.piste));
    ok(new mbp.SearchPistesCriteria('', '', '', '', mbp.Piste.BLACK).matches(fixture.piste));
});
test("matches() returns false if at least one criteria property is set but doesn't match", function() {
    var fixture = new mbp.SearchPistesCriteriaTestFixture();
    ok(! (new mbp.SearchPistesCriteria('Bad', 'Test Massif', 'testResortId', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste)));
    ok(! (new mbp.SearchPistesCriteria('Test Country', 'Bad', 'testResortId', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste)));
    ok(! (new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'Bad', 'Test Piste', mbp.Piste.BLACK).matches(fixture.piste)));
    ok(! (new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'testResortId', 'Bad', mbp.Piste.BLACK).matches(fixture.piste)));
    ok(! (new mbp.SearchPistesCriteria('Test Country', 'Test Massif', 'testResortId', 'Test Piste', 'Bad').matches(fixture.piste)));
});
test("matches() returns true if Piste name contains name criteria (and not just equal)", function() {
    var fixture = new mbp.SearchPistesCriteriaTestFixture();
    ok(new mbp.SearchPistesCriteria('', '', '', 'Piste', '').matches(fixture.piste));
});
test('getMatchingPistes() works with an Array of resorts', function() {
    var fixture = new mbp.SearchPistesCriteriaTestFixture();
    var arr = new Array(fixture.resort, fixture.otherResort);
    var actual = new mbp.SearchPistesCriteria('Test Country', null, null, null, null).getMatchingPistes(arr);
    equal(actual.length, 3);
    ok(actual.indexOf(fixture.piste) != -1);
    ok(actual.indexOf(fixture.otherPiste) != -1);
    ok(actual.indexOf(fixture.yetAnotherPiste) != -1);
});