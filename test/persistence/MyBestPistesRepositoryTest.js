"use strict";

var testcase;

module("MyBestPistesRepository", {
    setup : function() {
        testcase = {};
        localStorage.clear();
        testcase.userRepo = new mbp.LocalUserRepository();
        testcase.mbpRepo = new mbp.MyBestPistesRepository();
        testcase.user = new mbp.User('test');
        testcase.user.id = 'U1';
        testcase.user.login = 'ch4mp@c4-soft.com';
        testcase.user.pwd = 'toto';
        testcase.user.sessionId = 'test';
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("save() creates or updates an entry in localStore", function() {
    var actual = new mbp.MyBestPistes();
    actual.user = new mbp.User(testcase.user);
    
    testcase.mbpRepo.save(actual);
    equal(localStorage.getItem(testcase.mbpRepo.keys.userId), 'U1');//entry created
    
    actual.user = new mbp.User();
    actual.user.id = 'U2';
    actual.user.login = 'jwacongne@c4-soft.com';
    testcase.mbpRepo.save(actual);
    
    equal(localStorage.getItem(testcase.mbpRepo.keys.userId), 'U2');//entry updated
});
test("restore() retrieves a user previously saved with sessionId", function() {
    var actual = new mbp.MyBestPistes();
    testcase.userRepo.save(testcase.user);
    localStorage.setItem(testcase.mbpRepo.keys.userId, testcase.user.id);
    testcase.mbpRepo.restore(actual);
    
    equal(actual.user.id, testcase.user.id);
    equal(actual.user.login, testcase.user.login);
    strictEqual(actual.user.pwd, null);
    equal(actual.user.sessionId, testcase.user.sessionId);
});
test("restore() retrieves a user previously saved without sessionId", function() {
    var actual = new mbp.MyBestPistes();
    localStorage.setItem(testcase.mbpRepo.keys.userId, testcase.user.id);
    testcase.user.sessionId = null;
    testcase.userRepo.save(testcase.user);
    testcase.mbpRepo.restore(actual);
    
    equal(actual.user.id, testcase.user.id);
    equal(actual.user.login, testcase.user.login);
    strictEqual(actual.user.pwd, null);
    strictEqual(actual.user.sessionId, null);
});
test("restore() creates a user if no user persisted with userId", function() {
    var actual = new mbp.MyBestPistes();
    localStorage.setItem(testcase.mbpRepo.keys.userId, 'jwacongne');
    testcase.mbpRepo.restore(actual);
    equal(actual.user.id, 'jwacongne');
    equal(actual.user.login, 'jwacongne');
    strictEqual(actual.user.pwd, null);
    strictEqual(actual.user.sessionId, null);
});