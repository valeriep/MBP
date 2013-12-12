"use strict";

/**
 * Home Widget
 * @constructor
 * @param {Function} onLogout
 * @author ch4mp@c4-soft.com
 */
mbp.SettingsWidget = function(onLogout) {
    mbp.Widget.call(this, '#dot-settings');// parent constructor
    var parentDisplay = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display
     */
    this.show = function() {
        parentDisplay.call(this, app);
        jQuery('.logout').unbind('click').click(function() {
            onLogout();
        });
    };

    Object.preventExtensions(this);
};