"use strict";

module("Comment");
test('constructor', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1, piste);
    equal(comment.id, 'testCommentId');
    equal(comment.text, 'Test comment');
    equal(comment.snowMark, 4);
    equal(comment.sunMark, 1);
    strictEqual(comment.getPiste(), piste);
});
test('setPiste() adds comment to piste comments array', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1);
    comment.setPiste(piste);
    strictEqual(comment.getPiste(), piste);
    strictEqual(piste.getComment('testCommentId'), comment);
});
test('setPiste() removes comment from previous piste comments array', function() {
    var piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg');
    var otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', 'green', 'An other piste just for unit testing purposes', 'img/pistes/other.jpg');
    var comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1);
    comment.setPiste(piste);
    comment.setPiste(otherPiste);
    equal(comment.getPiste(), otherPiste);
    equal(otherPiste.getComment('testCommentId'), comment);
    ok(!piste.getComment('testCommentId'));
});