"use strict";

module("Seolan");
test("constructor sets services", function() {
    var seolan = new slopes.Seolan('ch4mp', 'toto');
    ok(seolan.authenticationService instanceof slopes.AuthenticationService);
});