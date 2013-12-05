"use strict";

var newPisteWorkflowTestFixture = null;
var resortRepo = mbp.LocalResortRepository.getInstance();
var resorts = new mbp.TestCase().getResorts();
/** @type mbp.Resort */
var resort = resorts[Object.keys(resorts)[0]];

module("NewPisteWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        resortRepo.clear();
        resortRepo.saveResort(resort);
        newPisteWorkflowTestFixture = {
            app : {
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
                    }
                }
            },
            errors : {},
            newPiste : new mbp.NewPiste(
                    resort.country,
                    resort.area,
                    resort.id,
                    'Test Piste',
                    mbp.Piste.BLACK,
                    'A test piste description',
                    'test piste resort area country',
                    'img/piste/testPiste1.jpg')
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        resortRepo.clear();
    }
});
test("validateCountry() doesn't modify errors if country name is not empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateCountry(newPisteWorkflowTestFixture.newPiste.country, newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('country'));
});
test("validateCountry() fills errors if country name is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateCountry('', newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('country'));
});
test("validateArea() doesn't modify errors if area name is not empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateArea(newPisteWorkflowTestFixture.newPiste.area, newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('area'));
});
test("validateArea() fills errors if area name is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateArea('', newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('area'));
});
test("validateResort() doesn't modify errors if resort id is not empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateResort(newPisteWorkflowTestFixture.newPiste.resortId, new mbp.Resort('testResortId'), newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('resort'));
});
test("validateResort() fills errors if resort id is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateResort('', new mbp.Resort('testResortId'), newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('resort'));
});
test("validateName() doesn't modify errors if piste name is not empty and not already used in the resort", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateName(newPisteWorkflowTestFixture.newPiste.name, new mbp.Resort('testResortId'), newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('name'));
});
test("validateName() fills errors if piste name is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateName('', new mbp.Resort('testResortId'), newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('name'));
});
test("validateColor() doesn't modify errors if color is not empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateColor(newPisteWorkflowTestFixture.newPiste.color, newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateColor('', newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('color'));
});
test("validateColor() fills errors if color is not one of Piste colors", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateColor('taupe', newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('color'));
});
test("validateNewPiste() doesn't modify errors if new piste is valid", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var resort = new mbp.Resort(
            newPisteWorkflowTestFixture.newPiste.resortId,
            'Test Resort',
            newPisteWorkflowTestFixture.newPiste.country,
            newPisteWorkflowTestFixture.newPiste.area);
    var actual = wf.validateNewPiste(newPisteWorkflowTestFixture.newPiste, resort);
    var cnt = 0, i = null;
    for (i in actual) {
        cnt += 1;
    }
    equal(cnt, 0);
});
test("validateNewPiste() fills errors if piste name is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateNewPiste(new mbp.NewPiste());
    ok(actual.hasOwnProperty('country'));
    ok(actual.hasOwnProperty('area'));
    ok(actual.hasOwnProperty('resort'));
    ok(actual.hasOwnProperty('name'));
    ok(actual.hasOwnProperty('color'));
});
test("activate() displays new piste form as content if user is authenticated", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #new-piste-form').html());
});
test("activate() displays authentication widget as content if user is not authenticated", function() {
    newPisteWorkflowTestFixture.app.user.sessionId = null;
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"] #login-form').html());
});
test("submit() displays piste detail widget as content if piste is valid", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    wf.submit(newPisteWorkflowTestFixture.newPiste, newPisteWorkflowTestFixture.errors);
    equal(jQuery('div[data-role="content"] h2').html(), 'Test Piste');
});