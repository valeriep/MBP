"use strict";

/**
 * Abstract constructor for doT widgets. Has strong dependencies on jQuery and DOM elements 
 * @param templateSelector jQuery selector for DOM element containing doT template source
 * @param hookSelector jQuery selector for DOM element to populate with the widget
 * @returns {Widget}
 */
slopes.Widget = function(templateSelector, hookSelector) {
    // Display inside content div by default
    if (hookSelector == undefined) {
        hookSelector = 'div[data-role="content"]';
    }

    this.display = function() {
        var templateText = $(templateSelector).html();
        var appliedTemplate = this.applyTemplate(templateText);
        $(hookSelector).html(appliedTemplate);
    };

    this.applyTemplate = function(templateText) {
        var templateFunction = doT.template(templateText);
        return templateFunction(this.createTemplateData());
    };

    this.createTemplateData = function() {
        throw new Error('Must be overriden');
    };
};