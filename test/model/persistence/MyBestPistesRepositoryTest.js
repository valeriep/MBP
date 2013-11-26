"use strict";
var myBestPistesRepositoryTest = {
        user : null,
        mbpRepo : null,
        userRepo : null,
        app : null
};

module("MyBestPistesRepository", {
    setup : function() {
        localStorage.clear();
        myBestPistesRepositoryTest.user = new mbp.User('U1', 'ch4mp', 'toto', 'test');
        
        myBestPistesRepositoryTest.mbpRepo = new mbp.MyBestPistesRepository();
        
        myBestPistesRepositoryTest.userRepo = new mbp.UserRepository();
        myBestPistesRepositoryTest.userRepo.save(myBestPistesRepositoryTest.user);
        
        myBestPistesRepositoryTest.app = new mbp.MyBestPistes();
        myBestPistesRepositoryTest.app.user = myBestPistesRepositoryTest.user;
    },
    teardown : function() {
        localStorage.clear();
    }
});
test("save() creates or updates an entry in localStore", function() {
    strictEqual(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), null);//entry does not exist
    
    myBestPistesRepositoryTest.mbpRepo.save(myBestPistesRepositoryTest.app);
    equal(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), 'ch4mp');//entry created
    
    myBestPistesRepositoryTest.app.user = new mbp.User('U2', 'jwacongne');
    myBestPistesRepositoryTest.mbpRepo.save(myBestPistesRepositoryTest.app);
    equal(localStorage.getItem(myBestPistesRepositoryTest.mbpRepo.keys.username), 'jwacongne');//entry updated
});
test("restore() retrieves a user previously saved with sessionId", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, myBestPistesRepositoryTest.user.getLogin());
    myBestPistesRepositoryTest.mbpRepo.restore(myBestPistesRepositoryTest.app);
    equal(myBestPistesRepositoryTest.app.user.getLogin(), myBestPistesRepositoryTest.user.getLogin());
    equal(myBestPistesRepositoryTest.app.user.sessionId, myBestPistesRepositoryTest.user.sessionId);
});
test("restore() retrieves a user previously saved without sessionId", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, myBestPistesRepositoryTest.user.getLogin());
    myBestPistesRepositoryTest.user.sessionId = null;
    myBestPistesRepositoryTest.userRepo.save(myBestPistesRepositoryTest.user);
    myBestPistesRepositoryTest.mbpRepo.restore(myBestPistesRepositoryTest.app);
    equal(myBestPistesRepositoryTest.app.user.getLogin(), myBestPistesRepositoryTest.user.getLogin());
    strictEqual(myBestPistesRepositoryTest.app.user.sessionId, null);
});
test("restore() creates a user if no user persisted with username", function() {
    localStorage.setItem(myBestPistesRepositoryTest.mbpRepo.keys.username, 'jwacongne');
    myBestPistesRepositoryTest.mbpRepo.restore(myBestPistesRepositoryTest.app);
    equal(myBestPistesRepositoryTest.app.user.getLogin(), 'jwacongne');
    strictEqual(myBestPistesRepositoryTest.app.user.sessionId, null);
});