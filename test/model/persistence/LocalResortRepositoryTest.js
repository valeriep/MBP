"use strict";

mbp.LocalResortRepositoryTestFixture = function() {
    this.repo = new mbp.LocalResortRepository();
    
    this.resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
    
    this.piste = new mbp.Piste('testPisteId', 'Test Piste', 'black', 'A piste just for unit testing purposes', 'img/pistes/test.jpg', 4, this.resort);
    this.comment = new mbp.Comment('testCommentId', 'Test comment', 4, 1, this.piste);
    this.otherComment = new mbp.Comment('otherTestCommentId', 'Other test comment', 2, 3, this.piste);
    
    this.otherPiste = new mbp.Piste('otherTestPisteId', 'Other Test Piste', 'green', 'An other piste just for unit testing purposes', 'img/pistes/test.jpg', 2.5, this.resort);
    this.yetAnotherComment = new mbp.Comment('yetAnOtherTestCommentId', 'Yet an other test comment', 0, 5, this.otherPiste);
};

mbp.testUtil = {
        countProperties : function(obj) {
            var attribCnt = 0, i = null;
            for(i in obj) {
                if(typeof obj[i] != 'function'){
                    attribCnt++;
                }
            }
            return attribCnt;
        }
};

module('LocalResortRepository', {
    setup : function() {
        localStorage.clear();
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('createComment', function() {
    var jsonStr = '{' + 
    '"id":"testCommentId", ' + 
    '"text":"Test comment", ' + 
    '"snowMark":4, ' + 
    '"sunMark":1}';
    var deserialized = JSON.parse(jsonStr);
    var repo = new mbp.LocalResortRepository();
    var actual = repo.createComment(deserialized);
    equal(actual.id, 'testCommentId');
    equal(actual.text, 'Test comment');
    equal(actual.snowMark, 4);
    equal(actual.sunMark, 1);
    
    // This will fail if properties count change (but deserialization is most likely to be changed too)
    equal(mbp.testUtil.countProperties(actual), 4); 
});
test('createPiste', function() {
    var jsonStr = '{' + 
    '"id": "testPisteId", ' + 
    '"color": "black", ' + 
    '"description": "A piste just for unit testing purposes", ' + 
    '"name": "Test Piste", ' + '"picture":"img/pistes/test.jpg", ' + 
    '"comments":[' +
    '    {    "id":"testCommentId", ' + 
    '         "text":"Test comment", ' + 
    '         "snowMark":4, ' + '"sunMark":1 '+
    '    },' +
    '    {    "id":"otherTestCommentId", ' + 
    '         "text":"Other test comment", ' + 
    '         "snowMark":2, ' + '"sunMark":3' + 
    '    }' +
    ']}';
    var deserialized = JSON.parse(jsonStr);
    var repo = new mbp.LocalResortRepository();
    var actual = repo.createPiste(deserialized);
    equal(actual.id, 'testPisteId');
    equal(actual.name, 'Test Piste');
    equal(actual.color, 'black');
    equal(actual.description, 'A piste just for unit testing purposes');
    equal(actual.picture, 'img/pistes/test.jpg');
    ok(actual.getComment(actual.getCommentsIds()[0]));
    ok(actual.getComment(actual.getCommentsIds()[1]));
    
    // This will fail if properties count change (but deserialization is most likely to be changed too)
    equal(mbp.testUtil.countProperties(actual), 6); 
});
test('createResort', function() {
    var jsonStr = '{ ' +
        '"id":"testResortId", ' +
        '"name":"Test Resort", ' +
        '"country":"Test Country", ' +
        '"massif":"Test Massif", ' +
        '"pistes":[ ' +
        '    {   "id":"testPisteId", ' +
        '        "color":"black", ' +
        '        "description": "A piste just for unit testing purposes", ' +
        '        "name":"Test Piste", ' +
        '        "picture":"img/pistes/test.jpg", ' +
        '        "comments":[ ' +
        '            {   "id":"testCommentId", ' +
        '                "text":"Test comment", ' +
        '                "snowMark":4, ' +
        '                "sunMark":1 ' +
        '            }, ' +
        '            {   "id":"otherTestCommentId", ' +
        '                "text":"Other test comment", ' +
        '                "snowMark":2,"sunMark":3 ' +
        '            } ' +
        '        ] ' +
        '    }, ' +
        '    {   "id":"otherTestPisteId", ' +
        '        "color":"green", ' +
        '        "name":"Other Test Piste", ' +
        '        "description": "An other piste just for unit testing purposes", ' +
        '        "picture":"img/pistes/test.jpg", ' +
        '        "comments":[ ' +
        '            {   "id":"yetAnOtherTestCommentId", ' +
        '                "text":"Yet an other test comment", ' +
        '                "snowMark":0, ' +
        '                "sunMark":5 ' +
        '            } ' +
        '        ] ' +
        '    } ' +
        ']}';
    var deserialized = JSON.parse(jsonStr);
    var repo = new mbp.LocalResortRepository();
    var actual = repo.createResort(deserialized);
    equal(actual.id, 'testResortId');
    equal(actual.name, 'Test Resort');
    equal(actual.country, 'Test Country');
    equal(actual.massif, 'Test Massif');
    ok(actual.getPiste(actual.getPistesIds()[0]));
    ok(actual.getPiste(actual.getPistesIds()[1]));
    
    // This will fail if properties count change (but deserialization is most likely to be changed too)
    equal(mbp.testUtil.countProperties(actual), 4); 
});
test('createDeserializedPiste', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    var deserialized = fixture.repo.createDeserializedPiste(fixture.piste);
    //all public properties + comments array
    equal(mbp.testUtil.countProperties(deserialized), mbp.testUtil.countProperties(fixture.piste) + 1);
    equal(deserialized.comments.length, 2);
    equal(mbp.testUtil.countProperties(deserialized.comments[0]), mbp.testUtil.countProperties(fixture.comment));
    equal(mbp.testUtil.countProperties(deserialized.comments[1]), mbp.testUtil.countProperties(fixture.otherComment));
});
test('createDeserializedResort', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    var deserialized = fixture.repo.createDeserializedResort(fixture.resort);
    //all public properties + pistes array
    equal(mbp.testUtil.countProperties(deserialized), mbp.testUtil.countProperties(fixture.resort) + 1);
    equal(deserialized.pistes.length, 2);
    equal(mbp.testUtil.countProperties(deserialized.pistes[0]), mbp.testUtil.countProperties(fixture.piste) + 1);
    equal(mbp.testUtil.countProperties(deserialized.pistes[1]), mbp.testUtil.countProperties(fixture.otherPiste) + 1);
    equal(deserialized.pistes[0].comments.length + deserialized.pistes[1].comments.length, 3);
});
test('save() inserts a record in local storage', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    equal(localStorage.length, 3);
    ok(localStorage.getItem('mbp.Resort.' + fixture.resort.id));
    ok(localStorage.getItem('mbp.Resorts.mbc'));
    ok(localStorage.getItem('mbp.Resorts.rbm'));
});
test('addToMassifsByCountryIndex() creates a fresh array of massifs if country is not indexed yet', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Test Country":["Test Massif"]}');
});
test('addToMassifsByCountryIndex() appends to massifs array if country is already indexed', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToMassifsByCountryIndex(fixture.resort);
    fixture.resort.massif = 'Other Massif';
    fixture.repo.addToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Test Country":["Test Massif","Other Massif"]}');
});
test('addToMassifsByCountryIndex() does nothing if massif is already indexed in country', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Test Country":["Test Massif"]}');
    fixture.repo.addToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Test Country":["Test Massif"]}');
});
test('addToResortsByMassifIndex() creates a fresh map of resorts if massif is not indexed yet', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToResortsByMassifIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Test Massif":{"testResortId":"Test Resort"}}');
});
test('addToResortsByMassifIndex() appends to resorts array if massif is already indexed', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToResortsByMassifIndex(fixture.resort);
    fixture.repo.addToResortsByMassifIndex(new mbp.Resort('otherResortId', 'Other Resort', 'Test Country', 'Test Massif'));
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Test Massif":{"testResortId":"Test Resort","otherResortId":"Other Resort"}}');
});
test('addToResortsByMassifIndex() updates resort name if resort is already indexed in massif', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addToResortsByMassifIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Test Massif":{"testResortId":"Test Resort"}}');
    fixture.resort.name = 'Other Resort';
    fixture.repo.addToResortsByMassifIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Test Massif":{"testResortId":"Other Resort"}}');
});
test('clear() flushes Resort records and indexes', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    fixture.repo.clear();
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{}');
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{}');
    ok(!localStorage.getItem('mbp.Resort.testResortId'));
});
test('getCountries()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    var actual = fixture.repo.getCountries();
    equal(actual.length, 1);
    equal(actual[0], 'Test Country');
});
test('getMassifs()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    var actual = fixture.repo.getMassifs('Test Country');
    equal(actual.length, 1);
    equal(actual[0], 'Test Massif');
    
    actual = fixture.repo.getMassifs(undefined);
    equal(actual.length, 0);
});
test('getRessorts()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.save(fixture.resort);
    var actual = fixture.repo.getRessorts('Test Massif');
    equal(Object.keys(actual).length, 1);
    equal(actual['testResortId'], 'Test Resort');
    
    actual = fixture.repo.getRessorts(undefined);
    equal(Object.keys(actual).length, 0);
});