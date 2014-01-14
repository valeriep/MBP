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
    //FIXME finalize remote authentication service
    var remoteAuthenticationService = new mbp.LocalAuthenticationService(); //new mbp.RemoteAuthenticationService();

    var navbarWidget = null;

    var closestPistesWidget = null;
    var userPistesWidget = null;
    var searchPistesWidget = null;
    var newPisteWidget = null;
    var settingsWidget = null;
    
    /** @type mbp.Device */
    this.device = new mbp.Device();

    /** @type mbp.LocalAuthenticationService */
    this.authService = this.device.isOnline() ? remoteAuthenticationService : localAuthenticationService;

    /** @type mbp.LocalResortRepository */
    this.localResortRepo = new mbp.LocalResortRepository();

    /** @type mbp.LocalPisteRepository */
    this.localPisteRepo = new mbp.LocalPisteRepository();

    /** @type mbp.LocalCommentRepository */
    this.localCommentRepo = new mbp.LocalCommentRepository();

    /** @type mbp.SeolanRepository */
    this.seolanRepo = new mbp.SeolanRepository();

    /** @type mbp.SynchronizationService */
    this.syncService = new mbp.SynchronizationService(this);

    /** @type mbp.User */
    this.user;

    this.onOnline = function() {
        app.syncService.run();
        this.authService = remoteAuthenticationService;
    };

    this.onOffline = function() {
        this.authService = localAuthenticationService;
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
     * Triggered at application shutdown (page unload)<br>
     * Persists application state
     */
    this.unload = function() {
        mbpRepo.save(instance);
    };

    /**
     * Application entry point. Should be triggered at startup (page loaded)<br>
     * Restores application state and enters home workflow
     */
    this.load = function() {
        instance.device.setDefaultLanguage();
        document.addEventListener("online", instance.onOnline, false);
        document.addEventListener("offline", instance.onOffline, false);
        jQuery(window).on('beforeunload', instance.unload);
        mbpRepo.restore(instance);

        closestPistesWidget = new mbp.ClosestPistesWidget('#content');
        userPistesWidget = new mbp.UserPistesWidget('#content');
        searchPistesWidget = new mbp.SearchPistesWidget('#content');
        newPisteWidget = new mbp.NewPisteWidget('#content');
        navbarWidget = new mbp.NavbarWidget(closestPistesWidget.show, searchPistesWidget.show, newPisteWidget.show, userPistesWidget.show);
        navbarWidget.show();

        settingsWidget = new mbp.SettingsWidget('#content');
        jQuery('#header .settings').click(function() {
            settingsWidget.show();
        });
        
        navbarWidget.clickSearch();
    };
};