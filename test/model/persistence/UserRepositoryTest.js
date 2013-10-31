"use strict";

module("UserRepository", {
    setup : function() {
        sessionStorage.clear();
        localStorage.clear();
        var user = new mbp.User('ch4mp', 'toto');
        user.sessionId = '123';
        sessionStorage.setItem('ch4mp', JSON.stringify(user));
    },
    teardown : function() {
        sessionStorage.clear();
    }
});
test("get existing user returns valid User", function() {
    var repo = new mbp.UserRepository();
    var user = repo.get('ch4mp');
    ok(user instanceof mbp.User);
    deepEqual(user.getLogin(), 'ch4mp');
    deepEqual(user.pwd, 'toto');
});
test("get not existing user returns undefined", function() {
    var repo = new mbp.UserRepository();
    var user = repo.get('jwacongne');
    deepEqual(user, undefined);
});
test("get undefined returns undefined", function() {
    var repo = new mbp.UserRepository();
    var user = repo.get(undefined);
    deepEqual(user, undefined);
});
test("save new mbp.user alters session storage only (and not local storage)", function() {
    var user = new mbp.User('jwacongne', 'foo');
    var repo = new mbp.UserRepository();
    
    equal(sessionStorage.length, 1);
    repo.save(user);
    equal(sessionStorage.length, 2);
    equal(localStorage.length, 0);
    
    deepEqual( repo.get('jwacongne'), user);
});
test("save existing user overwrites previous record", function() {
    var user = new mbp.User('ch4mp', 'foo');
    var repo = new mbp.UserRepository();
    
    equal(sessionStorage.length, 1);
    repo.save(user);
    equal(sessionStorage.length, 1);
    
    var saved = repo.get('ch4mp');
    equal(saved.getLogin(), 'ch4mp');
    equal(saved.pwd, 'foo');
    equal(saved.sessionId, undefined);
});