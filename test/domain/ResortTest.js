"use strict";

module("Resort");
test('constructor', function() {
    var resort = new mbp.Resort('testResortId', '42', 'Test Resort', 'Test Country', 'Test Area');
    equal(resort.id, 'testResortId');
    equal(resort.lastUpdate, '42');
    equal(resort.country, 'Test Country');
    equal(resort.area, 'Test Area');
    equal(resort.name, 'Test Resort');
});
test('addPiste() also sets resort reference into Piste', function() {
    var resort = new mbp.Resort('testResortId', '42', 'Test Resort', 'Test Country', 'Test Area');
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    resort.addPiste(piste);
    equal(resort.getPiste('testPisteId'), piste);
    equal(piste.getResort(), resort);
});
test('removePiste() also sets resort reference to null into Piste', function() {
    var resort = new mbp.Resort('testResortId', '42', 'Test Resort', 'Test Country', 'Test Area');
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', resort, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    equal(resort.getPiste('testPisteId'), piste);
    equal(piste.getResort(), resort);
    resort.removePiste(piste);
    ok(!resort.getPiste('testPisteId'));
    ok(!piste.getResort());
});
test('getPistesIds() actually returns all pistes ids', function() {
    var resort = new mbp.Resort('testResortId', '69', 'Test Resort', 'Test Country', 'Test Area');
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', resort, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    var otherPiste = new mbp.Piste('otherTestPisteId', '69', resort, 'U2', 'Other Test Piste', mbp.Piste.GREEN, 'An other piste just for unit testing purposes', 'img/pistes/otherTest.jpg', avgMarks, 51, true, null);
    var actual = resort.getPistesIds();
    equal(actual.length, 2);
    ok(actual.indexOf(piste.id) > -1);
    ok(actual.indexOf(otherPiste.id) > -1);
});
test('eachPiste(func) actually applies func to all pistes', function() {
    var resort = new mbp.Resort('testResortId', '69', 'Test Resort', 'Test Country', 'Test Area');
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', resort, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    var otherPiste = new mbp.Piste('otherTestPisteId', '69', resort, 'U2', 'Other Test Piste', mbp.Piste.GREEN, 'An other piste just for unit testing purposes', 'img/pistes/otherTest.jpg', avgMarks, 51, true, null);
    var ids = new Array();
    resort.eachPiste(function(piste) {
        ids.push(piste.id);
    });
    equal(ids.length, 2);
    ok(ids.indexOf(piste.id) != -1);
    ok(ids.indexOf(otherPiste.id) != -1);
});