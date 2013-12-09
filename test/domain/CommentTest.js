"use strict";

var resorts = new mbp.TestCase().getResorts();
var pistes = new Array();
resorts[Object.keys(resorts)[0]].eachPiste(function(piste) {
    pistes.push(piste);
});

module("Comment");
test('constructor', function() {
    var piste = pistes[0];
    var comment = new mbp.Comment('testCommentId', '42', piste, 'U1', 'Test comment', false, 'inappropriate');
    equal(comment.id, 'testCommentId');
    equal(comment.text, 'Test comment');
    strictEqual(comment.accepted, false);
    equal(comment.creatorId, 'U1');
    equal(comment.lastUpdate, '42');
    equal(comment.rejectCause, 'inappropriate');
    strictEqual(comment.getPiste(), piste);
});
test('setPiste() adds comment to piste comments array', function() {
    var piste = pistes[0];
    var comment = new mbp.Comment('testCommentId', '42', null, 'U1', 'Test comment', false, 'inappropriate');
    comment.setPiste(piste);
    strictEqual(comment.getPiste(), piste);
    strictEqual(piste.getComment('testCommentId'), comment);
});
test('setPiste() removes comment from previous piste comments array', function() {
    var piste = pistes[0];
    var otherPiste = pistes[1];
    var comment = new mbp.Comment('testCommentId', '42', null, 'U1', 'Test comment', false, 'inappropriate');
    comment.setPiste(piste);
    comment.setPiste(otherPiste);
    equal(comment.getPiste(), otherPiste);
    strictEqual(otherPiste.getComment('testCommentId'), comment);
    ok(!piste.getComment('testCommentId'));
});