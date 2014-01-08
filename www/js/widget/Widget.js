"use strict";

/**
 * Abstract constructor for doT widgets. Has strong dependencies on jQuery and DOM elements
 * @constructor
 * @param {String} templateSelector jQuery selector for DOM element containing doT template source
 * @param {String} hookSelector jQuery selector for DOM element to populate with the widget
 * @author ch4mp@c4-soft.com
 */
mbp.Widget = function(templateSelector, hookSelector) {
    var instance = this;
    
    // Display inside content div by default
    if (hookSelector == undefined) {
        hookSelector = '#content';
    }

    /**
     * Retrieves template source text.<br>
     * Applies variable data to it.<br>
     * Inserts replaces "hook" element content.
     * @param {Object} data as expected by doT template
     */
    this.show = function(data) {
        var appliedTemplate = instance.getAppliedTemplate(data);
        var hook = jQuery(hookSelector);
        hook.html(appliedTemplate);
        hook.trigger("create");
    };
    
    this.hide = function() {
        jQuery(hookSelector).html('').trigger("create");
    };
    
    this.getAppliedTemplate = function(data) {
        var templateText = '';
        jQuery(templateSelector).each(function(){
            templateText += jQuery(this).html();
        });
        return instance.applyTemplate(templateText, data);
    };

    /**
     * @param {String} templateText template source text
     * @param {Object} data as expected by doT template
     * @return {String} template text with placeholders replaced with actual values
     */
    this.applyTemplate = function(templateText, data) {
        var templateFunction = doT.template(templateText);
        return templateFunction(data);
    };
};