"use strict";

/**
 * Home Widget
 * @constructor
 * @param hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.SettingsWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-settings', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display
     */
    this.show = function() {
        if (!app.user || !app.user.isAuthenticated()) {
            var authWidget = new mbp.AuthWidget(hookSelector, instance.show);
            authWidget.show();
            return;
        }
        parentShow.call(this, app);
        jQuery(' .logout').unbind('click').click(function() {
            app.logout();
        });
    };

    Object.preventExtensions(this);
};