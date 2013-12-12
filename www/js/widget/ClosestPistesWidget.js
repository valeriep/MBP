"use strict";

/**
 * Home Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWidget = function() {
    mbp.Widget.call(this, '#dot-closest-pistes');// parent constructor
    var parentDiplay = this.show;
    var infoWidget = new mbp.InfoWidget('#position-info');
    var pistesBriefWidget = new mbp.PistesBriefWidget('#pistes-brief');

    this.show = function(title, text) {
        parentDiplay.call(this);
        infoWidget.show({ text : 'Waiting for position'});
        pistesBriefWidget.show(new Array());
        app.device.refreshPosition(onPositionSucess, onPositinError);
    };
    
    function onPositionSucess(position) {
        app.seolanResortRepo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    };
    
    function onPositinError(error) {
        infoWidget.hide();
        pistesBriefWidget.show(new Array());
        alert(error.message);
    };
    
    function onPistesRetrieved(pistes){
        infoWidget.hide();
        pistesBriefWidget.show(pistes);
    };

    Object.preventExtensions(this);
};