"use strict";

/**
 * Authentication Widget
 * 
 * @constructor
 * @param {Function} onSubmit submit event handler
 * @author Ch4mp
 * 
 */
mbp.SearchPistesWidget = function(onSubmit) {
    mbp.Widget.call(this, '#dot-search-pistes');// parent constructor
    var parentDisplay = this.display;// save reference to Widget display function to call it from overloading function

    this.display = function() {
        parentDisplay.call(this);
        $('#search-pistes-form').submit(
                function() {
                    var criteria = new mbp.SearchPistesCriteria(
                            $('#country').val(),
                            $('#massif').val(),
                            $('#resort').val(),
                            $('#name').val(),
                            $('#color').val(),
                            $('#keywords').val());
                    onSubmit(criteria);
                    return false; // interrupt submit chain
                });
        $('#search-pistes-form .search-pistes').click(function() {
            $('#search-pistes-form').submit();
        });
    };

    Object.preventExtensions(this);
};