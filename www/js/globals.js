"use strict";

/**
 * Application namespace
 */
var mbp = {
    /**
     * 
     * @param {String} text
     */
    sanitize : function(text) {
        return text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    },
    /**
     * 
     * @param {String} val
     */
    setStringProperty : function(val) {
        if (val == null) {
            return '';
        }
        if (val == undefined) {
            return '';
        }
        return val;
    }
};

/** @type mbp.MyBestPistes */
var app;

var i18n = {
    gettext : function(widget, key) {
        var widgets = i18n[i18n.current], widgetStrings;
        if (widgets) {
            widgetStrings = widgets[widget];
            if (widgetStrings && widgetStrings.hasOwnProperty(key)) {
                return widgetStrings[key];
            }
        }
        return key;
    },
    setDefaultLanguage : function() {
        i18n.current = 'en';
    },
    setDeviceLanguage : function() {
        if (navigator.globalization) {
            navigator.globalization.getLocaleName(function(locale) {
                var language = locale.value.substring(0, 2);
                if (!i18n.hasOwnProperty(language)) {
                    i18n.setDefaultLanguage();
                } else {
                    i18n.current = language;
                }
            }, function() {
                alert('Error getting language\n');
            });
        } else {
            i18n.setDefaultLanguage();
        }
    },
};
i18n.current = i18n.setDeviceLanguage();

function gettext(widget, key) {
    return i18n.gettext(widget, key);
}