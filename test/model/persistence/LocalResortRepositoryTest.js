"use strict";

mbp.LocalResortRepositoryTestFixture = function() {
    this.repo = new mbp.LocalResortRepository();
    
    this.resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    
    this.piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg', this.resort);
    this.comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1, this.piste);
    this.otherComment = new mbp.Comment('otherTestCommentId', 'Other test comment', 2, 3, this.piste);
    
    this.otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', 'green', 'An other piste just for unit testing purposes', 'img/pistes/test.jpg', this.resort);
    this.yetAnotherComment = new mbp.Comment('yetAnOtherTestCommentId', 'Yet an other test comment', 0, 5, this.otherPiste);
};

module('LocalResortRepository', {
    setup : function() {
        localStorage.clear();
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('save() inserts a record in local storage', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    equal(localStorage.length, 2);
    ok(localStorage.getItem('mbp.Resort.' + fixture.resort.id));
    ok(localStorage.getItem('mbp.ResortsIds'));
});
test('getAll() returns a map of valid Resorts', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    var actual = fixture.repo.getAll();
    equal(actual['testResortId'].id, 'testResortId');
    equal(actual['testResortId'].getPistesIds().length, 2);
    equal(actual['testResortId'].getPiste('testPisteId').getCommentsIds().length, 2);
    equal(actual['testResortId'].getPiste('testPisteId').getComment('testCommentId').id, 'testCommentId');
    equal(actual['testResortId'].getPiste('testPisteId').getComment('otherTestCommentId').id, 'otherTestCommentId');
    equal(actual['testResortId'].getPiste('otherTestPisteId').getCommentsIds().length, 1);
    equal(actual['testResortId'].getPiste('otherTestPisteId').getComment('yetAnOtherTestCommentId').id, 'yetAnOtherTestCommentId');
});