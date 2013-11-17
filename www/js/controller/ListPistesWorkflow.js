"use strict";

mbp.ListPistesWorkflow = function() {
    var pistesBriefWidget = new mbp.PistesBriefWidget();
    
    this.activate = function(pistes) {
        pistesBriefWidget.display(pistes);
    };
};