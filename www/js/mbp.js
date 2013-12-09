"use strict";

/**
 * Application namespace
 */
var mbp = {
        sanitize : function(text) {
            return text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        },
        setStringProperty : function(val) {
            if(val == null) {
                return '';
            }
            if(val == undefined) {
                return '';
            }
            return val;
        }
};