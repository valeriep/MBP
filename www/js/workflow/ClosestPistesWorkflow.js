"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWorkflow = function() {
    var closestPistesWidget = new mbp.ClosestPistesWidget();
    
    this.activate = function() {
        closestPistesWidget.show();
        jQuery(document).ready(function() {
            jQuery('#left-panel').panel('close');
            jQuery('#left-panel-button').hide();
        });
    };
};