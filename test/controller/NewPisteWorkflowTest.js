"use strict";

var newPisteWorkflowTestFixture = null;

module("NewPisteWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        newPisteWorkflowTestFixture = {
            app : {
                user : new mbp.User('Ch4mp', null, 'testSessionId'),
                device : {
                    getPicture : function() {
                        return 'test/img/piste/testPiste1.jpg';
                    }
                }
            },
            errors : {},
            newPiste : new mbp.NewPiste('Test Country', 'Test Massif', 'testResortId', 'Test Piste', mbp.Piste.BLACK, 'A test piste description',
                    'test piste resort massif country', 'img/piste/testPiste1.jpg')
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
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
test("validateMassif() doesn't modify errors if massif name is not empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateMassif(newPisteWorkflowTestFixture.newPiste.massif, newPisteWorkflowTestFixture.errors);
    ok(!actual.hasOwnProperty('massif'));
});
test("validateMassif() fills errors if massif name is empty", function() {
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    var actual = wf.validateMassif('', newPisteWorkflowTestFixture.errors);
    ok(actual.hasOwnProperty('massif'));
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
    var resort = new mbp.Resort(newPisteWorkflowTestFixture.newPiste.resortId, 'Test Resort', newPisteWorkflowTestFixture.newPiste.country, newPisteWorkflowTestFixture.newPiste.massif);
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
    ok(actual.hasOwnProperty('massif'));
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
test("activate() displays authentication Widget as content if user is not authenticated", function() {
    newPisteWorkflowTestFixture.app.user.sessionId = null;
    var wf = new mbp.NewPisteWorkflow(newPisteWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"] #login-form').html());
});