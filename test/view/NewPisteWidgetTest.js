"use strict";

var testNewPisteSubmitted = function() {
    ok(true);
};

var app = null;
var errors = null;

module('NewPisteWidget', {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resorts = new mbp.TestCase().getResorts();
        /** @type mbp.Resort */
        var resort = resorts[Object.keys(resorts)[0]];
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resort);
        app = {
            user : new mbp.User('U1', 'Ch4mp', null, 'testSessionId'),
            device : {
                getPicture : function() {
                    return 'test/img/piste/testPiste1.jpg';
                }
            },
            services : {
                resortsSyncService : {
                    run : function() {
                    }
                },
                resortRepo : resortRepo,
                localResortRepo : resortRepo,
                seolanResortRepo : resortRepo,
            }
        };
        errors = {};
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("validateCountry() doesn't modify errors if country name is not empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateCountry('Test', errors);
    ok(!actual.hasOwnProperty('country'));
});
test("validateCountry() fills errors if country name is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateCountry('', errors);
    ok(actual.hasOwnProperty('country'));
});
test("validateArea() doesn't modify errors if area name is not empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateArea('Test', errors);
    ok(!actual.hasOwnProperty('area'));
});
test("validateArea() fills errors if area name is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateArea('', errors);
    ok(actual.hasOwnProperty('area'));
});
test("validateResort() doesn't modify errors if resort id is not empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateResort('testResortId', new mbp.Resort('testResortId'), errors);
    ok(!actual.hasOwnProperty('resort'));
});
test("validateResort() fills errors if resort id is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateResort('', new mbp.Resort('testResortId'), errors);
    ok(actual.hasOwnProperty('resort'));
});
test("validateName() doesn't modify errors if piste name is not empty and not already used in the resort", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateName('Test', new mbp.Resort('testResortId'), errors);
    ok(!actual.hasOwnProperty('name'));
});
test("validateName() fills errors if piste name is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateName('', new mbp.Resort('testResortId'), errors);
    ok(actual.hasOwnProperty('name'));
});
test("validateColor() doesn't modify errors if color is not empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateColor(mbp.Piste.BLACK, errors);
    ok(!actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateColor('', errors);
    ok(actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is not one of Piste colors", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateColor('taupe', errors);
    ok(actual.hasOwnProperty('color'));
});
test("validateNewPiste() doesn't modify errors if new piste is valid", function() {
    var widget = new mbp.NewPisteWidget(app);
    var resort = new mbp.Resort(
            'resortId',
            'Test Resort',
            'country',
            'area');
    var newPiste = new mbp.NewPiste('country', 'area', resort.id, 'name', mbp.Piste.BLACK, 'description', 'keywordsString', 'picture');
    var actual = widget.validateNewPiste(newPiste, resort);
    var cnt = 0, i = null;
    for (i in actual) {
        cnt += 1;
    }
    equal(cnt, 0);
});
test("validateNewPiste() fills errors if piste name is empty", function() {
    var widget = new mbp.NewPisteWidget(app);
    var actual = widget.validateNewPiste(new mbp.NewPiste());
    ok(actual.hasOwnProperty('country'));
    ok(actual.hasOwnProperty('area'));
    ok(actual.hasOwnProperty('resort'));
    ok(actual.hasOwnProperty('name'));
    ok(actual.hasOwnProperty('color'));
});
test('New piste form is diplayed in content div', function() {
    var widget = new mbp.NewPisteWidget(app);
    widget.display(new Array('Country 1', 'Country 2', 'Country 3'));
    ok(jQuery('div[data-role="content"]').html());
});