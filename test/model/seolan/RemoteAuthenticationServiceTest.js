"use strict";

var originalPostFunction = $.post;
var authPostMock = function(uri, data, callback, format) {
    ok(uri);
    equal(format, 'json');
    if (data.username == 'ch4mp' && data.password == 'toto') {
        callback({
            SESSIONID : "123"
        });
    } else {
        callback({
            SESSIONID : null
        });
    }
};

module("RemoteAuthenticationService", {
    setup : function() {
        // Replace jQuery with a spy / stub (both checks posted parameters and returns dummy authentication data)
        $.post = authPostMock;
    },
    teardown : function() {
        // Restore jQuery original post function
        $.post = originalPostFunction;
    }
});
test("constructor throws error when user not instanceof User", function() {
    throws(function() {
        new mbp.RemoteAuthenticationService('http://test.test/', undefined);
    });
    throws(function() {
        new mbp.RemoteAuthenticationService('http://test.test/', Object.create());
    });
});
test("create login data", function() {
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);
    var actual = auth.createLoginData();
    equal(actual.username, 'ch4mp');
    equal(actual.password, 'toto');
});
test("create logout data", function() {
    var user = new mbp.User('ch4mp', 'toto');
    user.sessionId = '123';
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);
    var actual = auth.createLogoutData();
    equal(actual.username, 'ch4mp');
    equal(actual.SESSIONID, '123');
});
test("login callback with session id sets user session id", function() {
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);
    var answer = {SESSIONID: '123'};
    auth.loginCallback(answer);
    equal(user.sessionId, '123');
});
test("login callback without session id resets user password", function() {
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);
    var answer = {SESSIONID: null};
    auth.loginCallback(answer);
    equal(user.sessionId, undefined);
    equal(user.pwd, undefined);
});
test("login callback without undefined session id doesn't reset user pasword", function() {
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);
    auth.loginCallback(undefined);
    equal(user.sessionId, undefined);
    equal(user.pwd, 'toto');
});
asyncTest("successfull login", function() {
    expect(3);
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.login();
    equal(user.sessionId, '123');
    start();
});
asyncTest("failed login because of bad password", function() {
    expect(3);
    var user = new mbp.User('ch4mp', 'bad');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.login();
    ok(!user.sessionId);
    start();
});
asyncTest("failed login because of missing password", function() {
    expect(3);
    var user = new mbp.User('ch4mp', undefined);
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.login();
    ok(!user.sessionId);
    start();
});
asyncTest("failed login because of missing user name", function() {
    expect(3);
    var user = new mbp.User(undefined, 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.login();
    ok(!user.sessionId);
    start();
});
asyncTest("successfull logout", function() {
    expect(3);
    var user = new mbp.User('ch4mp', 'toto');
    user.sessionId = '123';
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.logout();
    equal(user.sessionId, undefined);
    start();
});
asyncTest("logout user with no sessionId does nothing (no post request is sent)", function() {
    expect(0);
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', user);

    auth.logout();
    start();
});