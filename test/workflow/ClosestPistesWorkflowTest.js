"use strict";

module("ClosestPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
        app = new mbp.MyBestPistes();
        app.device.isConnected = function() {
            return false;
        };
        app.device.refreshPosition = function(onPositionSucess, onPositinError) {
            onPositionSucess({
                coords : {
                    latitude : '',
                    longitude : ''
                }
            });
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.ClosestPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"]').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.ClosestPistesWorkflow();
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(undefined);
    ok(jQuery('div[data-role="content"]').html());
});