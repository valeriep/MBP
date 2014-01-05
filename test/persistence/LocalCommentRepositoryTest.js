"use strict";

var testCase;

module('LocalCommentRepository', {
    setup : function() {
        testCase = {};
        localStorage.clear();
        testCase.repo = new mbp.LocalCommentRepository();
        testCase.comment = new mbp.Comment();
        testCase.comment.id = 'testCommentId';
        testCase.comment.lastUpdate = '42';
        testCase.comment.pisteId = 'testPisteId';
        testCase.comment.creatorId = 'U1';
        testCase.comment.text = 'Test comment';
        testCase.comment.accepted = true;
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('createId()', function() {
    ok(/^testPisteId_\d+$/.test(testCase.repo.createId(testCase.comment)));
});
test('save() sets comment id if falsy, inserts a comment record and updates index in local storage', function() {
    testCase.comment.id = null;
    testCase.repo.saveComment(testCase.comment);
    equal(Object.keys(localStorage).length, 2);
    ok(/^testPisteId_\d+$/.test(testCase.comment.id));
    ok(/^{\"testPisteId\":{\"testPisteId_\d+\":\"42\"}}$/.test(localStorage.getItem('mbp.Comment.cbp')));
});
test('getCommentById()', function() {
    testCase.repo.saveComment(testCase.comment);
    testCase.repo.getCommentById(testCase.comment.id, function(actual) {
        deepEqual(actual, testCase.comment);
    });
});
test('getCommentsByPisteId()', function() {
    var other = new mbp.Comment(testCase.comment), yetAnother = new mbp.Comment(testCase.comment), testCommentIdFound = false, otherTestCommentIdFound = false, i = null;
    other.id = 'otherTestCommentId';
    yetAnother.id = 'yetAnotherTestCommentId';
    yetAnother.pisteId = 'otherTestPisteId';
    testCase.repo.saveComment(testCase.comment);
    testCase.repo.saveComment(other);
    testCase.repo.saveComment(yetAnother);
    
    testCase.repo.getCommentsByPisteId('testPisteId', function(actual) {
        equal(actual.length, 2);
        for(i in actual) {
            if(actual[i].id == 'testCommentId') {
                testCommentIdFound = true;
                deepEqual(actual[i], testCase.comment);
            } else if(actual[i].id == 'otherTestCommentId') {
                otherTestCommentIdFound = true;
                deepEqual(actual[i], other);
            }
        }
        ok(testCommentIdFound);
        ok(otherTestCommentIdFound);
    });
});
test('getCommentsByCreatorId()', function() {
    var other = new mbp.Comment(testCase.comment), yetAnother = new mbp.Comment(testCase.comment), testCommentIdFound = false, otherTestCommentIdFound = false, i = null;
    other.id = 'otherTestCommentId';
    yetAnother.id = 'yetAnotherTestCommentId';
    yetAnother.creatorId = 'U2';
    testCase.repo.saveComment(testCase.comment);
    testCase.repo.saveComment(other);
    testCase.repo.saveComment(yetAnother);
    
    testCase.repo.getCommentsByCreatorId('U1', function(actual) {
        equal(actual.length, 2);
        for(i in actual) {
            if(actual[i].id == 'testCommentId') {
                testCommentIdFound = true;
                deepEqual(actual[i], testCase.comment);
            } else if(actual[i].id == 'otherTestCommentId') {
                otherTestCommentIdFound = true;
                deepEqual(actual[i], other);
            }
        }
        ok(testCommentIdFound);
        ok(otherTestCommentIdFound);
    });
});
test('eachComment() actually runs on each comment', function() {
    var other = new mbp.Comment(testCase.comment);
    other.id = 'otherTestCommentId';
    testCase.repo.saveComment(testCase.comment);
    testCase.repo.saveComment(other);

    expect(2);
    testCase.repo.eachComment(function(actual) {
        if(actual.id == testCase.comment.id) {
            deepEqual(actual, testCase.comment);
        } else if(actual.id == 'otherTestCommentId') {
            deepEqual(actual, other);
        }
    });
});
test('clear()', function() {
    testCase.repo.clear();
    equal(Object.keys(localStorage).length, 1);
    ok(/^{}$/.test(localStorage.getItem('mbp.Comment.cbp')));
});