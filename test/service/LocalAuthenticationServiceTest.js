"use strict";

module('LocalAuthenticationService', {
    setup : function() {
        var userRepo = new mbp.LocalUserRepository();

        var ch4mp = new mbp.User();
        ch4mp.id = 'U1';
        ch4mp.login = 'ch4mp';
        ch4mp.sessionId = '123';
        userRepo.save(ch4mp);

        var jwacongne = new mbp.User();
        jwacongne.id = 'U2';
        jwacongne.login = 'jwacongne';
        jwacongne.sessionId = null;
        new mbp.LocalUserRepository().save(jwacongne);
    }
});
test('login() retrieves user sessionId if persisted value set to non falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    user.id = 'U1';
    user.login = 'ch4mp';
    ok(service.login(user));
    equal(user.sessionId, '123');
});
test('login() sets user sessionId to "local" if persisted value set to falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    user.id = 'U2';
    user.login = 'jwacongne';
    ok(service.login(user));
    ok(user.sessionId, 'local');
});
test('login() sets user sessionId to null and fails authentication if username is falsy', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    ok(!service.login(user));
    ok(!user.isAuthenticated());
});
test('login() sets user sessionId to "local" if user not persisted', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    user.id = 'toto';
    user.login = 'toto';
    ok(service.login(user));
    equal(user.sessionId, 'local');
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
});
test('logout() sets user sessionId to null', function() {
    var service = new mbp.LocalAuthenticationService();
    var user = new mbp.User();
    user.id = 'U1';
    user.login = 'ch4mp';
    user.sessionId = '123';
    service.logout(user);
    strictEqual(user.sessionId, '');
    strictEqual(new mbp.LocalUserRepository().get('U1').sessionId, '');
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