"use strict";

module("ClosestPistesWorkflow", {
    setup : function() {
        jQuery('#content').html('');
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
        jQuery('#content').html('');
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.ClosestPistesWorkflow();
    ok(!jQuery('#content').html());
    wf.activate(testPistes);
    ok(jQuery('#content').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.ClosestPistesWorkflow();
    ok(!jQuery('#content').html());
    wf.activate(undefined);
    ok(jQuery('#content').html());
});