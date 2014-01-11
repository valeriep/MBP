"use strict";

var settingsWorkflowTestFixture = null;

module("SettingsWorkflow", {
    setup : function() {
        jQuery('#content').empty();
        app.user = new mbp.User('U1', 'Ch4mp', null, 'testSessionId');
        app.device.isOnline = function() {
            return true;
        };
        app.device.refreshPosition = function() {
        };
    },
    teardown : function() {
        jQuery('#content').empty();
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays settings Widget as content if user is authenticated", function() {
    var wf = new mbp.SettingsWorkflow(app);
    ok(!jQuery('#content').html());
    wf.activate(testPistes);
    ok(jQuery('#content p').html());
});
test("activate() displays login Widget as content if user is not authenticated", function() {
    app.user.sessionId = null;
    var wf = new mbp.SettingsWorkflow(app);
    ok(!jQuery('#content').html());
    wf.activate(testPistes);
    ok(jQuery('#content #login-form').html());
});