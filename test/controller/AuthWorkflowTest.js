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
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
    },
    teardown : function() {
        jQuery('div[data-role="content"]').html('');
        localStorage.clear();
    }
});
test("enter() displays AuthWidget with username filled", function() {
    var awf = new mbp.AuthWorkflow(undefined, new mbp.User('ch4mp'), undefined);
    awf.enter();
    equal(jQuery('#username').attr('value'), 'ch4mp');
});
test("submit() keeps same user when username is unchanged", function() {
    expect(2);

    var user = new mbp.User('ch4mp');
    var awf = new mbp.AuthWorkflow({ authService : new mbp.SuccedingTestAuthService() }, user, function(actualUser) {
        ok(actualUser == user);
    });

    awf.submit('ch4mp', 'toto');
});
test("submit() creates new user if username changes", function() {
    expect(3);

    var user = new mbp.User('ch4mp');
    var awf = new mbp.AuthWorkflow({ authService : new mbp.SuccedingTestAuthService() }, user, function(actualUser) {
        ok(actualUser != user);
        equal(actualUser.getLogin(), 'jwacongne');
    });

    awf.submit('jwacongne', 'toto');
});
test("submit() creates new user with undefined login if user is unset", function() {
    expect(3);

    var awf = new mbp.AuthWorkflow({ authService : new mbp.SuccedingTestAuthService() }, undefined, function(actualUser) {
        ok(actualUser);
        strictEqual(actualUser.getLogin(), undefined);
    });

    awf.submit();
});
test("Persistent user state is the one after authentication service call", function() {
    var userRepo = new mbp.UserRepository();
    var awf = new mbp.AuthWorkflow({ authService : new mbp.SuccedingTestAuthService() }, new mbp.User('ch4mp'), function(actualUser) {
    });
    var actualUser;

    awf.submit('jwacongne', 'toto');
    actualUser = userRepo.get('jwacongne', 'toto');
    equal(actualUser.sessionId, 'test');
});
test("submit() triggers onSuccess event handler with authenticated user if authentication succeeds", function() {
    expect(2);// login called && onSuccess called
    var awf = new mbp.AuthWorkflow({ authService : new mbp.SuccedingTestAuthService() }, new mbp.User('ch4mp'), function(actualUser) {
        ok(actualUser.isAuthenticated());
    });
    awf.submit('ch4mp', 'toto');
});
test("submit() loops to enter() event handler with authenticated user if authentication fails", function() {
    expect(2);// login called && enter called
    var awf = new mbp.AuthWorkflow({ authService : new mbp.FailingTestAuthService() }, new mbp.User('ch4mp'), function(actualUser) {
        ok(!actualUser.isAuthenticated()); // houldn't be called
        ok(false);
    });
    awf.enter = function() {
        ok(true);
    };
    awf.submit('ch4mp', 'toto');
});