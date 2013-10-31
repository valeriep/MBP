"use strict";

var originalAjaxFunction = jQuery.ajax;
var loginAjaxMock = function(params) {
    equal(params.type, 'POST');
    equal(params.dataType, 'json');
    equal(params.async, false);
    ok(params.url);
    equal(typeof params.timeout, 'number');
    if (params.data.username == 'ch4mp' && params.data.password == 'toto') {
        params.success({
            SESSIONID : "123"
        });
    } else {
        params.success({
            SESSIONID : null
        });
    }
};
var logoutAjaxMock = function(params) {
    equal(params.type, 'POST');
    equal(params.dataType, 'json');
    equal(params.async, true);
    ok(params.url);
};

module("RemoteAuthenticationService", {
    teardown : function() {
        // Restore jQuery original post function
        jQuery.ajax = originalAjaxFunction;
    }
});
test("create login data", function() {
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);
    var actual = auth.createLoginData(user);
    equal(actual.username, 'ch4mp');
    equal(actual.password, 'toto');
});
test("create logout data", function() {
    var user = new mbp.User('ch4mp', 'toto');
    user.sessionId = '123';
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);
    var actual = auth.createLogoutData(user);
    equal(actual.username, 'ch4mp');
    equal(actual.SESSIONID, '123');
});
asyncTest("successfull login", function() {
    expect(7);
    jQuery.ajax = loginAjaxMock;
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    ok(auth.login(user));
    equal(user.sessionId, '123');
    start();
});
asyncTest("failed login because of bad password", function() {
    expect(7);
    jQuery.ajax = loginAjaxMock;
    var user = new mbp.User('ch4mp', 'bad');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    ok(!auth.login(user));
    ok(!user.isAuthenticated());
    start();
});
asyncTest("failed login because of missing password", function() {
    expect(7);
    jQuery.ajax = loginAjaxMock;
    var user = new mbp.User('ch4mp', undefined);
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    ok(!auth.login(user));
    ok(!user.isAuthenticated());
    start();
});
asyncTest("failed login because of missing user name", function() {
    expect(7);
    jQuery.ajax = loginAjaxMock;
    var user = new mbp.User(undefined, 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    ok(!auth.login(user));
    ok(!user.isAuthenticated());
    start();
});
asyncTest("successfull logout", function() {
    expect(5);
    jQuery.ajax = logoutAjaxMock;
    var user = new mbp.User('ch4mp', 'toto');
    user.sessionId = '123';
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    auth.logout(user);
    equal(user.sessionId, undefined);
    start();
});
asyncTest("logout user with no sessionId does nothing (no post request is sent)", function() {
    expect(0);
    jQuery.ajax = logoutAjaxMock;
    var user = new mbp.User('ch4mp', 'toto');
    var auth = new mbp.RemoteAuthenticationService('http://test.test/', 6000);

    auth.logout(user);
    start();
});