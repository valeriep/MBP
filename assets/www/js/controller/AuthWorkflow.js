"use strict";

mbp.AuthWorkflow = function(app, successCallback) {
    mbp.Workflow.call(this, successCallback, this.init);
    
    var instance = this;
    
    this.submit = function(login, password) {
        if(username !== app.user.getLogin()) {
            app.user = new mbp.SeolanUser(login, password);
        }
        
        if(login == password) {
            app.user.sessionId = 'TEST';
            instance.succeed();
        } else {
            instance.fail();
        }
    };

    this.init = function() {
        var authWidget = new mbp.AuthWidget(instance.submit, app.user);
        authWidget.display();
    };

    Object.preventExtensions(this);
};

mbp.AuthWorkflow.prototype.constructor = mbp.AuthWorkflow;