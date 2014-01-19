"use strict";

var app;

module('SearchPisteWidget', {
    setup : function() {
        testCase =
                {
                    countries : [ 'Country 1', 'Country 2', 'Country 3' ],
                    areas : [ 'Area 1', 'Area 2', 'Area 3' ],
                    resortNames : {
                        'testResort' : 'Test Resort',
                        'otherTestResort' : 'Other Resort',
                        'yetAnotherResort' : 'Yet Another Resort'
                    },
                    resorts : [
                            mbp.Resort.build('testResort', '2014-01-12 16:01:30', 'Test Resort', 'Country 2', 'Area 2'),
                            mbp.Resort.build('otherTestResort', '2014-01-12 16:02:30', 'Other Resort', 'Country 2', 'Area 2'),
                            mbp.Resort.build('yetAnotherResort', '2014-01-12 16:03:30', 'Yet Another Resort', 'Country 2', 'Area 2') ],
                    pistes : [
                            mbp.Piste.build(
                                    'testPiste',
                                    '2014-01-12 16:08:10',
                                    'otherTestResort',
                                    'U1',
                                    'Test Piste',
                                    mbp.Piste.BLUE,
                                    'Blue test piste',
                                    mbp.PisteMarks.build('testPiste', '2014-01-12 16:08:30', null, null, null, null, null, null),
                                    [],
                                    0,
                                    true),
                            mbp.Piste.build(
                                    'otherTestPiste',
                                    '2014-01-12 16:09:10',
                                    'otherTestResort',
                                    'U1',
                                    'Other Test Piste',
                                    mbp.Piste.GREEN,
                                    'Green test piste',
                                    mbp.PisteMarks.build('otherTestPiste', '2014-01-12 16:09:30', 1, 2, 3, 3, 4, 5),
                                    [],
                                    1,
                                    true),
                            mbp.Piste.build(
                                    'yetAnotherTestPiste',
                                    '2014-01-12 16:10:10',
                                    'otherTestResort',
                                    'U1',
                                    'Yet Another Test Piste',
                                    mbp.Piste.RED,
                                    'Red test piste',
                                    mbp.PisteMarks.build('yetAnotherTestPiste', '2014-01-12 16:10:30', 4, 4, 4, 4, 4, 4),
                                    [],
                                    51,
                                    true) ]
                };
        app = {
            localResortRepo : {
                getAllCountries : function(onFound) {
                    onFound(testCase.countries);
                },
                getAreasByCountry : function(country, onFound) {
                    onFound(country == 'Country 2' ? testCase.areas : []);
                },
                getResortNamesByArea : function(area, onFound) {
                    onFound(area == 'Area 2' ? testCase.resortNames : []);
                },
                getAllResorts : function(onFound) {
                    onFound(testCase.resorts);
                },
                getResortsByArea : function(area, onFound) {
                    onFound(area == 'Area 2' ? testCase.resorts : []);
                },
                getResortById : function(resortId, onFound) {
                    if (resortId == 'otherTestResort') {
                        onFound(mbp.Resort.build('otherTestResort', '2014-01-12 15:10:30', 'Other Resort', 'Country 2', 'Area 2'));
                    } else {
                        onFound(null);
                    }
                },
            },
            localPisteRepo : {
                getPistesByResortId : function(resortId, onFound) {
                    onFound(resortId == 'otherTestResort' ? testCase.pistes : []);
                },
                getPisteById : function(pisteId, onFound) {
                    switch (pisteId) {
                    case 'testPiste':
                        onFound(testCase.pistes[0]);
                        break;
                    case 'otherTestPiste':
                        onFound(testCase.pistes[1]);
                        break;
                    case 'yetAnotherTestPiste':
                        onFound(testCase.pistes[2]);
                        break;
                    default:
                        onFound(null);
                    }
                },
                getPistesByCriteria : function(criteria, onFound) {
                    onFound(testCase.pistes);
                },
                getPistesByLastUpdate : function(limit, onFound) {
                    onFound(testCase.pistes);
                },
            },
            seolanRepo : {
                getCommentsPageByPisteId : function(pisteId, page, onFound) {
                    onFound([]);
                },
            },
            device : {
                isOnline : function() {
                    return true;
                },
            },
            syncService : {
                run : function(onDone) {
                    if(onDone) {
                        onDone();
                    }
                },
            },
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('form initialization', function() {
    var widget = new mbp.SearchPistesWidget('#content');
    widget.show();
    
    jQuery('#left-panel .search-pistes-form #country').val('Country 2').trigger('change');
    jQuery('#left-panel .search-pistes-form #area').val('Area 2').trigger('change');
    jQuery('#left-panel .search-pistes-form #resortId').val('otherTestResort').trigger('change');
    jQuery('#left-panel .search-pistes-form').submit();
    
    equal(jQuery('#content li a').length, 3);
    
    jQuery('#content li a:eq(2)').click();
    
    equal(jQuery('#content h2').text(), ' Yet Another Test Piste');
});