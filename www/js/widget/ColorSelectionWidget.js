"use strict";

/**
 * @constructor
 * @param {String} jQuerySelector where to insert widget content
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.ColorSelectionWidget = function(jQuerySelector, isMandatory, onValueChanged) {
    mbp.SelectionWidget.call(this, '#dot-value-select', jQuerySelector, 'color', gettext('colorSelection', 'color'), isMandatory, onValueChanged);// parent constructor

    Object.preventExtensions(this);
};