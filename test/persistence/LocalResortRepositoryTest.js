"use strict";

var testResorts = null, resort = null, repo = null;

mbp.testUtil = {
    countProperties : function(obj) {
        var attribCnt = 0, i = null;
        for (i in obj) {
            if (typeof obj[i] != 'function') {
                attribCnt++;
            }
        }
        return attribCnt;
    }
};

module('LocalResortRepository', {
    setup : function() {
        repo = new mbp.LocalResortRepository();
        repo.clear();
        localStorage.clear();
        testResorts = new mbp.TestCase().getResorts();
        resort = testResorts[Object.keys(testResorts)[0]];
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('save() inserts a record in local storage', function() {
    repo.saveResort(resort);
    equal(localStorage.length, 4);
    ok(localStorage.getItem('mbp.Resort.' + resort.id));
    ok(localStorage.getItem('mbp.Resorts.mbc'));
    ok(localStorage.getItem('mbp.Resorts.rbc'));
    ok(localStorage.getItem('mbp.Resorts.rbm'));
});
test('addResortToAreasByCountryIndex() creates a fresh array of areas if country is not indexed yet', function() {
    repo.addResortToAreasByCountryIndex(resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Area 1"]}');
});
test('addResortToAreasByCountryIndex() appends to areas array if country is already indexed', function() {
    repo.addResortToAreasByCountryIndex(testResorts[Object.keys(testResorts)[0]]);
    repo.addResortToAreasByCountryIndex(testResorts[Object.keys(testResorts)[1]]);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Area 1","Area 2"]}');
});
test('addResortToAreasByCountryIndex() does nothing if area is already indexed in country', function() {
    repo.addResortToAreasByCountryIndex(resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Area 1"]}');
    repo.addResortToAreasByCountryIndex(resort);
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Area 1"]}');
});
test('addResortToResortsByAreaIndex() creates a fresh map of resorts if area is not indexed yet', function() {
    repo.addResortToResortsByAreaIndex(resort);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Area 1":{"C1_M1_R1":"Resort 1"}}');
});
test('addResortToResortsByAreaIndex() appends to resorts array if area is already indexed', function() {
    repo.addResortToResortsByAreaIndex(testResorts[Object.keys(testResorts)[0]]);
    repo.addResortToResortsByAreaIndex(testResorts[Object.keys(testResorts)[2]]);
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{"Area 1":{"C1_M1_R1":"Resort 1","C2_M1_R3":"Resort 3"}}');
});
test('clear() flushes Resort records and indexes', function() {
    repo.saveResort(resort);
    repo.clear();
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{}');
    equal(localStorage.getItem('mbp.Resorts.rbc'), '{}');
    equal(localStorage.getItem('mbp.Resorts.rbm'), '{}');
    ok(!localStorage.getItem('mbp.Resort.C1_M1_R1'));
});
test('getCountries()', function() {
    repo.setCountries(new Array('Country 1', 'Country 2'));
    repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 2'));
    });
});
test('setCountries() removes deprecated countries', function() {
    repo.setCountries(new Array('Country 1', 'Country 2'));
    repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 2'));
    });
    repo.setCountries(new Array('Country 1', 'Country 3'));
    repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 3'));
    });
    equal(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":[],"Country 3":[]}');
    equal(localStorage.getItem('mbp.Resorts.rbc'), '{"Country 1":{},"Country 3":{}}');
});
test('getAllAreas()', function() {
    repo.saveResort(testResorts[Object.keys(testResorts)[0]]);
    repo.saveResort(testResorts[Object.keys(testResorts)[1]]);
    repo.getAllAreas(function(actual) {
        deepEqual(actual, new Array('Area 1', 'Area 2'));
    });
});
test('getAreasByCountry()', function() {
    repo.saveResort(testResorts[Object.keys(testResorts)[0]]);
    repo.saveResort(testResorts[Object.keys(testResorts)[1]]);
    repo.getAreasByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Area 1', 'Area 2'));
    });
});
test('setAreas()', function() {
    repo.setAreas('Country 1', new Array('Area 1', 'Area 2'));
    repo.getAreasByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Area 1', 'Area 2'));
    });
    repo.setAreas('Country 1', new Array('Area 1', 'Area 3'));
    repo.getAreasByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Area 1', 'Area 3'));
    });
    deepEqual(localStorage.getItem('mbp.Resorts.mbc'), '{"Country 1":["Area 1","Area 3"]}');
    deepEqual(localStorage.getItem('mbp.Resorts.rbc'), '{"Country 1":{}}');
    deepEqual(localStorage.getItem('mbp.Resorts.rbm'), '{"Area 1":{},"Area 3":{}}');
});