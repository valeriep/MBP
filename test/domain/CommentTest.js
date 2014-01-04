"use strict";

module("Comment");
test('constructor with no argument', function() {
    var actual = new mbp.Comment();
    equal(actual.id, null);
    equal(actual.text, null);
    strictEqual(actual.accepted, false);
    equal(actual.creatorId, null);
    equal(actual.lastUpdate, null);
    equal(actual.pisteId, null);
});
test('copy and orignal are independent', function() {
    var comment = new mbp.Comment();
    comment.id = 'testCommentId';
    comment.lastUpdate = '42';
    comment.pisteId = 'C1_A1_R1_P1';
    comment.creatorId = 'U1';
    comment.text = 'Test comment';
    comment.accepted = true;
    
    var actual = new mbp.Comment(comment);
    equal(actual.id, 'testCommentId');
    equal(actual.text, 'Test comment');
    strictEqual(actual.accepted, true);
    equal(actual.creatorId, 'U1');
    equal(actual.lastUpdate, '42');
    equal(actual.pisteId, 'C1_A1_R1_P1');

    comment.id = 'other';
    comment.lastUpdate = 'other';
    comment.pisteId = 'other';
    comment.creatorId = 'other';
    comment.text = 'other';
    comment.accepted = false;

    equal(actual.id, 'testCommentId');
    equal(actual.text, 'Test comment');
    strictEqual(actual.accepted, true);
    equal(actual.creatorId, 'U1');
    equal(actual.lastUpdate, '42');
    equal(actual.pisteId, 'C1_A1_R1_P1');
});