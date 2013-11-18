"use strict";

/**
 * Home Widget
 * 
 * @constructor
 * @author Ch4mp
 * 
 */
mbp.NavbarWidget = function(onHome, onSearch, onNewPiste, onMyPistes, onSettings) {
    mbp.Widget.call(this, '#dot-navbar', 'div[data-role="footer"]');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display
     * @param {Object} data User to authenticate and Device. If provided it is used to fill "username" field
     */
    this.display = function(data) {
        parentDisplay.call(this, data);

        jQuery('.home').click(function() {
            onHome();
        });
        jQuery('.search').click(function() {
            onSearch();
        });
        jQuery('.new-piste').click(function() {
            onNewPiste();
        });
        jQuery('.my-pistes').click(function() {
            onMyPistes();
        });
        jQuery('.settings').click(function() {
            onSettings();
        });
    };

    Object.preventExtensions(this);
};