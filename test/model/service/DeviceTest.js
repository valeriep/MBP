"use strict";

module("Device");
test("isOnline()", function() {
    var device = new mbp.Device();
    ok(!device.isOnline());
});
