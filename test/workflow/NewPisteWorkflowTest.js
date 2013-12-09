"use strict";

var resortRepo = null, app = null, errors = null;

module("NewPisteWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        var resorts = new mbp.TestCase().getResorts();
        /** @type mbp.Resort */
        var resort = resorts[Object.keys(resorts)[0]];
        resortRepo = new mbp.LocalResortRepository();
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
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        resortRepo.clear();
    }
});
test("activate() displays new piste form as content if user is authenticated", function() {
    var wf = new mbp.NewPisteWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #new-piste-form').html());
});
test("activate() displays authentication widget as content if user is not authenticated", function() {
    app.user.sessionId = null;
    var wf = new mbp.NewPisteWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate();
    ok(jQuery('div[data-role="content"] #login-form').html());
});
test("pisteCreated() displays piste detail widget as content if piste is valid", function() {
    var wf = new mbp.NewPisteWorkflow(app);
    var newPiste = new mbp.Piste('testPisteId', null, new mbp.Resort(), null, 'Test Piste', null, null, null, new mbp.PisteMarks());
    ok(!jQuery('div[data-role="content"]').html());
    wf.pisteCreated(newPiste);
    equal(jQuery('div[data-role="content"] h2').html(), '<img src="icon/-18.png"> Test Piste');
});