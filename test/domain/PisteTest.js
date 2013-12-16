"use strict";

var resorts = new mbp.TestCase().getResorts();
var pistes = new Array();
resorts[Object.keys(resorts)[0]].eachPiste(function(piste) {
    pistes.push(piste);
});

module("Piste");
test('constructor', function() {
    var aResort = resorts[Object.keys(resorts)[0]];
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', aResort, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    equal(piste.id, 'testPisteId');
    equal(piste.name, 'Test Piste');
    equal(piste.color, 'black');
    equal(piste.description, 'A piste just for unit testing purposes');
    equal(piste.picture, 'img/pistes/test.jpg');
    equal(piste.getResort(), aResort);
    equal(piste.averageMarks, avgMarks);
    equal(piste.marksCount, 51);
    equal(piste.accepted, true);
    strictEqual(piste.rejectCause, '');
    strictEqual(piste.getResort().getPiste('testPisteId'), piste);
});
test('setResort() adds piste to resort pistes array', function() {
    var aResort = resorts[Object.keys(resorts)[0]];
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    piste.setResort(aResort);
    equal(piste.getResort(), aResort);
    equal(aResort.getPiste('testPisteId'), piste);
});
test('setResort() removes piste from previous resort pistes array', function() {
    var aResort = resorts[Object.keys(resorts)[0]];
    var anOtherResort = resorts[Object.keys(resorts)[1]];
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    piste.setResort(aResort);
    piste.setResort(anOtherResort);
    equal(piste.getResort(), anOtherResort);
    equal(anOtherResort.getPiste('testPisteId'), piste);
    ok(!aResort.getPiste('testPisteId'));
});
test('addComment() also sets piste reference into Comment', function() {
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    var comment = new mbp.Comment('testCommentId', '42', null, 'U1', 'Test comment', false, 'inappropriate');
    piste.addComment(comment);
    equal(piste.getComment('testCommentId'), comment);
    equal(comment.getPiste(), piste);
});
test('removeComment() also sets piste reference to null into Comment', function() {
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '42', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    var comment = new mbp.Comment('testCommentId', '42', piste, 'U1', 'Test comment', false, 'inappropriate');
    equal(piste.getComment('testCommentId'), comment);
    equal(comment.getPiste(), piste);
    piste.removeComment(comment);
    ok(!piste.getComment('testCommentId'));
    strictEqual(comment.getPiste(), null);
});
test('getCommentsIds() actually returns all comments ids', function() {
    var avgMarks = new mbp.PisteMarks(1, 2, 3, 4, 5, 3, 'testPisteId', '42');
    var piste = new mbp.Piste('testPisteId', '69', null, 'U1', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', avgMarks, 51, true, null);
    var comment = new mbp.Comment('testCommentId', '42', piste, 'U1', 'Test comment', false, 'inappropriate');
    var otherComment = new mbp.Comment('otherTestCommentId', '69', piste, 'U2', 'Other test comment', true, null);
    var actual = piste.getCommentsIds();
    equal(actual.length, 2);
    ok(actual.indexOf(comment.id) > -1);
    ok(actual.indexOf(otherComment.id) > -1);
});