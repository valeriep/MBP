"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ListPistesWorkflow = function() {
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function(pistes) {
        pistesBriefWidget.display(pistes);
    };
};