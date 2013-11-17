"use strict";

module("Piste");
test('constructor', function() {
    var aResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', mbp.Piste.BLACK, 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, aResort);
    equal(piste.id, 'testPisteId');
    equal(piste.name, 'Test Piste');
    equal(piste.color, 'black');
    equal(piste.description, 'A piste just for unit testing purposes');
    equal(piste.picture, 'img/pistes/test.jpg');
    equal(piste.getResort(), aResort);
    equal(piste.getResort().id, 'testResortId');
    strictEqual(piste.getResort().getPiste('testPisteId'), piste);
});
test('setResort() adds piste to resort pistes array', function() {
    var aResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    piste.setResort(aResort);
    equal(piste.getResort(), aResort);
    equal(aResort.getPiste('testPisteId'), piste);
});
test('setResort() removes piste from previous resort pistes array', function() {
    var aResort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    var anOtherResort = new mbp.Resort('otherTestResortId', 'Other Test Resort', 'Test Country', 'Test Massif');
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    piste.setResort(aResort);
    piste.setResort(anOtherResort);
    equal(piste.getResort(), anOtherResort);
    equal(anOtherResort.getPiste('testPisteId'), piste);
    ok(!aResort.getPiste('testPisteId'));
});
test('addComment() also sets piste reference into Comment', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1);
    piste.addComment(comment);
    equal(piste.getComment('testCommentId'), comment);
    equal(comment.getPiste(), piste);
});
test('removeComment() also sets piste reference to null into Comment', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1, piste);
    equal(piste.getComment('testCommentId'), comment);
    equal(comment.getPiste(), piste);
    piste.removeComment(comment);
    ok(!piste.getComment('testCommentId'));
    strictEqual(comment.getPiste(), null);
});
test('getCommentsIds() actually returns all comments ids', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1, piste);
    var otherComment = new mbp.Comment('otherTestCommentId', 'Other test comment', 3, 2, piste);
    var actual = piste.getCommentsIds();
    equal(actual.length, 2);
    ok(actual.indexOf(comment.id) > -1);
    ok(actual.indexOf(otherComment.id) > -1);
});