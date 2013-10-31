"use strict";

module("Seolan");
test("constructor sets services", function() {
    var seolan = new mbp.Seolan('ch4mp', 'toto');
    ok(seolan.authenticationService instanceof mbp.RemoteAuthenticationService);
});