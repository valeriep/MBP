"use strict";

/**
 * Home Widget
 * @constructor
 * @param {Function} onHome
 * @param {Function} onSearch
 * @param {Function} onNewPiste
 * @param {Function} onMyPistes
 * @author ch4mp@c4-soft.com
 */
mbp.NavbarWidget = function(onHome, onSearch, onNewPiste, onMyPistes) {
    mbp.Widget.call(this, '#dot-navbar', '#navbar');
    var instance = this, parentShow = this.show;

    /**
     * Triggers Widget display
     */
    this.show = function() {
        parentShow.call(this, null);
        
        jQuery('#navbar .home').unbind('click').click(function() {
            onHome();
        });
        jQuery('#navbar .search').unbind('click').click(function() {
            onSearch();
        });
        jQuery('#navbar .new-piste').unbind('click').click(function() {
            onNewPiste();
        });
        jQuery('#navbar .my-pistes').unbind('click').click(function() {
            onMyPistes();
        });
    };
    
    this.clickSearch = function() {
        jQuery('#navbar .search').click();
    };
    
    function onMenuKeyDown() {
        jQuery('#navbar').toggle();
    }

    document.addEventListener("menubutton", onMenuKeyDown, false);
    document.addEventListener("searchbutton", instance.clickSearch, false);
    Object.preventExtensions(this);
};