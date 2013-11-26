"use strict";

var testResort = null;
var testPiste = null;
var testComment = null;
var testJsonComment = null;
var testJsonPiste = null;
var testJsonResort = null;

module('JsonConverter', {
    setup : function() {
        if(!testResort) {
            var resorts = new mbp.TestCase().getResorts();
            var resortId = Object.keys(resorts)[0];
            testResort = resorts[resortId];
        }
        if(!testPiste) {
            testPiste = testResort.getPiste(testResort.getPistesIds()[0]);
         }
        if(!testComment) {
            testComment = testPiste.getComment(testPiste.getCommentsIds()[0]);
            testJsonComment = new mbp.JsonComment(testComment.id, testComment.lastUpdate, testComment.creatorId, testComment.text, testComment.accepted, testComment.rejectCause);
        }
        if(!testJsonPiste) {
            testJsonPiste = new mbp.JsonPiste(testPiste.id, testPiste.lastUpdate, testPiste.creatorId, testPiste.name, testPiste.color, testPiste.description, testPiste.picture, testPiste.averageMarks, testPiste.marksCount, testPiste.accepted, testPiste.rejectCause, new Array(testJsonComment));
        }
        if(!testJsonResort) {
            testJsonResort = new mbp.JsonResort(testResort.id, testResort.lastUpdate, testResort.name, testResort.country, testResort.area, new Array(testJsonPiste));
        }
    }
});
test('CommentToJsonComment()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.CommentToJsonComment(testComment);
    equal(actual.id, testComment.id);
    equal(actual.lastUpdate, testComment.lastUpdate);
    equal(actual.creatorId, testComment.creatorId);
    equal(actual.text, testComment.text);
    equal(actual.accepted, testComment.accepted);
    equal(actual.rejectCause, testComment.rejectCause);
});
test('JsonCommentToComment()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonCommentToComment(testJsonComment);
    deepEqual(actual, testComment);
});
test('PisteToJsonPiste()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.PisteToJsonPiste(testPiste);
    equal(actual.id, testPiste.id);
    equal(actual.lastUpdate, testPiste.lastUpdate);
    equal(actual.creatorId, testPiste.creatorId);
    equal(actual.text, testPiste.text);
    deepEqual(actual.marks, testPiste.marks);
    equal(actual.accepted, testPiste.accepted);
    equal(actual.rejectCause, testPiste.rejectCause);
    equal(actual.comments.length, testPiste.getCommentsIds().length);
});
test('JsonPisteToPiste()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonPisteToPiste(testJsonPiste);
    equal(actual.id, testJsonPiste.id);
    equal(actual.lastUpdate, testJsonPiste.lastUpdate);
    equal(actual.creatorId, testJsonPiste.creatorId);
    equal(actual.name, testJsonPiste.name);
    equal(actual.color, testJsonPiste.color);
    equal(actual.description, testJsonPiste.description);
    equal(actual.picture, testJsonPiste.picture);
    deepEqual(actual.marks, testJsonPiste.marks);
    equal(actual.accepted, testJsonPiste.accepted);
    equal(actual.rejectCause, testJsonPiste.rejectCause);
    deepEqual(actual.getCommentsIds(), new Array(testJsonComment.id));
});
test('ResortToJsonResort()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.ResortToJsonResort(testResort);
    equal(actual.id, testResort.id);
    equal(actual.lastUpdate, testResort.lastUpdate);
    equal(actual.creatorId, testResort.creatorId);
    equal(actual.name, testResort.name);
    equal(actual.country, testResort.country);
    equal(actual.area, testResort.area);
    deepEqual(actual.pistes.length, 4);
});
test('JsonResortToResort()', function() {
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonResortToResort(testJsonResort);
    equal(actual.id, testJsonResort.id);
    equal(actual.lastUpdate, testJsonResort.lastUpdate);
    equal(actual.creatorId, testJsonResort.creatorId);
    equal(actual.name, testJsonResort.name);
    equal(actual.country, testJsonResort.country);
    equal(actual.area, testJsonResort.area);
    deepEqual(actual.getPistesIds(), new Array(testJsonPiste.id));
});