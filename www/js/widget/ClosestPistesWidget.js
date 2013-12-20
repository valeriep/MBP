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
    var mapWidget = new mbp.MapWidget('#main-canvas', onResortSelected);
    var resortsListWidget = new mbp.ResortListWidget('#main-canvas', onResortSelected);
    var mapListSwitch = new mbp.SwitchButtonsWidget('closestPistes', '#map-list-switch');
    var pistesListWidget = new mbp.PistesBriefWidget();
    var lastKnownLat = '', lastKnownLon = '';
    mapListSwitch.addOption('map', showMap);
    mapListSwitch.addOption('resortList', showList);
    app.localResortRepo.getAllResortsWithoutPistes(function(values) {
        resorts = values;
    });
    
    function showMap() {
        if(mapListSwitch.getChecked() != 'map') {
            mapListSwitch.check('map');
        } else {
            mapWidget.show({
                lat : lastKnownLat,
                lon : lastKnownLon,
                markers : resorts,
            });
        }
    }
    
    function showList() {
        if(mapListSwitch.getChecked() != 'resortList') {
            mapListSwitch.check('resortList');
        } else {
            resortsListWidget.show(resorts);
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
        lastKnownLat = position.coords.latitude;
        lastKnownLon = position.coords.longitude;
        showMap();
    }

    function onPositinError(error) {
        infoWidget.hide();
        mapListSwitch.setEnabled('map', false);
        showList();
        alert(error.message);
    }
    
    function onResortSelected(resortId) {
        var criteria = new mbp.SearchPistesCriteria('', '', resortId, '', '');
        app.localResortRepo.getPistesByCriteria(criteria, function(pistes) {
            pistesListWidget.show(pistes);
        });
    }

    Object.preventExtensions(this);
};