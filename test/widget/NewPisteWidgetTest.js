"use strict";

var testNewPisteSubmitted = function() {
    ok(true);
};

var errors = null;

module('NewPisteWidget', {
    setup : function() {
        jQuery('#content').html('');
        var resorts = new mbp.TestCase().getResorts();
        /** @type mbp.Resort */
        var resort = resorts[Object.keys(resorts)[0]];
        var resortRepo = new mbp.LocalResortRepository();
        resortRepo.clear();
        resortRepo.saveResort(resort);
        app.user = new mbp.User('U1', 'Ch4mp', null, 'testSessionId');
        app.device.getPicture = function() {
            return 'test/img/piste/testPiste1.jpg';
        };
        app.resortsSyncService.run = function() {
        };
        errors = {};
    },
    teardown : function() {
        jQuery('#content').html('');
        app = new mbp.MyBestPistes();
    }
});
test('New piste form is diplayed in content div', function() {
    var widget = new mbp.NewPisteWidget();
    widget.show(new Array('Country 1', 'Country 2', 'Country 3'));
    ok(jQuery('#content').html());
});