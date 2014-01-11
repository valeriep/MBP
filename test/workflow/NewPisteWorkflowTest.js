"use strict";

var resortRepo = null, errors = null;

module("NewPisteWorkflow", {
    setup : function() {
        jQuery('#content').empty();
        var resorts = new mbp.TestCase().getResorts();
        /** @type mbp.Resort */
        var resort = resorts[Object.keys(resorts)[0]];
        resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resort);
        app.user = new mbp.User('U1', 'Ch4mp', null, 'testSessionId');
        app.device.getPicture = function() {
            return 'test/img/piste/testPiste1.jpg';
        };
        app.syncService.run = function() {
        };
    },
    teardown : function() {
        jQuery('#content').empty();
        resortRepo.clear();
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays new piste form as content if user is authenticated", function() {
    var wf = new mbp.NewPisteWorkflow();
    ok(!jQuery('#content').html());
    wf.activate();
    ok(jQuery('#content #new-piste-form').html());
});
test("activate() displays authentication widget as content if user is not authenticated", function() {
    app.user.sessionId = null;
    var wf = new mbp.NewPisteWorkflow();
    ok(!jQuery('#content').html());
    wf.activate();
    ok(jQuery('#content #login-form').html());
});
test("pisteCreated() displays piste detail widget as content if piste is valid", function() {
    var wf = new mbp.NewPisteWorkflow();
    var newPiste = new mbp.Piste('testPisteId', null, new mbp.Resort(), null, 'Test Piste', null, null, null, new mbp.PisteMarks());
    ok(!jQuery('#content').html());
    wf.pisteCreated(newPiste);
    equal(jQuery('#content h2').html(), '<img src="icon/-18.png"> Test Piste');
});