"use strict";

module("Device");
test("isConnected()", function() {
    var device = new mbp.Device();
    ok(!device.isConnected());
});
