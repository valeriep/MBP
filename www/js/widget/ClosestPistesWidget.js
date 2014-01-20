"use strict";

/**
 * Home Widget
 * @constructor
 * @param {String} hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.ClosestPistesWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-closest-pistes', hookSelector);// parent constructor
    var instance = this, parentDiplay = this.show;
    var infoWidget = new mbp.InfoWidget(instance.getJQuerySelector() + ' .position-info');
    var mapWidget = null, isMapActive = false;
    var resortsListWidget = new mbp.CountryToPisteWidget(instance.getJQuerySelector() + ' .main-canvas');
    var pistesListWidget = new mbp.PistesBriefWidget(instance.getJQuerySelector() + ' .main-canvas', onPisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget(instance.getJQuerySelector() + ' .main-canvas');
    
    function showMap() {
        if(!mapWidget) {
            showList();
        } else {
            isMapActive = true;
            jQuery('#left-panel-button').removeClass('ui-icon-list-active');
            jQuery('#left-panel-button').addClass('ui-icon-map-active');
            mapWidget.show();
        }
    }
    
    function showList() {
        isMapActive = false;
        jQuery('#left-panel-button').removeClass('ui-icon-map-active');
        jQuery('#left-panel-button').addClass('ui-icon-list-active');
        resortsListWidget.show();
    }

    this.show = function(title, text) {
        parentDiplay.call(this);
        infoWidget.show({
            text : gettext('closestPistes', 'waiting')
        });
        jQuery('#content .main-canvas').on('remove', function() {
            jQuery('#left-panel-button').hide();
            jQuery('#left-panel-button').removeClass('ui-icon-map-active');
            jQuery('#left-panel-button').removeClass('ui-icon-list-active');
        });
        jQuery(document).ready(function() {
            jQuery('#left-panel-button').show();
        });
        jQuery('#left-panel-button').unbind('click').click(function(event) {
            event.preventDefault();
            if(isMapActive) {
                showList();
            } else {
                showMap();
            }
            return false;
        });
        showList();
        app.device.refreshPosition(onPositionSucess, onPositinError, false);
        app.syncService.run();
    };

    function onPositionSucess(position) {
        infoWidget.hide();
        if(!mapWidget) {
            mapWidget = new mbp.MapWidget(instance.getJQuerySelector() + ' .main-canvas', position.coords.latitude, position.coords.longitude, onResortSelected);
        }
    }

    function onPositinError(error) {
        infoWidget.hide();
        if(!mapWidget) {
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