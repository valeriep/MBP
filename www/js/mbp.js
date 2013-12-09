"use strict";

/**
 * Application namespace
 */
var mbp = {
        i18n : {
            current : 'fr',
            gettext : function(widget, key) {
                var widgets = mbp.i18n[mbp.i18n.current], widgetStrings;
                if(widgets) {
                    widgetStrings = widgets[widget];
                    if(widgetStrings && widgetStrings.hasOwnProperty(key)) {
                        return widgetStrings[key];
                    }
                }
                return key;
            }
        },
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

function i18n(widget, key) {
    return mbp.i18n.gettext(widget, key);
}