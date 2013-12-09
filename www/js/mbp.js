"use strict";

/**
 * Application namespace
 */
var mbp = {
        sanitize : function(text) {
            return text.replace(/</g,"&lt;").replace(/>/g,"&gt;");
        }
};