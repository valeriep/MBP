"use strict";

module("User");
test("constructor with no arg", function() {
    var user = new mbp.User();

    equal(user.id, null);
    equal(user.login, null);
    equal(user.pwd, null);
    equal(user.sessionId, null);
});
test("copy and original are independent", function() {
    var user = new mbp.User();
    user.id = 'U1';
    user.login = 'ch4mp@c4-soft.com';
    user.pwd = 'toto';
    user.sessionId = 'testSessionId';
    
    var copy = new mbp.User(user);
    equal(copy.id, 'U1');
    equal(copy.login, 'ch4mp@c4-soft.com');
    equal(copy.pwd, 'toto');
    equal(copy.sessionId, 'testSessionId');

    user.id = null;
    user.login = null;
    user.pwd = null;
    user.sessionId = null;

    equal(copy.id, 'U1');
    equal(copy.login, 'ch4mp@c4-soft.com');
    equal(copy.pwd, 'toto');
    equal(copy.sessionId, 'testSessionId');
});
test("isAuthenticated", function() {
    var user = new mbp.User();
	
    user.sessionId = undefined;
    ok(!user.isAuthenticated());
	
    user.sessionId = null;
    ok(!user.isAuthenticated());
	
    user.sessionId = '';
    ok(!user.isAuthenticated());
	
    user.sessionId = 's';
    ok(user.isAuthenticated());
});