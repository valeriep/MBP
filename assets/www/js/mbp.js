"use strict";

var mbp = {};

mbp.Slopes = function() {
    var app = this;
    var mbpRepo = new mbp.SlopesRepository(app);
    
    var authCallback = function(response) {
        jQuery('div[data-role="content"]').html('authentication succeded, user is: "' + JSON.stringify(app.user) + '"');
        return false;
    };
    var authWorkflow = new mbp.AuthWorkflow(app, authCallback);
    
    this.user = undefined;
    
    this.load = function() {
        mbpRepo.restore();
        authWorkflow.init();
    };
    
    this.unload = function() {
        mbpRepo.save();
    };

    jQuery(window).on('beforeunload', this.unload);
};