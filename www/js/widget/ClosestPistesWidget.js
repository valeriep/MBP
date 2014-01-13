"use strict";

/**
 * Home Widget
 * @constructor
 * @param {String} hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-closest-pistes', hookSelector);// parent constructor
    var parentDiplay = this.show;
    var infoWidget = new mbp.InfoWidget(instance.getJQuerySelector() + ' .position-info');
    var mapWidget = null;
    var resortsListWidget = new mbp.CountryToPisteWidget(instance.getJQuerySelector() + ' .main-canvas');
    var mapListSwitch = new mbp.SwitchButtonsWidget('closestPistes', instance.getJQuerySelector() + ' .map-list-switch');
    var pistesListWidget = new mbp.PistesBriefWidget(instance.getJQuerySelector() + ' .main-canvas', onPisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget(instance.getJQuerySelector() + ' .main-canvas');
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
            mapWidget = new mbp.MapWidget(instance.getJQuerySelector() + ' .main-canvas', position.coords.latitude, position.coords.longitude, onResortSelected);
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