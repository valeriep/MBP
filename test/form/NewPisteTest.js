"use strict";

module("NewPiste", {
    setup : function() {
        app = {
            localPisteRepo : {
                getPistesByCriteria : function(criteria, onPistesRetrieved) {
                    onPistesRetrieved(new Array());
                }
            }
        };
    },
    teardown : function() {
        app = new mbp.MyBestPistes();
    }
});
test("validateResort() doesn't modify errors if resort id is not empty", function() {
    var newPiste = new mbp.NewPiste('C1_M1_R1');
    newPiste.validateResort();
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('resort'));
});
test("validateResort() fills errors if resort id is empty", function() {
    var newPiste = new mbp.NewPiste('');
    newPiste.validateResort();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('resort'));
});
test("validateName() doesn't modify errors if piste name is not empty and not already used in the resort", function() {
    var newPiste = new mbp.NewPiste('', 'Test');
    newPiste.validateName();
    var actual = newPiste.getErrors();
    ok(!actual.hasOwnProperty('name'));
});
test("validateName() fills errors if piste name is empty", function() {
    var newPiste = new mbp.NewPiste();
    newPiste.validateName();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('name'));
});
test("validateColor() doesn't modify errors if color is not empty", function() {
    var newPiste = new mbp.NewPiste('', 'Test', mbp.Piste.BLACK);
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
    var newPiste = new mbp.NewPiste('', 'Test', 'taupe');
    newPiste.validateColor();
    var actual = newPiste.getErrors();
    ok(actual.hasOwnProperty('color'));
});
test("validateNewPiste() doesn't modify errors if new piste is valid", function() {
    var newPiste = new mbp.NewPiste('testResortId', 'name', mbp.Piste.BLACK, 'description');
    var actual = newPiste.validate();
    equal(Object.keys(actual).length, 0);
});
test("validateNewPiste() fills errors if piste properties are invalid", function() {
    var newPiste = new mbp.NewPiste();
    var actual = newPiste.validate();
    ok(actual.hasOwnProperty('resort'));
    ok(actual.hasOwnProperty('name'));
    ok(actual.hasOwnProperty('color'));
});