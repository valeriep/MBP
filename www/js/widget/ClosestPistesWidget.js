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
    var mapWidget = null;
    var resortsListWidget = new mbp.ResortListWidget('#main-canvas', onResortSelected);
    var mapListSwitch = new mbp.SwitchButtonsWidget('closestPistes', '#map-list-switch');
    var pistesListWidget = new mbp.PistesBriefWidget('#content', onPisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget();
    mapListSwitch.addOption('map', showMap);
    mapListSwitch.addOption('resortList', showList);
    
    function showMap() {
        if(!mapWidget) {
            mapListSwitch.setEnabled('map', false);
            showList();
        } else if(mapListSwitch.getChecked() != 'map') {
            mapListSwitch.check('map');
        } else {
            mapWidget.show();
        }
    }
    
    function showList() {
        if(mapListSwitch.getChecked() != 'resortList') {
            mapListSwitch.check('resortList');
        } else {
            resortsListWidget.show();
        }
    }

    this.show = function(title, text) {
        parentDiplay.call(this);
        infoWidget.show({
            text : gettext('closestPistes', 'waiting')
        });
        mapListSwitch.show();
        
        app.device.refreshPosition(onPositionSucess, onPositinError, true);
    };

    function onPositionSucess(position) {
        infoWidget.hide();
        if(!mapWidget) {
            mapWidget = new mbp.MapWidget('#main-canvas', position.coords.lat, position.coords.lng, onResortSelected);
            mapListSwitch.setEnabled('map', true);
        }
        if(mapListSwitch.getChecked() == 'map') {
            showMap();
        }
    }

    function onPositinError(error) {
        infoWidget.hide();
        if(!mapWidget) {
            mapListSwitch.setEnabled('map', false);
            showList();
            alert(error.message);
        }
    }
    
    function onResortSelected(resortId) {
        app.localPisteRepo.getPistesByResortId(resortId, function(pistes) {
            pistesListWidget.show(pistes);
        });
    }
    
    function onPisteSelected(piste) {
        pisteDetailWidget.show(piste);
    };

    Object.preventExtensions(this);
};