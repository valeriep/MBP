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

    this.services = {
        localAuthService : new mbp.LocalAuthenticationService(),
        remoteAuthService : new mbp.RemoteAuthenticationService()
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
        mbpRepo.restore(instance);
        jQuery('.home').addClass('ui-btn-active').trigger('click');
    };

    /**
     * User authentication callback
     * @param {mbp.User} user
     */
    this.userAuthenticated = function(user) {
        instance.user = user;
        mbpRepo.save(instance);
        instance.enter();
    };
    
    /**
     * Logout callback. Triggers authService logout and loops to enter (which will display login form)
     */
    this.logout = function() {
        instance.services.localAuthService.logout(instance.user);
        instance.services.remoteAuthService.logout(instance.user);
        instance.enter();
    };

    /**
     * Triggered at application shutdown (page unload).<br>
     * Persists application state.
     */
    this.unload = function() {
        mbpRepo.save(instance);
    };

    /**
     * If user is invalid or not yet authenticated, enter authentication workflow.<br>
     * Else display home widget
     */
    this.enter = function() {
        if (!instance.user || !instance.user.isAuthenticated()) {
            var authWorkflow = new mbp.AuthWorkflow(instance.services.localAuthService, instance.services.remoteAuthService, instance.user, instance.userAuthenticated);
            authWorkflow.enter();
        } else {
            var homeWidget = new mbp.HomeWidget(instance.user, instance.logout);
            homeWidget.display(instance.user);
        }
    };

    jQuery(window).on('beforeunload', this.unload);
    jQuery('.home').click(function() {
        instance.enter();
    });
    jQuery('.closestPistes').click(function() {
        jQuery('div[data-role="content"]').html('');
    });
    jQuery('.newPiste').click(function() {
        jQuery('div[data-role="content"]').html('');
    });
};