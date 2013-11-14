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

    this.display = function() {
        parentDisplay.call(this);
        $('#newPisteForm').submit(
                function() {
                    var newPiste = new mbp.NewPiste(
                            $('#country').val(),
                            $('#massif').val(),
                            $('#resort').val(),
                            $('#name').val(),
                            $('#color').val(),
                            $('#description').val(),
                            $('#keywords').val());
                    onSubmit(newPiste);
                    return false; // interrupt submit chain
                });
        $('#newPisteForm .savePiste').click(function() {
            $('#newPisteForm').submit();
        });
    };

    Object.preventExtensions(this);
};