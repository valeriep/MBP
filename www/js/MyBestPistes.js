"use strict";

/**
 * Application Main class (entry point and Home controller).
 * Instantiate and call load() to start MyBestPistes.<br>
 * Creates and injects most dependencies.
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.MyBestPistes = function() {
    var instance = this;
    var mbpRepo = new mbp.MyBestPistesRepository(instance);
    var localAuthenticationService = new mbp.LocalAuthenticationService();
    //TODO finalize remote authentication service
    var remoteAuthenticationService = new mbp.LocalAuthenticationService(); //new mbp.RemoteAuthenticationService();

    var navbarWidget = null;
    
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

    /** @type mbp.User */
    this.user;

    /**
     * Application entry point. Should be triggered at startup (page loaded).<br>
     * Restores application state and enters home workflow
     */
    this.load = function() {
        instance.populateTestData();
        document.addEventListener("online", instance.onOnline, false);
        document.addEventListener("offline", instance.onOffline, false);
        jQuery(window).on('beforeunload', this.unload);
        mbpRepo.restore(instance);

        listPistesWorkflow = new mbp.ListPistesWorkflow();
        searchPistesWorkflow = new mbp.SearchPistesWorkflow();
        newPisteWorkflow = new mbp.NewPisteWorkflow(instance);
        settingsWorkflow = new mbp.SettingsWorkflow(instance);
        navbarWidget = new mbp.NavbarWidget(listPistesWorkflow.activate, searchPistesWorkflow.activate, newPisteWorkflow.activate, listPistesWorkflow.activate, settingsWorkflow.activate);
        navbarWidget.display();
        
        navbarWidget.clickSearch();
    };
    
    /**
     * Logout callback. Triggers authService logout and loops to enter (which will display login form)
     */
    this.logout = function() {
        if(localAuthenticationService != instance.services.authService) {
            localAuthenticationService.logout(instance.user);
        }
        instance.services.authService.logout(instance.user);
        navbarWidget.clickSearch();
    };

    /**
     * Triggered at application shutdown (page unload).<br>
     * Persists application state.
     */
    this.unload = function() {
        mbpRepo.save(instance);
    };
    
    this.populateTestData = function() {
        var testResorts = new mbp.TestCase().getResorts();
        var resortId = null;
        var resortRepo = mbp.LocalResortRepository.getInstance();
        resortRepo.clear();
        
        for(resortId in testResorts) {
            resortRepo.saveResort(testResorts[resortId]);
        }
    };
};