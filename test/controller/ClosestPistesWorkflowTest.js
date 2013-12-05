"use strict";

var app;

module("ClosestPistesWorkflow", {
    setup : function() {
        jQuery('div[data-role="content"]').html('');
        app = {
            device : {
                isConnected : function() {
                    return false;
                },
                refreshPosition : function(onPositionSucess, onPositinError) {
                    onPositionSucess({
                        coords : {
                            latitude : '',
                            longitude : ''
                        }
                    });
                }
            }
        };
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
    }
});
test("activate() displays pistes brief Widget as content", function() {
    var wf = new mbp.ClosestPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(testPistes);
    ok(jQuery('div[data-role="content"]').html());
});
test("activate() displays doesn't crash if pistes list is undefined", function() {
    var wf = new mbp.ClosestPistesWorkflow(app);
    ok(!jQuery('div[data-role="content"]').html());
    wf.activate(undefined);
    ok(jQuery('div[data-role="content"]').html());
});