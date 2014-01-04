"use strict";

module("Resort");
test('constructor with no argument', function() {
    var resort = new mbp.Resort();
    equal(resort.id, null);
    equal(resort.lastUpdate, null);
    equal(resort.country, null);
    equal(resort.area, null);
    equal(resort.name, null);
    equal(resort.lat, null);
    equal(resort.lng, null);
});
test('copy and orignal are independent', function() {
    var original = new mbp.Resort();
    original.id = 'testResortId';
    original.lastUpdate = '42';
    original.country = 'testCountry';
    original.area = 'testArea';
    original.name = 'Test Resort';
    original.lat = 44.4098;
    original.lng = 6.351;

    var resort = new mbp.Resort(original);
    equal(resort.id, 'testResortId');
    equal(resort.lastUpdate, '42');
    equal(resort.country, 'testCountry');
    equal(resort.area, 'testArea');
    equal(resort.name, 'Test Resort');
    equal(resort.lat, 44.4098);
    equal(resort.lng, 6.351);
    
    original.id = null;
    original.lastUpdate = null;
    original.country = null;
    original.area = null;
    original.name = null;
    original.lat = null;
    original.lng = null;

    equal(resort.id, 'testResortId');
    equal(resort.lastUpdate, '42');
    equal(resort.country, 'testCountry');
    equal(resort.area, 'testArea');
    equal(resort.name, 'Test Resort');
    equal(resort.lat, 44.4098);
    equal(resort.lng, 6.351);
});
test('compareNames returns 0 when resorts have same name case excepted', function() {
	var a = new mbp.Resort(), b = new mbp.Resort();
	
	a.name = 'test resort';
	b.name = 'Test Resort';
	strictEqual(mbp.Resort.compareNames(a, b), 0);
});
test('compareNames returns -1 when first resort name is lower than second one (alphabetic order case excepted)', function() {
	var a = new mbp.Resort(), b = new mbp.Resort();
	
	a.name = 'resort';
	b.name = 'Test Resort';
	strictEqual(mbp.Resort.compareNames(a, b), -1);
});
test('compareNames returns 1 when first resort name is higher than second one (alphabetic order case excepted)', function() {
	var a = new mbp.Resort(), b = new mbp.Resort();
	
	a.name = 'test resort';
	b.name = 'Resort';
	strictEqual(mbp.Resort.compareNames(a, b), 1);
});