"use strict";

var app, errors;

module('NewPisteWidget', {
    setup : function() {
        jQuery('#content').empty();
        app = {
            localResortRepo : {
                getAllCountries : function(onFound) {
                    onFound([ 'Country 1', 'Country 2' ]);
                },
                getAreasByCountry : function(selectedCountry, onFound) {
                    onFound(selectedCountry ? [ 'Area 1', 'Area 2' ] : []);
                },
                getResortsByArea : function(selectedArea, onFound) {
                    onFound(selectedArea ? [ mbp.Resort.build('resort1', '2014-01-11 06:51:12', 'Resort 1', 'Country 1', 'Area 1'),
                            mbp.Resort.build('resort2', '2014-01-11 06:52:10', 'Resort 2', 'Country 1', 'Area 1'), ] : []);
                },
                getResortById : function(resortId, onFound) {
                    onFound(mbp.Resort.build('resort1', '2014-01-11 06:51:12', 'Resort 1', 'Country 1', 'Area 1'));
                },
            },
            localPisteRepo : {
                getPistesByResortId : function(criteria, onFound) {
                    onFound([
                        mbp.Piste.build('piste1', '2014-01-11 06:55:20', 'resort1', 'U1', 'Piste 1', mbp.Piste.RED),
                        mbp.Piste.build('piste2', '2014-01-11 06:57:20', 'resort1', 'U1', 'Piste 2', mbp.Piste.GREEN),
                    ]);
                },
                savePiste : function(piste) {
                    piste.id = 'piste3';
                },
            },
            user : mbp.User.build('U1', 'Ch4mp', null, 'testSessionId'),
            device : {
                getPicture : function() {
                    return 'test/img/piste/testPiste1.jpg';
                },
                isOnline : function() {
                    return false;
                },
            },
            syncService : {
                run : function() {
                },
            },
        };

        errors = {};
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('All form fields are taken', function() {
    var widget = new mbp.NewPisteWidget('#content');
    widget.show();
    jQuery('#country').val('Country 1');
    jQuery('#country').trigger('change');
    jQuery('#area').val('Area 1');
    jQuery('#area').trigger('change');
    jQuery('#resortId').val('resort1');
    jQuery('#resortId').trigger('change');
    jQuery('#name').val('Piste de test');
    jQuery('#name').trigger('change');
    jQuery('#color').val(mbp.Piste.BLUE);
    jQuery('#color').trigger('change');
    jQuery('#description').val('La piste parfaite pour le cas nominal des tests unitaires');
    jQuery('#description').trigger('change');
    
    jQuery('#content .new-piste-form').submit();
    equal(jQuery('#content h2').text(), ' Piste de test');
});
test('works with madatory fields only', function() {
    var widget = new mbp.NewPisteWidget('#content');
    widget.show();
    jQuery('#country').val('Country 1');
    jQuery('#country').trigger('change');
    jQuery('#area').val('Area 1');
    jQuery('#area').trigger('change');
    jQuery('#resortId').val('resort1');
    jQuery('#resortId').trigger('change');
    jQuery('#name').val('Piste de test');
    jQuery('#name').trigger('change');
    jQuery('#color').val(mbp.Piste.BLUE);
    jQuery('#color').trigger('change');

    jQuery('#content .new-piste-form').submit();
    equal(jQuery('#content h2').text(), ' Piste de test');
});