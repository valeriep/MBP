"use strict";

var testResorts = new mbp.TestCase().getResorts();

mbp.LocalResortRepositoryTestFixture = function() {
    this.repo = new mbp.LocalResortRepository();
    this.resort = testResorts[Object.keys(testResorts)[0]];
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
test('save() inserts a record in local storage', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.saveResort(fixture.resort);
    equal(localStorage.length, 4);
    ok(localStorage.getItem('mbp.Resort.' + fixture.resort.id));
    ok(localStorage.getItem('mbp.Resorts.mbc'));
    ok(localStorage.getItem('mbp.Resorts.rbc'));
    ok(localStorage.getItem('mbp.Resorts.rbm'));
});
test('addResortToMassifsByCountryIndex() creates a fresh array of massifs if country is not indexed yet', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addResortToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Massif 1"]}');
});
test('addResortToMassifsByCountryIndex() appends to massifs array if country is already indexed', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addResortToMassifsByCountryIndex(testResorts[Object.keys(testResorts)[0]]);
    fixture.repo.addResortToMassifsByCountryIndex(testResorts[Object.keys(testResorts)[1]]);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Massif 1","Massif 2"]}');
});
test('addResortToMassifsByCountryIndex() does nothing if massif is already indexed in country', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addResortToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Massif 1"]}');
    fixture.repo.addResortToMassifsByCountryIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Massif 1"]}');
});
test('addResortToResortsByMassifIndex() creates a fresh map of resorts if massif is not indexed yet', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addResortToResortsByMassifIndex(fixture.resort);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Massif 1":{"C1_M1_R1":"Resort 1"}}');
});
test('addResortToResortsByMassifIndex() appends to resorts array if massif is already indexed', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.addResortToResortsByMassifIndex(testResorts[Object.keys(testResorts)[0]]);
    fixture.repo.addResortToResortsByMassifIndex(testResorts[Object.keys(testResorts)[2]]);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Massif 1":{"C1_M1_R1":"Resort 1","C2_M1_R3":"Resort 3"}}');
});
test('clear() flushes Resort records and indexes', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.saveResort(fixture.resort);
    fixture.repo.clear();
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{}');
    equal(localStorage.getItem('mbp.Resorts.rbc'), '{}');
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{}');
    ok(!localStorage.getItem('mbp.Resort.C1_M1_R1'));
});
test('getCountries()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.setCountries(new Array('Country 1', 'Country 2'));
    fixture.repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 2'));
    });
});
test('setCountries() removes deprecated countries', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.setCountries(new Array('Country 1', 'Country 2'));
    fixture.repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 2'));
    });
    fixture.repo.setCountries(new Array('Country 1', 'Country 3'));
    fixture.repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 3'));
    });
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":[],"Country 3":[]}');
    equal(localStorage.getItem('mbp.Resorts.rbc'), '{"Country 1":{},"Country 3":{}}');
});
test('getAllMassifs()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.saveResort(testResorts[Object.keys(testResorts)[0]]);
    fixture.repo.saveResort(testResorts[Object.keys(testResorts)[1]]);
    fixture.repo.getAllMassifs(function(actual) {
        deepEqual(actual, new Array('Massif 1', 'Massif 2'));
    });
});
test('getMassifsByCountry()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.saveResort(testResorts[Object.keys(testResorts)[0]]);
    fixture.repo.saveResort(testResorts[Object.keys(testResorts)[1]]);
    fixture.repo.getMassifsByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Massif 1', 'Massif 2'));
    });
});
test('setMassifs()', function() {
    var fixture = new mbp.LocalResortRepositoryTestFixture();
    fixture.repo.setMassifs('Country 1', new Array('Massif 1', 'Massif 2'));
    fixture.repo.getMassifsByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Massif 1', 'Massif 2'));
    });
    fixture.repo.setMassifs('Country 1', new Array('Massif 1', 'Massif 3'));
    fixture.repo.getMassifsByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Massif 1', 'Massif 3'));
    });
    deepEqual(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Massif 1","Massif 3"]}');
    deepEqual(localStorage.getItem('mbp.Resorts.rbc'), '{"Country 1":{}}');
    deepEqual(localStorage.getItem('mbp.Resorts.rbm'), '{"Massif 1":{},"Massif 3":{}}');
});