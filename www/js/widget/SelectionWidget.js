"use strict";

/**
 * @constructor
 * @param {String} jQueryTemplateSelector where to get doT template from
 * @param {String} jQueryInsertSelector where to insert widget content
 * @param {String} selectId
 * @param {String} label
 * @param {Boolean} isMandatory
 * @param {Function} onValueChanged
 * @author ch4mp@c4-soft.com
 */
mbp.SelectionWidget = function(jQueryTemplateSelector, jQueryInsertSelector, selectId, label, isMandatory, onValueChanged) {
    mbp.Widget.call(this, jQueryTemplateSelector, jQueryInsertSelector);// parent constructor
    var parentShow = this.show;
    var selected = '';

    this.show = function(values) {
        if (values instanceof Array) {
            if(values.indexOf(selected) == -1) {
                selected = '';
            }
        } else if(!values.hasOwnProperty(selected)) {
            selected = '';
        }

        parentShow.call(this, {
            selectId : selectId,
            label : label,
            options : values,
            selected : selected,
            mandatory : isMandatory,
        });

        jQuery(jQueryInsertSelector + ' select').unbind('change').change(function() {
        	if(jQuery(this).val() == "0") jQuery(this).addClass("empty");
            else jQuery(this).removeClass("empty")
            
        	var newValue = jQuery(jQueryInsertSelector + ' select').selectmenu("refresh").val();
            setVal(newValue);
        });

        if (onValueChanged) {
            onValueChanged(selected);
        }
    };

    this.getSelected = function() {
        return selected ? selected : null;
    };

    this.setSelected = function(newValue) {
        jQuery(jQueryInsertSelector + ' select').val(newValue);
        setVal(newValue);
    };
    
    function setVal(newValue) {
        selected = newValue;
        if (onValueChanged) {
            onValueChanged(selected);
        }
    };
};