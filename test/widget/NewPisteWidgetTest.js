"use strict";

var app, errors;

module('NewPisteWidget', {
    setup : function() {
        jQuery('#content').html('');
        app = {
            localResortRepo : {
                getAllCountries : function(onFound) {
                    onFound([ 'Country 1', 'Country 2' ]);
                },
                getAreasByCountry : function(selectedCountry, onFound) {
                    onFound([ 'Area 1', 'Area 2' ]);
                },
                getResortsByArea : function(selectedArea, onFound) {
                    onFound([ mbp.Resort.build('resort1', '2014-01-11 06:51:12', 'Resort 1', 'Country 1', 'Area 1'),
                            mbp.Resort.build('resort2', '2014-01-11 06:52:10', 'Resort 2', 'Country 1', 'Area 1'), ]);
                },
            },
            localPisteRepo : {
                getPistesByCriteria : function(criteria, onFound) {
                    onFound({
                        'piste1' : mbp.Piste.build('piste1', '2014-01-11 06:55:20', 'resort1', 'U1', 'Piste 1', mbp.Piste.RED),
                        'piste2' : mbp.Piste.build('piste2', '2014-01-11 06:57:20', 'resort1', 'U1', 'Piste 2', mbp.Piste.GREEN),
                    });
                },
                savePiste : function(piste) {
                    piste.id = 'piste3';
                },
            },
            user : new mbp.User('U1', 'Ch4mp', null, 'testSessionId'),
            device : {
                getPicture : function() {
                    return 'test/img/piste/testPiste1.jpg';
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
        jQuery('#content').html('');
    }
});
test('All form fields are taken', function() {
    var widget = new mbp.NewPisteWidget(function(piste) {
        ok(piste.id);
        equal(piste.name, 'Piste de test');
        equal(piste.color, mbp.Piste.BLUE);
        equal(piste.resortId, 'resort1');
        equal(piste.description, 'La piste parfaite pour le cas nominal des tests unitaires');
    });
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
    
    expect(5);
    jQuery('#new-piste-form').submit();
});
test('works with madatory fields only', function() {
    var widget = new mbp.NewPisteWidget(function(piste) {
        ok(piste.id);
        equal(piste.name, 'Piste de test');
        equal(piste.color, mbp.Piste.BLUE);
        equal(piste.resortId, 'resort1');
        equal(piste.description, '');
    });
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
    
    expect(5);
    jQuery('#new-piste-form').submit();
});