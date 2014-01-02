"use strict";

/**
 * Single point for communication with remote Xsalto SeolanService services
 * 
 * @constructor
 * @param {String} moduleId
 * @param {String} functionName
 * @param {Number} pageSize
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanService = function(moduleId, functionName, pageSize) {
    var host = 'chromedev.xsalto.com';
    var remoteServiceUrl = 'http://' + host + '/tzr/scripts/admin.php?moid=' + moduleId + '&function=' + functionName + '&pagesize=' + pageSize;
    var instance = this;

    /**
     * used to prepare jQuery.ajax() parameter object
     */
    this.jQueryAjaxParams = {
        type : 'GET',
        dataType : 'json',
    };

    /**
     * Low level call to jQuery.ajax {@see getObject} or {@see trigger} for higher level wraps
     * 
     * @param {Object} data Data to send to SeolanService service
     * @param {Number} page
     * @param {Function} onSuccess success callback
     * @param {Function} onError error callback
     * @param {Boolean} isSync should call be synchronized
     * @param {Number} timeout Timeout in milliseconds
     */
    this.call = function(data, page, onSuccess, onError, isSync, timeout) {
        instance.jQueryAjaxParams.url = remoteServiceUrl + '&first=' + page * pageSize;
        
        instance.jQueryAjaxParams.data = data;

        instance.jQueryAjaxParams.success = onSuccess;

        if (onError) {
            instance.jQueryAjaxParams.error = onError;
        } else {
            delete instance.jQueryAjaxParams.error;
        }

        instance.jQueryAjaxParams.async = isSync ? false : true;

        if (timeout) {
            instance.jQueryAjaxParams.timeout = timeout;
        } else {
            delete instance.jQueryAjaxParams.timeout;
        }

        jQuery.ajax(instance.jQueryAjaxParams);
    };

    /**
     * Retrieves synchronously an object from SeolanService platform
     * 
     * @param {Object} data Data to send to SeolanService service
     * @param {Number} timeout Timeout in milliseconds
     * @param {Number} page
     * @return {Object} SeolanService service answer
     */
    this.getObject = function(data, timeout, page) {
        var answer = null;
        instance.call(data, page, success, error, true, timeout);
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
     * 
     * @param {Object} data Data to send to SeolanService service
     * @param {Function} onSuccess success callback
     * @param {Number} page
     * @param {Number} timeout Timeout in milliseconds
     */
    this.trigger = function(data, page, onSuccess, timeout) {
        instance.call(data, page, onSuccess, onError, false, timeout);
        function onError() {
            throw new Error('get Object from :"' + remoteServiceUrl + '" failed with: ' + JSON.stringify(data));
        }
    };

    /**
     * 
     * @param {String} id
     * @param {Number} width (optional)
     * @returns {String}
     */
    this.buildImgSrc = function(id, width) {
        var imgSrc = 'http://' + host + '/tzr/scripts-admin/resizer.php?mime=image%2Fjpeg&filename=' + escape(id);
        if (width) {
            imgSrc += '&geometry=' + width;
        }
        return imgSrc;
    };

};