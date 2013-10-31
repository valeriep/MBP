"use strict";

module('LocalAuthenticationService', {
    setup : function() {
        var userRepo = new mbp.UserRepository();

        var ch4mp = new mbp.User('ch4mp');
        ch4mp.sessionId = '123';
        userRepo.save(ch4mp);

        var jwacongne = new mbp.User('jwacongne');
        jwacongne.sessionId = null;
        new mbp.UserRepository().save(jwacongne);
    }
});
test('login() retrieves user sessionId if persisted value set to non falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User('ch4mp');
    ok(service.login(user));
    equal(user.sessionId, '123');
});
test('login() sets user sessionId to "local" if persisted value set to falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User('jwacongne');
    ok(service.login(user));
    ok(user.sessionId, 'local');
});
test('login() sets user sessionId to null and fails authentication if username is falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    ok(!service.login(user));
    ok(!user.isAuthenticated());
    
    user = new mbp.User('');
    ok(!service.login(user));
    ok(!user.isAuthenticated());
    
    user = new mbp.User('false');
    ok(service.login(user));
    ok(user.isAuthenticated());
});
test('login() sets user sessionId to "local" if user not persisted', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User('toto');
    ok(service.login(user));
    ok(user.sessionId, 'local');
});
test('login() throws Error if user is not instance of mbp.User', function() {
    var service = new mbp.LocalAuthenticationService();
    throws(function() {
        service.login(undefined);
    }, Error);
    throws(function() {
        service.login('ch4mp');
    }, Error);
    throws(function() {
        service.login({
            login : 'ch4mp'
        });
    }, Error);
    throws(function() {
        service.login({
            getLogin : function() {
                return 'ch4mp';
            }
        });
    }, Error);
});
test('logout() sets user sessionId to null', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User('ch4mp');
    user.sessionId = '123';
    service.logout(user);
    strictEqual(user.sessionId, null);
    strictEqual(new mbp.UserRepository().get('ch4mp').sessionId, null);
});
test('logout() throws Error if user is not instance of mbp.User', function() {
    var service = new mbp.LocalAuthenticationService();
    throws(function() {
        service.logout(undefined);
    }, Error);
    throws(function() {
        service.logout('ch4mp');
    }, Error);
    throws(function() {
        service.logout({
            login : 'ch4mp'
        });
    }, Error);
    throws(function() {
        service.logout({
            getLogin : function() {
                return 'ch4mp';
            }
        });
    }, Error);
});