"use strict";

/**
 * 
 * @constructor
 * @param {String} hookSelector
 * @author ch4mp@c4-soft.com
 */
mbp.UserPistesWidget = function(hookSelector) {
    mbp.Widget.call(this, '#dot-user-pistes', hookSelector);
    var instance = this, parentShow = this.show;
    var pistesBriefWidget = new mbp.PistesBriefWidget(hookSelector + ' .user-pistes', pisteSelected);
    var pisteDetailWidget = new mbp.PisteDetailWidget(hookSelector + ' .user-pistes');
    
    this.show = function() {
        if(!app.user || !app.user.isAuthenticated()) {
            var authWidget = new mbp.AuthWidget(hookSelector, instance.show);
            authWidget.show();
            return;
        }
        parentShow(this);
        app.localPisteRepo.getPistesByCreatorId(app.user.id, function(pistes) {
            pistesBriefWidget.show(pistes);
        });
    };
    
    function pisteSelected(piste) {
        pisteDetailWidget.show(piste);
    };
};