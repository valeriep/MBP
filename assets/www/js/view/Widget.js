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
     */
    this.display = function() {
        var templateText = $(templateSelector).html();
        var appliedTemplate = this.applyTemplate(templateText);
        $(hookSelector).html(appliedTemplate).trigger("create");
    };
    
    /**
     * @param {String} templateText template source text
     * @return {String} template text with placeholders replaced with actual values
     */
    this.applyTemplate = function(templateText) {
        var templateFunction = doT.template(templateText);
        return templateFunction(this.createTemplateData());
    };

    /**
     * Abstract method. Overloads should return an object filled with data to insert in the template
     * @return {Object} An object filled with data to insert in the template
     */
    this.createTemplateData = function() {
        throw new Error('Must be overriden');
    };
};