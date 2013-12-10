"use strict";
var myBestPistesRepositoryTest = {
        userRepo : null,
        mbpRepo : null,
};

module("MyBestPistesRepository", {
    setup : function() {
        localStorage.clear();
        myBestPistesRepositoryTest.userRepo = new mbp.UserRepository();
        myBestPistesRepositoryTest.mbpRepo = new mbp.MyBestPistesRepository();
        
        app = new mbp.MyBestPistes();
        app.user = new mbp.User('U1', 'ch4mp', 'toto', 'test');
    },
    teardown : function() {
        localStorage.clear();
        app = new mbp.MyBestPistes();
    }
});
test("save() creates or updates an entry in localStore", function() {
    strictEqual(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), null);//entry does not exist
    
    myBestPistesRepositoryTest.mbpRepo.save(app);
    equal(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), 'ch4mp');//entry created
    
    app.user = new mbp.User('U2', 'jwacongne');
    myBestPistesRepositoryTest.mbpRepo.save(app);
    equal(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), 'jwacongne');//entry updated
});
test("restore() retrieves a user previously saved with sessionId", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, app.user.login);
    myBestPistesRepositoryTest.mbpRepo.restore(app);
    equal(app.user.login, app.user.login);
    equal(app.user.sessionId, app.user.sessionId);
});
test("restore() retrieves a user previously saved without sessionId", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, app.user.login);
    app.user.sessionId = null;
    myBestPistesRepositoryTest.userRepo.save(app.user);
    myBestPistesRepositoryTest.mbpRepo.restore(app);
    equal(app.user.login, app.user.login);
    strictEqual(app.user.sessionId, '');
});
test("restore() creates a user if no user persisted with username", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, 'jwacongne');
    myBestPistesRepositoryTest.mbpRepo.restore(app);
    equal(app.user.login, 'jwacongne');
    strictEqual(app.user.sessionId, '');
});