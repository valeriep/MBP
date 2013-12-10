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
    
    /** @type mbp.Device */
    this.device = new mbp.Device();

    /** @type mbp.LocalAuthenticationService */
    this.authService = this.device.isOnline() ? remoteAuthenticationService : localAuthenticationService;

    /** @type mbp.LocalResortRepository */
    this.localResortRepo = new mbp.LocalResortRepository();

    /** @type mbp.SeolanResortRepository */
    this.seolanResortRepo = new mbp.StubSeolanResortRepository();

    /** @type mbp.ResortSynchronizationService} */
    this.resortsSyncService = new mbp.ResortSynchronizationService(this);

    /** @type mbp.User */
    this.user;

    this.onOnline = function() {
        mbp.resortsSyncService.run();
        this.authService = remoteAuthenticationService;
    };

    this.onOffline = function() {
        this.authService = localAuthenticationService;
    };

    /**
     * Application entry point. Should be triggered at startup (page loaded).<br>
     * Restores application state and enters home workflow
     */
    this.load = function() {
        instance.device.setDefaultLanguage();
        instance.populateTestData();
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
        if(localAuthenticationService != instance.authService) {
            localAuthenticationService.logout(instance.user);
        }
        instance.authService.logout(instance.user);
        navbarWidget.clickSearch();
    };
    
    /**
     * persists application state
     */
    this.save = function() {
        mbpRepo.save(instance);
    };

    /**
     * Triggered at application shutdown (page unload).<br>
     * Persists application state.
     */
    this.unload = function() {
        instance.save();
    };
    
    this.populateTestData = function() {
        instance.resortsSyncService.run();
    };
};

app = new mbp.MyBestPistes();