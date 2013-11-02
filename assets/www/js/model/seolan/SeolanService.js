"use strict";

/**
 * Single point for communication with remote Xsalto SeolanService services
 * @constructor
 * @Author ch4mp@c4-soft.com
 */
mbp.SeolanService = function(moduleId, functionName) {
    var remoteServiceUrl = 'http://dynastar-chrome.xsalto.com/tzr/scripts/admin.php?moid=' + moduleId + '&function=' + functionName;
    var instance = this;
    
    /**
     * used to prepare jQuery.ajax() parameter object
     */
    this.jQueryAjaxParams = {
        type : 'POST',
        dataType : 'json',
        url : remoteServiceUrl
    };

    /**
     * Low level call to jQuery.ajax {@see getObject} or {@see trigger} for higher level wraps
     * @param {Object} data Data to send to SeolanService service
     * @param {Function} onSuccess success callback
     * @param {Function} onError error callback
     * @param {Boolean} isSync should call be synchronized
     * @param {Number} timeout Timeout in milliseconds
     */
    this.call = function(data, onSuccess, onError, isSync, timeout) {
        instance.jQueryAjaxParams.data = data;
        instance.jQueryAjaxParams.success = onSuccess;
        if(onError) {
            instance.jQueryAjaxParams.error = onError;
        } else {
            delete instance.jQueryAjaxParams.error;
        }
        instance.jQueryAjaxParams.async = isSync ? false : true;
        if(timeout) {
            instance.jQueryAjaxParams.timeout = timeout;
        } else {
            delete instance.jQueryAjaxParams.timeout;
        }
        jQuery.ajax(instance.jQueryAjaxParams);
    };
    
    /**
     * Retrieves synchronously an object from SeolanService platform
     * @param {Object} data Data to send to SeolanService service
     * @param {Number} timeout Timeout in milliseconds
     * @return {Object} SeolanService service answer
     */
    this.getObject = function(data, timeout){
        var answer = null;
        instance.call(data, success, error, true, timeout);
        function success(result) {
            answer = result;
        }
        function error() {
            throw new Error('get Object from :"' + remoteServiceUrl + '" failed with: ' + JSON.stringify(data));
        }
        return answer;
    };
    
    /**
     * Calls an asynchronous service from SeolanService platform
     * @param {Object} data Data to send to SeolanService service
     * @param {Function} onSuccess success callback
     * @param {Number} timeout Timeout in milliseconds
     */
    this.trigger = function(data, onSuccess, timeout){
        instance.call(data, onSuccess, onError, false, timeout);
        function onError() {
            throw new Error('get Object from :"' + remoteServiceUrl + '" failed with: ' + JSON.stringify(data));
        }
    };
    
};