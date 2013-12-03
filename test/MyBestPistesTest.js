"use strict";

module("MyBestPistes", {
    setup : function() {
        localStorage.clear();
        jQuery('div[data-role="content"]').html('');
        jQuery('div[data-role="footer"]').html('');
    },
    teardown : function() {
        localStorage.clear();
        jQuery('div[data-role="content"]').html('');
        jQuery('div[data-role="footer"]').html('');
    }
});
test("load() retrieves User and session Id", function() {
    var app = new mbp.MyBestPistes();
    localStorage.setItem('mbp.username', 'ch4mp');
    new mbp.UserRepository().save(new mbp.User('U1', 'ch4mp', 'toto', 'test'));
    app.load();
    equal(app.user.login, 'ch4mp');
    ok(!app.user.pwd); // password is not persisted
    equal(app.user.sessionId, 'test');
});
test("load() creates new User with persisted username even if user is not persistent (username saved in app state, but user not accessible by UserRepository)", function() {
    var app = new mbp.MyBestPistes();
    localStorage.setItem('mbp.username', 'ch4mp');
    app.load();
    equal(app.user.login, 'ch4mp');
    ok(!app.user.pwd);
    strictEqual(app.user.sessionId, null);
});
test("load() inits app with null user if app has no persistent state (i.e. first run)", function() {
    var app = new mbp.MyBestPistes();
    app.load();
    strictEqual(app.user, null);
});
test("load() persisted user with session id skips authentication form display", function() {
    localStorage.setItem('mbp.username', 'ch4mp');
    new mbp.UserRepository().save(new mbp.User('U1', 'ch4mp', 'toto', 'test'));
    var app = new mbp.MyBestPistes();
    app.load();
    ok(!jQuery('#login-form').html());
    ok(jQuery('div[data-role="content"]').html());
});
test("unload() creates app persistence (saves username)", function() {
    var app = new mbp.MyBestPistes();
    app.user = new mbp.User('U1', 'ch4mp');
    app.unload();
    equal(localStorage.getItem('mbp.username'), 'ch4mp');
});