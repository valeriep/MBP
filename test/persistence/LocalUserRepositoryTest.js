"use strict";

var testCase;

module("LocalUserRepository", {
    setup : function() {
        testCase = {};
        localStorage.clear();
        testCase.user = new mbp.User();
        testCase.user.id = 'U1';
        testCase.user.login = 'ch4mp@c4-soft.com';
        testCase.user.pwd = 'toto';
        testCase.user.sessionId = 'test';
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("get existing user returns valid User", function() {
    var repo = new mbp.LocalUserRepository();
    repo.save(testCase.user);
    var actual = repo.get('U1');
    ok(actual instanceof mbp.User);
    equal(actual.id, 'U1');
    equal(actual.login, 'ch4mp@c4-soft.com');
    strictEqual(actual.pwd, null);
    deepEqual(actual.sessionId, 'test');

    actual = repo.get('U1', 'toto');
    deepEqual(actual, testCase.user);
});
test("get not existing user returns null", function() {
    var repo = new mbp.LocalUserRepository();
    repo.save(testCase.user);
    var actual = repo.get('jwacongne');
    deepEqual(actual, null);
});
test("get undefined returns null", function() {
    var repo = new mbp.LocalUserRepository();
    repo.save(testCase.user);
    var actual = repo.get();
    deepEqual(actual, null);
});
test("save existing user overwrites previous record", function() {
    var repo = new mbp.LocalUserRepository();
    repo.save(testCase.user);
    
    var other = new mbp.User(testCase.user);
    other.login = 'ch4mp';
    repo.save(other);

    var saved = repo.get('U1', 'toto');
    deepEqual(saved, other);
});