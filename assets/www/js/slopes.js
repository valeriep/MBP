"use strict";

var slopes = {};

slopes.Slopes = function() {
    var app = this;
    var slopesRepo = new slopes.SlopesRepository(app);
    
    var authCallback = function(response) {
        jQuery('div[data-role="content"]').html('authentication succeded, user is: "' + JSON.stringify(app.user) + '"');
        return false;
    };
    var authWorkflow = new slopes.AuthWorkflow(app, authCallback);
    
    this.user = undefined;
    
    this.load = function() {
        slopesRepo.restore();
        authWorkflow.init();
    };
    
    this.unload = function() {
        slopesRepo.save();
    };

    jQuery(window).on('beforeunload', this.unload);
};