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
    var device = new mbp.Device();

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
        instance.enter();
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
            var homeWidget = new mbp.HomeWidget(instance.logout);
            homeWidget.display({
                user : instance.user,
                device : device
            });
        }
    };

    jQuery(window).on('beforeunload', this.unload);
    jQuery('.home').click(function() {
        instance.enter();
    });
    jQuery('.closestPistes').click(function() {
        var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
        
        var piste = new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', '../../test/img/piste/testPiste1.jpg', 4, resort);
        new mbp.Comment('testComment1', 'First test comment', 4, 1, piste);
        new mbp.Comment('testComment2', 'Second test comment', 5, 1, piste);
        
        piste = new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', '../../test/img/piste/testPiste2.jpg', 2.5, resort);
        new mbp.Comment('testComment3', 'Third test comment', 1, 4, piste);
        new mbp.Comment('testComment4', '4th test comment', 1, 4, piste);
        
        piste = new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/bckgrnd.jpg', undefined, resort);
        new mbp.Comment('testComment5', '5th test comment', 3, 2, piste);
        new mbp.Comment('testComment6', 'Test comment n°6', 3, 3, piste);
        
        var widget = new mbp.PistesBriefWidget();
        widget.display(resort);
    });
    jQuery('.newPiste').click(function() {
        jQuery('div[data-role="content"]').html('');
    });
};