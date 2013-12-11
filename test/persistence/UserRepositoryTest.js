"use strict";

module("UserRepository", {
    setup : function() {
        localStorage.clear();
        var user = new mbp.User('U1', 'ch4mp', 'toto');
        user.sessionId = '123';
        localStorage.setItem('mbp.User.ch4mp', JSON.stringify(user));
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("get existing user returns valid User", function() {
    var repo = new mbp.UserRepository();
    var user;

    user = repo.get('ch4mp');
    ok(user instanceof mbp.User);
    deepEqual(user.login, 'ch4mp');
    ok(!user.pwd);
    deepEqual(user.sessionId, '123');

    user = repo.get('ch4mp', 'toto');
    ok(user instanceof mbp.User);
    deepEqual(user.login, 'ch4mp');
    deepEqual(user.pwd, 'toto');
    deepEqual(user.sessionId, '123');
});
test("get not existing user returns undefined", function() {
    var repo = new mbp.UserRepository();
    var user = repo.get('jwacongne');
    deepEqual(user, null);
});
test("get undefined returns undefined", function() {
    var repo = new mbp.UserRepository();
    var user = repo.get(undefined);
    deepEqual(user, null);
});
test("save new mbp.user alters session storage only (and not local storage)", function() {
    var user = new mbp.User('U2', 'jwacongne');
    var repo = new mbp.UserRepository();

    equal(localStorage.length, 1);
    repo.save(user);
    equal(localStorage.length, 2);

    deepEqual(repo.get('jwacongne'), user);
});
test("save existing user overwrites previous record", function() {
    var user = new mbp.User('U1', 'ch4mp');
    var repo = new mbp.UserRepository();

    equal(localStorage.length, 1);
    repo.save(user);
    equal(localStorage.length, 1);

    var saved = repo.get('ch4mp');
    equal(saved.login, 'ch4mp');
    equal(saved.pwd, '');
    equal(saved.sessionId, '');
});