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
        
        jQuery('.home').unbind('click').click(function() {
            onHome();
        });
        jQuery('.search').unbind('click').click(function() {
            onSearch();
        });
        jQuery('.new-piste').unbind('click').click(function() {
            onNewPiste();
        });
        jQuery('.my-pistes').unbind('click').click(function() {
            onMyPistes();
        });
        jQuery('.settings').unbind('click').click(function() {
            onSettings();
        });
    };
    
    this.clickSearch = function() {
        jQuery('.search').click();
    };

    Object.preventExtensions(this);
};