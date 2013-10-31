"use strict";

mbp.TestAuthService = function(shouldLoginBeCalled, isAuthenticationRefused) {
    this.successUser;
    
    this.login = function(user) {
        ok(shouldLoginBeCalled);
        if(!isAuthenticationRefused) {
            user.sessionId = 'test';
        }
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
    var awf = new mbp.AuthWorkflow(undefined, undefined, new mbp.User('ch4mp'), undefined);
    awf.enter();
    equal(jQuery('#username').attr('value'), 'ch4mp');
});
test("submit() keeps same user when username is unchanged", function() {
    expect(2);
    
    var user = new mbp.User('ch4mp');
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true), new mbp.TestAuthService(false), user, function(actualUser) {
        ok(actualUser == user);
    });
    
    awf.submit('ch4mp', 'toto');
});
test("submit() creates new user if username changes", function() {
    expect(3);
    
    var user = new mbp.User('ch4mp');
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true), new mbp.TestAuthService(false), user, function(actualUser) {
        ok(actualUser != user);
        equal(actualUser.getLogin(), 'jwacongne');
    });
    
    awf.submit('jwacongne', 'toto');
});
test("submit() creates new user with undefined login if user is unset", function() {
    expect(3);
    
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true), new mbp.TestAuthService(false), undefined, function(actualUser) {
        ok(actualUser);
        strictEqual(actualUser.getLogin(), undefined);
    });
    
    awf.submit();
});
test("Persistent user state is the one after local authentication service call", function() {
    var userRepo = new mbp.UserRepository();
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true), new mbp.TestAuthService(false), new mbp.User('ch4mp'), function(actualUser) {});
    var actualUser;

    awf.isOnline = function() {return false;};
    awf.submit('jwacongne', 'toto');
    actualUser = userRepo.get('jwacongne', 'toto');
    equal(actualUser.sessionId, 'test');
});
test("Persistent user state is the one after remote authentication service call", function() {
    var userRepo = new mbp.UserRepository();
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(false), new mbp.TestAuthService(true), new mbp.User('ch4mp'), function(actualUser) {});
    var actualUser;

    awf.isOnline = function() {return true;};
    awf.submit('jwacongne', 'toto');
    actualUser = userRepo.get('jwacongne', 'toto');
    equal(actualUser.sessionId, 'test');
});
test("submit() triggers onSuccess event handler with authenticated user if authentication succeeds", function() {
    expect(2);//login called && onSuccess called
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true), new mbp.TestAuthService(false), new mbp.User('ch4mp'), function(actualUser) {
        ok(actualUser.isAuthenticated());
    });
    awf.submit('ch4mp', 'toto');
});
test("submit() loops to enter() event handler with authenticated user if authentication succeeds", function() {
    expect(2);//login called && enter called
    var awf = new mbp.AuthWorkflow(new mbp.TestAuthService(true, true), new mbp.TestAuthService(false), new mbp.User('ch4mp'), function(actualUser) {
        ok(!actualUser.isAuthenticated()); //houldn't be called
        ok(false);
    });
    awf.enter = function() {ok(true);};
    awf.submit('ch4mp', 'toto');
});