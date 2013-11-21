"use strict";

mbp.JsonConverterTestFixture = function(){
    var instance = this;
    this.resort = new mbp.Resort('testResortId', 'Test Resort Name', 'Test Country', 'Test MAssif');
    this.piste = new mbp.Piste('testPisteId', 'Test Piste', mbp.Piste.COLORS.blue, 'Test description', '/img/testPisteId.jpg', 3, instance.resort);
    this.comment = new mbp.Comment('testCommentId', 'Test Comment Text', 2, 4, instance.piste);
    this.otherComment = new mbp.Comment('otherTestCommentId', 'Other test comment text', 3, 3, instance.piste);
    this.otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', mbp.Piste.COLORS.red, 'Other test piste description', '/img/otherTestPisteId.jpg', 2.5, instance.resort);
    this.jsonComment = new mbp.JsonComment(instance.comment.id, instance.comment.text, instance.comment.snowMark, instance.comment.sunMark);
    this.otherJsonComment = new mbp.JsonComment(instance.otherComment.id, instance.otherComment.text, instance.otherComment.snowMark, instance.otherComment.sunMark);
    this.jsonPiste = new mbp.JsonPiste(instance.piste.id, instance.piste.name, instance.piste.color, instance.piste.description, instance.piste.picture, instance.piste.averageMark, new Array(instance.jsonComment, instance.otherJsonComment));
    this.otherJsonPiste = new mbp.JsonPiste(instance.otherPiste.id, instance.otherPiste.name, instance.otherPiste.color, instance.otherPiste.description, instance.otherPiste.picture, instance.otherPiste.averageMark, new Array());
    this.jsonResort = new mbp.JsonResort(instance.resort.id, instance.resort.name, instance.resort.country, instance.resort.massif, new Array(instance.jsonPiste, instance.otherJsonPiste));
};

module('JsonConverter', {
});
test('CommentToJsonComment()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.CommentToJsonComment(f.comment);
    deepEqual(actual, f.jsonComment);
});
test('JsonCommentToComment()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonCommentToComment(f.jsonComment);
    deepEqual(actual, f.comment);
});
test('PisteToJsonPiste()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.PisteToJsonPiste(f.piste);
    deepEqual(actual, f.jsonPiste);
});
test('JsonPisteToPiste()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonPisteToPiste(f.jsonPiste);
    deepEqual(actual, f.piste);
});
test('ResortToJsonResort()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.ResortToJsonResort(f.resort);
    deepEqual(actual, f.jsonResort);
});
test('JsonResortToResort()', function() {
    var f = new mbp.JsonConverterTestFixture();
    var converter = new mbp.JsonConverter();
    var actual = converter.JsonResortToResort(f.jsonResort);
    deepEqual(actual, f.resort);
});