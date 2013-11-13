"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 * 
 */
mbp.NewPisteWidget = function(onSubmit) {
    mbp.Widget.call(this, '#dot-new-piste');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    /**
     * Triggers Widget display and registers UI & form event handlers
     * @param {mbp.User} user User to authenticate. If provided it is used to fill "username" field
     */
    this.display = function() {
        parentDisplay.call(this);
        $('.newPisteForm').submit(function() {
            onSubmit($('#name').val());
            return false; // interrupt submit chain
        });
        $('.newPisteForm .savePiste').click(function() {
            $('.newPisteForm').submit();
        });
    };

    Object.preventExtensions(this);
};