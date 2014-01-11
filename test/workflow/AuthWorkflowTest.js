"use strict";

mbp.SuccedingTestAuthService = function() {
    this.login = function(user) {
        ok(true);
        user.sessionId = 'test';
    };
};

mbp.FailingTestAuthService = function() {
    this.login = function(user) {
        ok(true);
        user.sessionId = null;
    };
};

module("AuthWorkflow", {
    setup : function() {
        jQuery('#content').empty();
        localStorage.clear();
        app = new mbp.MyBestPistes();
        app.user = new mbp.User('U1', 'ch4mp');
        app.authService = new mbp.SuccedingTestAuthService();
    },
    teardown : function() {
        jQuery('#content').empty();
        localStorage.clear();
    }
});
test("activate() displays AuthWidget with username filled", function() {
    var awf = new mbp.AuthWorkflow(undefined);
    awf.activate();
    equal(jQuery('#username').attr('value'), 'ch4mp');
});
test("submit() keeps same user when username is unchanged", function() {
    expect(2);

    var user = app.user;
    var awf = new mbp.AuthWorkflow(function(actualUser) {
        ok(actualUser == user);
    });

    awf.submit('ch4mp', 'toto');
});
test("submit() creates new user if username changes", function() {
    expect(3);

    var user = app.user;
    var awf = new mbp.AuthWorkflow(function(actualUser) {
        ok(actualUser != user);
        equal(actualUser.login, 'jwacongne');
    });

    awf.submit('jwacongne', 'toto');
});
test("submit() creates new user with undefined login if user is unset", function() {
    expect(3);

    app.user = undefined;
    var awf = new mbp.AuthWorkflow(function(actualUser) {
        ok(actualUser);
        ok(!actualUser.login);
    });

    awf.submit();
});
test("Persistent user state is the one after authentication service call", function() {
    var userRepo = new mbp.LocalUserRepository();
    var awf = new mbp.AuthWorkflow(function(actualUser) {
    });
    var actualUser;

    awf.submit('jwacongne', 'toto');
    actualUser = userRepo.get('jwacongne', 'toto');
    equal(actualUser.sessionId, 'test');
});
test("submit() triggers onSuccess event handler with authenticated user if authentication succeeds", function() {
    expect(2);// login called && onSuccess called
    var awf = new mbp.AuthWorkflow(function(actualUser) {
        ok(actualUser.isAuthenticated());
    });
    awf.submit('ch4mp', 'toto');
});
test("submit() loops to activate() event handler with authenticated user if authentication fails", function() {
    expect(2);// login called && activate called
    app.authService = new mbp.FailingTestAuthService();
    var awf = new mbp.AuthWorkflow(function(actualUser) {
        ok(!actualUser.isAuthenticated()); // houldn't be called
        ok(false);
    });
    awf.activate = function() {
        ok(true);
    };
    awf.submit('ch4mp', 'toto');
});