"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ListPistesWorkflow = function(app) {
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function(pistes) {
        pistesBriefWidget.display(pistes, app.user);
    };
};