"use strict";

module("Resort");
test('constructor', function() {
    var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
    equal(resort.id, 'testResortId');
    equal(resort.country, 'Test Country');
    equal(resort.area, 'Test Area');
    equal(resort.name, 'Test Resort');
});
test('addPiste() also sets resort reference into Piste', function() {
    var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    resort.addPiste(piste);
    equal(resort.getPiste('testPisteId'), piste);
    equal(piste.getResort(), resort);
});
test('removePiste() also sets resort reference to null into Piste', function() {
    var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, resort);
    equal(resort.getPiste('testPisteId'), piste);
    equal(piste.getResort(), resort);
    resort.removePiste(piste);
    ok(!resort.getPiste('testPisteId'));
    ok(!piste.getResort());
});
test('getPistesIds() actually returns all pistes ids', function() {
    var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, resort);
    var otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', 'green', 'An other piste just for unit testing purposes', 'img/pistes/otherTest.jpg', 2.5, resort);
    var actual = resort.getPistesIds();
    equal(actual.length, 2);
    ok(actual.indexOf(piste.id) > -1);
    ok(actual.indexOf(otherPiste.id) > -1);
});
test('eachPiste(func) actually applies func to all pistes', function() {
    var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Area');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, resort);
    var otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', 'green', 'An other piste just for unit testing purposes', 'img/pistes/otherTest.jpg', 2.5, resort);
    var ids = new Array();
    resort.eachPiste(function(piste) {
        ids.push(piste.id);
    });
    equal(ids.length, 2);
    ok(ids.indexOf(piste.id) != -1);
    ok(ids.indexOf(otherPiste.id) != -1);
});