"use strict";

mbp.Workflow = function(successCallback, failureCallback) {
    this.init = function() {
        throw new Error('Must be overridden');
    };

    this.succeed = function() {
        successCallback();
    };

    this.fail = function() {
        failureCallback();
    };
};