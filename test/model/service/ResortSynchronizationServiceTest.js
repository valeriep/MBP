"use strict";

/** @type mbp.MyBestPistes */
var app = null;

module("ResortSynchronizationService", {
    setup : function() {
        app = {};
    },
    teardown : function() {
    }
});
test("create login data", function() {
   var service = new mbp.ResortSynchronizationService(app);
   expect(0);
});