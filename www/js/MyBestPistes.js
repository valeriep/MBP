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
    var localAuthenticationService = new mbp.LocalAuthenticationService();
    //FIXME finalize remote authentication service
    var remoteAuthenticationService = new mbp.LocalAuthenticationService(); //new mbp.RemoteAuthenticationService();
    
    this.services = {
        authService : device.isOnline() ? remoteAuthenticationService : localAuthenticationService
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
        mbpRepo.restore(instance);
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
        if(localAuthenticationService != instance.services.authService) {
            localAuthenticationService.logout(instance.user);
        }
        instance.services.authService.logout(instance.user);
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
            var authWorkflow = new mbp.AuthWorkflow(instance.services, instance.user, instance.userAuthenticated);
            authWorkflow.enter();
        } else {
            var homeWidget = new mbp.SettingsWidget(instance.logout);
            homeWidget.display({
                user : instance.user,
                device : device
            });
            jQuery('.settings').addClass('ui-btn-active');

            var positionRefreshed = function(position) {
                var positionWidget = new mbp.PositionWidget(device);
                positionWidget.display(position);
            };
            var positionRefreshFailed = function(positionError) {
                var positionWidget = new mbp.PositionWidget(device);
                positionWidget.display(positionError);
            };
            device.refreshPosition(positionRefreshed, positionRefreshFailed);
        }
    };

    document.addEventListener("online", instance.onOnline, false);
    document.addEventListener("offline", instance.onOffline, false);
    
    jQuery(window).on('beforeunload', this.unload);
    jQuery('.home').click(function() {
        var resort = new mbp.Resort('testResortId', 'Test Resort', 'Test Country', 'Test Massif');
        
        var piste = new mbp.Piste('testPiste1', 'Test Piste 1', 'black', 'Black test piste', '../test/img/piste/testPiste1.jpg', 4, resort);
        new mbp.Comment('testComment1', 'First test comment', 4, 1, piste);
        new mbp.Comment('testComment2', 'Second test comment', 5, 1, piste);
        
        piste = new mbp.Piste('testPiste2', 'Test Piste 2', 'green', 'Green test piste', '../test/img/piste/testPiste2.jpg', 2.5, resort);
        new mbp.Comment('testComment3', 'Third test comment', 1, 4, piste);
        new mbp.Comment('testComment4', '4th test comment', 1, 4, piste);
        
        piste = new mbp.Piste('testPiste3', 'Test Piste 3', 'red', 'Red test piste', 'img/bckgrnd.jpg', undefined, resort);
        new mbp.Comment('testComment5', '5th test comment', 3, 2, piste);
        new mbp.Comment('testComment6', 'Test comment n°6', 3, 3, piste);
        
        var widget = new mbp.PistesBriefWidget();
        widget.display(resort);
    });
    jQuery('.search').click(function() {
        instance.enter();
    });
    jQuery('.new-piste').click(function() {
        function newPisteSubmitted(name) {
            
        };
        var newPisteWidget = new mbp.NewPisteWidget(newPisteSubmitted);
        
        newPisteWidget.display();
    });
    jQuery('.my-pistes').click(function() {
        instance.enter();
    });
    jQuery('.settings').click(function() {
        instance.enter();
    });
};