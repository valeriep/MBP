"use strict";

module("User");
test("constructor", function() {
    var user = new mbp.User('U1', 'ch4mp', 'toto');

    equal(user.login, 'ch4mp');
    equal(user.pwd, 'toto');
    equal(user.sessionId, undefined);
});
test("isAuthenticated", function() {
    var user = new mbp.User('U1', 'ch4mp');

    user.sessionId = 123;
    ok(user.isAuthenticated());

    user.sessionId = "123";
    ok(user.isAuthenticated());

    user.sessionId = "false";
    ok(user.isAuthenticated());

    user.sessionId = "";
    ok(!user.isAuthenticated());

    user.sessionId = undefined;
    ok(!user.isAuthenticated());
});
test("setting password or sessionId an a user doesn't modify others state", function() {
    var ch4mp = new mbp.User('U1', 'ch4mp', 'toto');
    var jwacongne = new mbp.User('U2', 'jwacongne', 'foo');
    jwacongne.pwd = 'bar';
    jwacongne.sessionId = '123';
    equal(ch4mp.pwd, 'toto');
    equal(ch4mp.sessionId, undefined);
    equal(jwacongne.pwd, 'bar');
    equal(jwacongne.sessionId, '123');
});