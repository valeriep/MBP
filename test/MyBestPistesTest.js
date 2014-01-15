"use strict";

var app;

module("MyBestPistes", {
    setup : function() {
        localStorage.clear();
        app = new mbp.MyBestPistes();
        app.seolanRepo = new mbp.StubSeolanRepository();
        app.save();
        jQuery('#content').empty();
        jQuery('div[data-role="footer"]').empty();
    },
    teardown : function() {
        localStorage.clear();
        jQuery('#content').empty();
        jQuery('div[data-role="footer"]').empty();
    }
});
test("load() retrieves User and session Id", function() {
    localStorage.setItem('mbp.userId', 'U1');
    new mbp.LocalUserRepository().save(mbp.User.build('U1', 'ch4mp', 'toto', 'test'));
    app.load();
    equal(app.user.login, 'ch4mp');
    ok(!app.user.pwd); // password is not persisted
    equal(app.user.sessionId, 'test');
});
test("load() creates new User with persisted username even if user is not persistent (username saved in app state, but user not accessible by LocalUserRepository)", function() {
    localStorage.setItem('mbp.userId', 'U1');
    app.load();
    equal(app.user.login, 'U1');
    ok(!app.user.pwd);
    ok(!app.user.sessionId);
});
test("load() inits app with null user if app has no persistent state (i.e. first run)", function() {
    app.load();
    strictEqual(app.user, null);
});
test("load() persisted user with session id skips authentication form display", function() {
    localStorage.setItem('mbp.userId', 'U1');
    new mbp.LocalUserRepository().save(mbp.User.build('U1', 'ch4mp', 'toto', 'test'));
    app.load();
    ok(!jQuery('#login-form').html());
    jQuery(document).ready(function() {
        ok(jQuery('#content').html());
    });
});
test("unload() creates app persistence (saves username)", function() {
    app.user = mbp.User.build('U1', 'ch4mp');
    app.unload();
    equal(localStorage.getItem('mbp.userId'), 'U1');
});