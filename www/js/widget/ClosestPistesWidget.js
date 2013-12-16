"use strict";

/**
 * Home Widget
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWidget = function() {
    mbp.Widget.call(this, '#dot-closest-pistes');// parent constructor
    var parentDiplay = this.show, resorts = null;
    var infoWidget = new mbp.InfoWidget('#position-info');
    var mapWidget = new mbp.MapWidget('#main-canvas');
    var resortsWidget = new mbp.ResortListWidget('#main-canvas');
    var mapListSwitch = new mbp.SwitchButtonsWidget('closestPistes', '#map-list-switch');
    mapListSwitch.addOption('map', showMap);
    mapListSwitch.addOption('resortList', showList);
    app.localResortRepo.getAllResortsWithoutPistes(function(values) {
        resorts = values;
    });
    
    function showMap() {
        mapWidget.show({
            lat : '44.4098',
            lon : '6.351'
        });
    }
    
    function showList() {
        resortsWidget.show(resorts);
    }

    this.show = function(title, text) {
        parentDiplay.call(this);
        infoWidget.show({
            text : gettext('closestPistes', 'waiting')
        });
        mapListSwitch.show();
        
        //        app.device.refreshPosition(onPositionSucess, onPositinError, true);
    };

    function onPositionSucess(position) {
        app.seolanResortRepo.getPistesCloseTo(position.coords.latitude, position.coords.longitude, onPistesRetrieved);
    }

    function onPositinError(error) {
        infoWidget.hide();
        pistesBriefWidget.show(new Array());
        alert(error.message);
    }

    function onPistesRetrieved(pistes) {
        infoWidget.hide();
        pistesBriefWidget.show(pistes);
    }

    Object.preventExtensions(this);
};