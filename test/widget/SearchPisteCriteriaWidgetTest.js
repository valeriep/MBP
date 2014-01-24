"use strict";

var app;

module('SearchPisteCriteriaWidget', {
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
                getCountriesHavingPistes : function(onFound) {
                    onFound(testCase.countries);
                },
                getAreasByCountry : function(country, onFound) {
                    onFound(country == 'Country 2' ? testCase.areas : []);
                },
                getAreasHavingPistes : function(country, onFound) {
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
                getResortIdsHavingPistes : function(onFound) {
                    onFound(['testResort', 'otherTestResort', 'yetAnotherResort']);
                },
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
            },
            seolanRepo : {
                getCommentsPageByPisteId : function(pisteId, page, onFound) {
                    onFound([]);
                }
            },
            device : {
                isOnline : function() {
                    return true;
                }
            },
        };
        jQuery('#content').empty();
    },
    teardown : function() {
        jQuery('#content').empty();
    }
});
test('form initialization', function() {
    var iCall = 1;
    var widget = new mbp.SearchPisteCriteriaWidget('#content', function criteriaSet(val) {
        if(iCall == 1) {
            deepEqual(val.resortIds, []); // if no country, area or resort selected, no resortId should be present
            equal(val.color, null);
            equal(val.sunMin, 1);
            equal(val.sunMax, 5);
            equal(val.snowMin, 1);
            equal(val.snowMax, 5);
            equal(val.verticalDropMin, 1);
            equal(val.verticalDropMax, 5);
            equal(val.lengthMin, 1);
            equal(val.lengthMax, 5);
            equal(val.viewMin, 1);
            equal(val.viewMax, 5);
            equal(val.accessMin, 1);
            equal(val.accessMax, 5);
        } else if(iCall == 2 || iCall == 3) {
            deepEqual(val.resortIds, ['testResort', 'otherTestResort', 'yetAnotherResort']);
        } else {
            deepEqual(val.resortIds, ['otherTestResort']);
            equal(val.color, mbp.Piste.RED);
            equal(val.sunMin, 2);
            equal(val.sunMax, 4);
            equal(val.snowMin, 2);
            equal(val.snowMax, 4);
            equal(val.verticalDropMin, 2);
            equal(val.verticalDropMax, 4);
            equal(val.lengthMin, 2);
            equal(val.lengthMax, 4);
            equal(val.viewMin, 2);
            equal(val.viewMax, 4);
            equal(val.accessMin, 2);
            equal(val.accessMax, 4);
        }
        iCall++;
        return false;
    });
    widget.show();
    
    ok(jQuery('#content .search-pistes-form #country option').length);
    equal(jQuery('#content .search-pistes-form #country option[selected="true"]').val(), '');
    equal(jQuery('#content .search-pistes-form #color option').length, mbp.Piste.COLORS.length + 1);
    equal(jQuery('#content .search-pistes-form #color option[selected="true"]').val(), '');

    jQuery('#content .search-pistes-form #country').val('Country 2').trigger('change');
    jQuery('#content .search-pistes-form').submit();
    
    jQuery('#content .search-pistes-form #area').val('Area 2').trigger('change');
    jQuery('#content .search-pistes-form').submit();
    
    jQuery('#content .search-pistes-form #resortId').val('otherTestResort').trigger('change');
    jQuery('#content .search-pistes-form #color').val(mbp.Piste.RED).trigger('change');
    jQuery('#content .search-pistes-form #sun-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #sun-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form #snow-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #snow-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form #vertical-drop-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #vertical-drop-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form #length-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #length-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form #view-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #view-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form #access-mark-min').val(2).trigger('change');
    jQuery('#content .search-pistes-form #access-mark-max').val(4).trigger('change');
    jQuery('#content .search-pistes-form').submit();
    
    equal(iCall, 5);
});