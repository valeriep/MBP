"use strict";

slopes.AuthWorkflow = function(app, successCallback) {
    slopes.Workflow.call(this, successCallback, this.init);
    
    var instance = this;
    
    this.submit = function(login, password) {
        if(username !== app.user.getLogin()) {
            app.user = new slopes.SeolanUser(login, password);
        }
        
        if(login == password) {
            app.user.sessionId = 'TEST';
            instance.succeed();
        } else {
            instance.fail();
        }
    };

    this.init = function() {
        var authWidget = new slopes.AuthWidget(instance.submit, app.user);
        authWidget.display();
    };

    Object.preventExtensions(this);
};

slopes.AuthWorkflow.prototype.constructor = slopes.AuthWorkflow;