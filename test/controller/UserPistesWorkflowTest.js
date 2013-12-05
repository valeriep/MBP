"use strict";

var app;

module("UserPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        app = {
            device : {
                isConnected : function() {
                    return false;
                }
            },
            user : new mbp.User('U1', 'ch4mp', null, 'test')
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.UserPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"]').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.UserPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(undefined);
    ok(jQuery('div[data-role="content"]').html());
});