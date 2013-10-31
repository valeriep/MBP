"use strict";

/**
 * Application namespace
 */
var mbp = {};

//constants
var SEOLAN_BASE_URL = 'http://dynastar-chrome.xsalto.com/tzr/scripts/admin.php';

/**
 * Application Main class. Instantiate and call load() to start MyBestPistes.<br>
 * Creates and injects most dependencies.
 * @constructor
 */
mbp.MyBestPistes = function() {
    var instance = this;
    var mbpRepo = new mbp.MyBestPistesRepository(instance);

    var authCallback = function(user) {
        instance.user = user;
        jQuery('div[data-role="content"]').html('authentication succeded, user is: "' + JSON.stringify(instance.user) + '"');
        return false;
    };
    instance.workflows.authWorkflow = new mbp.AuthWorkflow(instance.services.localAuthService, instance.services.remoteAuthService, instance.user, authCallback);

    /**
     * @type mbp.User
     */
    this.user;

    /**
     * Application entry point. Should be triggered at startup (page loaded).<br>
     * Restores application state and triggers login workflow
     */
    this.load = function() {
        mbpRepo.restore();
        instance.workflows.authWorkflow.enter();
    };

    /**
     * Triggered at application shutdown (page unload).<br>
     * Persists application state.
     */
    this.unload = function() {
        mbpRepo.save();
    };

    jQuery(window).on('beforeunload', this.unload);
};

mbp.Slopes.services = {
    localAuthService : new mbp.LocalAuthenticationService(),
    remoteAuthService : new mbp.RemoteAuthenticationService(SEOLAN_BASE_URL, 6000)
};

mbp.Slopes.workflows = {
    authWorkflow : undefined
};