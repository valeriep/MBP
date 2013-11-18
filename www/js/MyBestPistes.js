"use strict";

/**
 * Application Main class (entry point and Home controller).
 * Instantiate and call load() to start MyBestPistes.<br>
 * Creates and injects most dependencies.
 * 
 * @constructor
 */
mbp.MyBestPistes = function() {
    var instance = this;
    var mbpRepo = new mbp.MyBestPistesRepository(instance);
    var localAuthenticationService = new mbp.LocalAuthenticationService();
    //FIXME finalize remote authentication service
    var remoteAuthenticationService = new mbp.LocalAuthenticationService(); //new mbp.RemoteAuthenticationService();

    var listPistesWorkflow = null;
    var searchPistesWorkflow = null;
    var newPisteWorkflow = null;
    var settingsWorkflow = null;
    
    this.device = new mbp.Device();
    
    this.services = {
        authService : instance.device.isOnline() ? remoteAuthenticationService : localAuthenticationService
    };

    this.onOnline = function() {
        instance.services.authService = remoteAuthenticationService;
    };

    this.onOffline = function() {
        instance.services.authService = localAuthenticationService;
    };

    /**
     * @type mbp.User
     */
    this.user;

    /**
     * Application entry point. Should be triggered at startup (page loaded).<br>
     * Restores application state and enters home workflow
     */
    this.load = function() {
        document.addEventListener("online", instance.onOnline, false);
        document.addEventListener("offline", instance.onOffline, false);
        jQuery(window).on('beforeunload', this.unload);
        mbpRepo.restore(instance);

        listPistesWorkflow = new mbp.ListPistesWorkflow();
        searchPistesWorkflow = new mbp.SearchPistesWorkflow(listPistesWorkflow.activate);
        newPisteWorkflow = new mbp.NewPisteWorkflow(instance);
        settingsWorkflow = new mbp.SettingsWorkflow(instance);
        var navbarWidget = new mbp.NavbarWidget(listPistesWorkflow.activate, searchPistesWorkflow.activate, newPisteWorkflow.activate, listPistesWorkflow.activate, settingsWorkflow.activate);
        navbarWidget.display();
        
        searchPistesWorkflow.activate();
    };
    
    /**
     * Logout callback. Triggers authService logout and loops to enter (which will display login form)
     */
    this.logout = function() {
        if(localAuthenticationService != instance.services.authService) {
            localAuthenticationService.logout(instance.user);
        }
        instance.services.authService.logout(instance.user);
        searchPistesWorkflow.activate();
    };

    /**
     * Triggered at application shutdown (page unload).<br>
     * Persists application state.
     */
    this.unload = function() {
        mbpRepo.save(instance);
    };

    
    this.createTestData = function() {
        var resortRepo = new mbp.LocalResortRepository();
        if(!resortRepo.getAll().hasOwnProperty('testResortId')) {
            var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
            
            var piste = new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', '../test/img/piste/testPiste1.jpg', 4, resort);
            new mbp.Comment('testComment1', 'First test comment', 4, 1, piste);
            new mbp.Comment('testComment2', 'Second test comment', 5, 1, piste);
            
            piste = new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', '../test/img/piste/testPiste2.jpg', 2.5, resort);
            new mbp.Comment('testComment3', 'Third test comment', 1, 4, piste);
            new mbp.Comment('testComment4', '4th test comment', 1, 4, piste);
            
            resortRepo.save(resort);
            
            resort = new mbp.Resort('otherTestResortId', 'Other Test Resort', 'Test Country', 'Other Test Massif');
            piste = new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/bckgrnd.jpg', undefined, resort);
            new mbp.Comment('testComment5', '5th test comment', 3, 2, piste);
            new mbp.Comment('testComment6', 'Test comment n°6', 3, 3, piste);

            resortRepo.save(resort);
        }
    };
    
    this.createTestData();
};