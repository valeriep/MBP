"use strict";

var settingsWorkflowTestFixture = null;

module("SettingsWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        settingsWorkflowTestFixture = {
            app : {
                user : new mbp.User('U1', 'Ch4mp', null, 'testSessionId'),
                device : {
                    isOnline : function() {
                        return true;
                    },
                    refreshPosition : function() {}
                },
                logout : function() {}
            }
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays settings Widget as content if user is authenticated", function() {
    var wf = new mbp.SettingsWorkflow(settingsWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"] p').html());
});
test("activate() displays login Widget as content if user is not authenticated", function() {
    settingsWorkflowTestFixture.app.user.sessionId = null;
    var wf = new mbp.SettingsWorkflow(settingsWorkflowTestFixture.app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"] #login-form').html());
});