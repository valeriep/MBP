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

    var closestPistesWorkflow = null;
    var userPistesWorkflow = null;
    var searchPistesWorkflow = null;
    var newPisteWorkflow = null;
    var settingsWorkflow = null;
    
    this.device = new mbp.Device();
    
    this.services = {
        authService : null,
        resortsSyncService : new mbp.ResortSynchronizationService(instance),
        resortRepo : null,
        localResortRepo : new mbp.LocalResortRepository(),
        seolanResortRepo : new mbp.StubSeolanResortRepository()
    };

    this.onOnline = function() {
        instance.services.authService = remoteAuthenticationService;
        instance.services.resortRepo = instance.services.seolanResortRepo;
    };

    this.onOffline = function() {
        instance.services.authService = localAuthenticationService;
        instance.services.resortRepo = instance.services.localResortRepo;
    };

    /** @type mbp.User */
    this.user;

    /**
     * Application entry point. Should be triggered at startup (page loaded).<br>
     * Restores application state and enters home workflow
     */
    this.load = function() {
        instance.services.localResortRepo.clear();
        instance.populateTestData();
        instance.services.authService = instance.device.isOnline() ? remoteAuthenticationService : localAuthenticationService;
        instance.services.resortRepo = instance.device.isOnline() ? instance.services.seolanResortRepo : instance.services.localResortRepo;
        document.addEventListener("online", instance.onOnline, false);
        document.addEventListener("offline", instance.onOffline, false);
        jQuery(window).on('beforeunload', this.unload);
        mbpRepo.restore(instance);

        closestPistesWorkflow = new mbp.ClosestPistesWorkflow(instance);
        userPistesWorkflow = new mbp.UserPistesWorkflow(instance);
        searchPistesWorkflow = new mbp.SearchPistesWorkflow(instance);
        newPisteWorkflow = new mbp.NewPisteWorkflow(instance);
        settingsWorkflow = new mbp.SettingsWorkflow(instance);
        navbarWidget = new mbp.NavbarWidget(closestPistesWorkflow.activate, searchPistesWorkflow.activate, newPisteWorkflow.activate, userPistesWorkflow.activate, settingsWorkflow.activate);
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
        instance.services.resortsSyncService.run();
    };
};