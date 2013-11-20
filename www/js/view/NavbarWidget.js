"use strict";

/**
 * Home Widget
 * 
 * @constructor
 * @author Ch4mp
 * 
 */
mbp.NavbarWidget = function(onHome, onSearch, onNewPiste, onMyPistes, onSettings) {
    mbp.Widget.call(this, '#dot-navbar', '#navbar');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display
     */
    this.display = function() {
        parentDisplay.call(this, null);
        
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