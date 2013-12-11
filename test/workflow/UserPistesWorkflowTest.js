"use strict";

module("UserPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
        app = new mbp.MyBestPistes();
        app.device.isConnected = function() {
            return false;
        };
        app.resortsSyncService.run = function() {};
        app.user = new mbp.User('U1', 'ch4mp', null, 'test');
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.UserPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"]').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.UserPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(undefined);
    ok(jQuery('div[data-role="content"]').html());
});