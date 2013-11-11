"use strict";

/**
 * Abstract constructor for doT widgets. Has strong dependencies on jQuery and DOM elements
 * @constructor
 * @param templateSelector jQuery selector for DOM element containing doT template source
 * @param hookSelector jQuery selector for DOM element to populate with the widget
 * @returns {Widget}
 */
mbp.Widget = function(templateSelector, hookSelector) {
    // Display inside content div by default
    if (hookSelector == undefined) {
        hookSelector = 'div[data-role="content"]';
    }

    /**
     * Retrieves template source text.<br>
     * Applies variable data to it.<br>
     * Inserts replaces "hook" element content.
     * @param {Object} data as expected by doT template
     */
    this.display = function(data) {
        var templateText = '';
        $(templateSelector).each(function(){
            templateText += $(this).html();
        });
        var appliedTemplate = this.applyTemplate(templateText, data);
        $(hookSelector).html(appliedTemplate).trigger("create");
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