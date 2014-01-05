"use strict";

var testCase;

module('LocalResortRepository', {
    setup : function() {
        testCase = {};
        localStorage.clear();
        testCase.repo = new mbp.LocalResortRepository();
        testCase.resort = new mbp.Resort();
        testCase.resort.id = 'testResortId';
        testCase.resort.lastUpdate = '42';
        testCase.resort.country = 'Country 1';
        testCase.resort.area = 'Area 1';
        testCase.resort.name = 'Test Resort';
        testCase.resort.lat = 44.4098;
        testCase.resort.lng = 6.351;
    },
    teardown : function() {
        localStorage.clear();
    }
});
test('setCountries() inserts records in areasByCountryIdx and stores it in localStorage', function() {
    testCase.repo.setCountries(new Array('Country 1', 'Country 2'));
    equal(localStorage.length, 1);
    equal(localStorage.getItem('mbp.Resorts.abc'), '{"Country 1":[],"Country 2":[]}');
});
test('setCountries() removes deprecated countries', function() {
    testCase.repo.setCountries(new Array('Country 1', 'Country 2'));
    testCase.repo.setCountries(new Array('Country 1', 'Country 3'));
    equal(localStorage.getItem('mbp.Resorts.abc'), '{"Country 1":[],"Country 3":[]}');
});
test('getAllCountries()', function() {
    testCase.repo.setCountries(new Array('Country 1', 'Country 2'));
    testCase.repo.getAllCountries(function(actual) {
        deepEqual(actual, new Array('Country 1', 'Country 2'));
    });
});
test('setAreas() inserts records in resortNamesByAreaIdx (and in areasByCountryIdx if country does not exist) and stores it in localStorage', function() {
    testCase.repo.setCountries(new Array('Country 1', 'Country 2'));
    testCase.repo.setAreas('Country 1', new Array('Area 1', 'Area 2'));
    testCase.repo.setAreas('Country 3', new Array('Area 1', 'Area 3'));
    equal(localStorage.getItem('mbp.Resorts.abc'),
            '{"Country 1":["Area 1","Area 2"],"Country 2":[],"Country 3":["Area 1","Area 3"]}');
    equal(localStorage.getItem('mbp.Resorts.rba'), '{"Area 1":{},"Area 2":{},"Area 3":{}}');
});
test('setAreas() removes deprecated areas', function() {
    testCase.repo.setAreas('Country 1', new Array('Area 1', 'Area 2'));
    testCase.repo.setAreas('Country 1', new Array('Area 1', 'Area 3'));
    equal(localStorage.getItem('mbp.Resorts.abc'), '{"Country 1":["Area 1","Area 3"]}');
    equal(localStorage.getItem('mbp.Resorts.rba'), '{"Area 1":{},"Area 3":{}}');
});
test('getAreasByCountry()', function() {
    testCase.repo.setAreas('Country 1', new Array('Area 1', 'Area 2'));
    testCase.repo.setAreas('Country 3', new Array('Area 1', 'Area 3'));
    testCase.repo.getAreasByCountry('Country 1', function(actual) {
        deepEqual(actual, new Array('Area 1', 'Area 2'));
    });
});
test('saveResort() inserts a record in local storage and in indexes', function() {
    testCase.repo.saveResort(testCase.resort);
    equal(localStorage.length, 3);
    equal(localStorage.getItem('mbp.Resort.' + testCase.resort.id),
            '{"id":"testResortId","lastUpdate":"42","name":"Test Resort","country":"Country 1","area":"Area 1","lat":44.4098,"lng":6.351}');
    equal(localStorage.getItem('mbp.Resorts.abc'), '{"Country 1":["Area 1"]}');
    equal(localStorage.getItem('mbp.Resorts.rba'), '{"Area 1":{"testResortId":"Test Resort"}}');
});
test('getResortById()', function() {
    testCase.repo.saveResort(testCase.resort);
    testCase.repo.getResortById(testCase.resort.id, function(actual) {
        deepEqual(actual, testCase.resort);
    });
});
test('getResortsByArea()', function() {
    var other = new mbp.Resort(testCase.resort), yetAnother = new mbp.Resort(testCase.resort);
    other.id = 'other';
    other.name = 'Other Test Resort';
    yetAnother.id = 'yetAnother';
    yetAnother.area = 'Area 2';
    yetAnother.name = 'Yet Another Test Resort';
    testCase.repo.saveResort(testCase.resort);
    testCase.repo.saveResort(other);
    testCase.repo.saveResort(yetAnother);

    testCase.repo.getResortsByArea(testCase.resort.area, function(actual) {
        deepEqual(actual[0], other);
        deepEqual(actual[1], testCase.resort);
    });
});
test('getAllResorts()', function() {
    var other = new mbp.Resort(testCase.resort), yetAnother = new mbp.Resort(testCase.resort);
    other.id = 'other';
    other.name = 'Other Test Resort';
    yetAnother.id = 'yetAnother';
    yetAnother.area = 'Area 2';
    yetAnother.name = 'Yet Another Test Resort';
    testCase.repo.saveResort(testCase.resort);
    testCase.repo.saveResort(other);
    testCase.repo.saveResort(yetAnother);

    testCase.repo.getResortsByArea(testCase.resort.area, function(actual) {
        deepEqual(actual[0], other);
        deepEqual(actual[1], testCase.resort);
        deepEqual(actual[2], yetAnother.resort);
    });
});
test('getResortNamesByArea()', function() {
    var other = new mbp.Resort(testCase.resort), yetAnother = new mbp.Resort(testCase.resort);
    other.id = 'other';
    other.name = 'Other Test Resort';
    yetAnother.id = 'yetAnother';
    yetAnother.area = 'Area 2';
    yetAnother.name = 'Yet Another Test Resort';
    testCase.repo.saveResort(testCase.resort);
    testCase.repo.saveResort(other);
    testCase.repo.saveResort(yetAnother);

    testCase.repo.getResortNamesByArea(testCase.resort.area, function(actual) {
        deepEqual(actual, {
            'testResortId' : 'Test Resort',
            'other' : 'Other Test Resort'
        });
    });
});
test('removeResort()', function() {
    testCase.repo.saveResort(testCase.resort);
    testCase.repo.removeResort(testCase.resort.id);
    equal(localStorage.length, 2);
    equal(localStorage.getItem('mbp.Resorts.abc'), '{"Country 1":["Area 1"]}');
    equal(localStorage.getItem('mbp.Resorts.rba'), '{"Area 1":{}}');
});