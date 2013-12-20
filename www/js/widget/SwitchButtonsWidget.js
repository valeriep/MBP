"use strict";

/**
 * 
 * @param {String} i18nSection
 * @param {i18nSection} hookSelector
 * @param {Boolean} orientation optional, default is horizontal
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SwitchButtonsWidget = function(i18nSection, hookSelector, orientation) {
    mbp.Widget.call(this, '#dot-switch-buttons', hookSelector);// parent constructor
    var instance = this, parentShow = this.show;
    var handlers = {};
    var data = {orientation : orientation, checked : null};

    this.show = function() {
        var labels = {}, value = null;
        for(value in handlers) {
            labels[value] = gettext(i18nSection, value);
        }
        data.options = labels;
        if(data.checked === null) {
            data.checked = Object.keys(handlers)[0];
        }
        parentShow.call(instance, data);
        
        for(value in handlers) {
            jQuery(hookSelector + " input[type='radio']").unbind('change').bind('change', function(event, ui) {
                var value = event.currentTarget.id.replace('-switch-button', '');
                data.checked = value;
                handlers[value]();
            });
        }
        handlers[data.checked]();
    };
    
    this.addOption = function(value, onClick) {
        handlers[value] = onClick;
    };
    
    this.check = function(value) {
        if(handlers.hasOwnProperty(value)) {
            data.checked = value;
            jQuery('.switch-button').prop("checked", false).checkboxradio("refresh");
            jQuery('#' + value + '-switch-button').prop("checked", true).checkboxradio("refresh");
            handlers[value]();
        } else {
            data.checked = null;
        }
    };
    
    this.setEnabled = function(value, isEnabled) {
        jQuery('#' + value + '-switch-button').prop("disabled", !isEnabled);
    };
    
    this.getChecked = function() {
        return data.checked;
    };

    Object.preventExtensions(this);
};