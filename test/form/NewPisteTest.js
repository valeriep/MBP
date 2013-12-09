"use strict";

module("NewPiste");
test("validateCountry() doesn't modify errors if country name is not empty", function() {
    var newPiste = new mbp.NewPiste('Test');
    newPiste.validateCountry();
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('country'));
});
test("validateCountry() fills errors if country name is empty", function() {
    var newPiste = new mbp.NewPiste('');
    newPiste.validateCountry();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('country'));
});
test("validateArea() doesn't modify errors if area name is not empty", function() {
    var newPiste = new mbp.NewPiste('', 'Test');
    newPiste.validateArea();
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('area'));
});
test("validateArea() fills errors if area name is empty", function() {
    var newPiste = new mbp.NewPiste();
    newPiste.validateArea();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('area'));
});
test("validateResort() doesn't modify errors if resort id is not empty", function() {
    var newPiste = new mbp.NewPiste('', '', 'testResortId');
    newPiste.validateResort(new mbp.Resort('testResortId'));
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('resort'));
});
test("validateResort() fills errors if resort id is empty", function() {
    var newPiste = new mbp.NewPiste();
    newPiste.validateResort(new mbp.Resort('testResortId'));
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('resort'));
});
test("validateName() doesn't modify errors if piste name is not empty and not already used in the resort", function() {
    var newPiste = new mbp.NewPiste('', '', '', 'Test');
    newPiste.validateName(new mbp.Resort('testResortId'));
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('name'));
});
test("validateName() fills errors if piste name is empty", function() {
    var newPiste = new mbp.NewPiste();
    newPiste.validateName(new mbp.Resort('testResortId'));
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('name'));
});
test("validateColor() doesn't modify errors if color is not empty", function() {
    var newPiste = new mbp.NewPiste('', '', '', 'Test', mbp.Piste.BLACK);
    newPiste.validateColor();
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is empty", function() {
    var newPiste = new mbp.NewPiste();
    newPiste.validateColor();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is not one of Piste colors", function() {
    var newPiste = new mbp.NewPiste('', '', '', 'Test', 'taupe');
    newPiste.validateColor();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('color'));
});
test("validateNewPiste() doesn't modify errors if new piste is valid", function() {
    var resort = new mbp.Resort(
            'resortId',
            'Test Resort',
            'country',
            'area');
    var newPiste = new mbp.NewPiste('country', 'area', resort.id, 'name', mbp.Piste.BLACK, 'description', 'picture');
    var actual = newPiste.validate(resort);
    var cnt = 0, i = null;
    for (i in actual) {
        cnt += 1;
    }
    equal(cnt, 0);
});
test("validateNewPiste() fills errors if piste properties are invalid", function() {
    var newPiste = new mbp.NewPiste();
    var actual = newPiste.validate(new mbp.Resort());
    ok(actual.hasOwnProperty('country'));
    ok(actual.hasOwnProperty('area'));
    ok(actual.hasOwnProperty('resort'));
    ok(actual.hasOwnProperty('name'));
    ok(actual.hasOwnProperty('color'));
});