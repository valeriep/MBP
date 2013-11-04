"use strict";

module("MyBestPistes", {
    setup : function() {
        localStorage.clear();
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("", function() {
    var app = new mbp.MyBestPistes();
    localStorage.setItem('mbp.username', 'ch4mp');
    app.load();
    equal(app.user.getLogin(), 'ch4mp');
});
test("", function() {
    var app = new mbp.MyBestPistes();
    app.load();
    strictEqual(app.user, undefined);
});
test("", function() {
    var app = new mbp.MyBestPistes();
    app.load();
    app.user = new mbp.User('ch4mp');
    app.unload();
    equal(localStorage.getItem('mbp.username'), 'ch4mp');
});