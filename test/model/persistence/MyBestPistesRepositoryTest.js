"use strict";

module("MyBestPistesRepository", {
    setup : function() {
        localStorage.clear();
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("save creates or updates an entry in localStore", function() {
    var app = new mbp.MyBestPistes();
    app.user = new mbp.User('ch4mp');
    var repo = new mbp.MyBestPistesRepository();
    repo.save(app);
    equal(localStorage.getItem(repo.keys.username), 'ch4mp');
    app.user = new mbp.User('jwacongne');
    repo.save(app);
    equal(localStorage.getItem(repo.keys.username), 'jwacongne');
});
test("", function() {
    var app = new mbp.MyBestPistes();
    var repo = new mbp.MyBestPistesRepository();
    localStorage.setItem(repo.keys.username, 'ch4mp');
    var repo = new mbp.MyBestPistesRepository(app);
    repo.restore(app);
    equal(app.user.getLogin(), 'ch4mp');
});