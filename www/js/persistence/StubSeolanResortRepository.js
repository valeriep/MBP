"use strict";

/**
 * TODO replace stub implementations with calls to Seolan platform services
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.StubSeolanResortRepository = function() {
    //    var instance = this;
    //    var seolanResortById = new mbp.SeolanService('43', 'getResortById');
    var testCase = new mbp.TestCase();

    /**
     * 
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResortSummaries = function(onSummariesRetrieved) {
        var summaries = new Array();
        eachResort(function(resort) {
            summaries.push(new mbp.ResortSummary(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
        });
        onSummariesRetrieved(summaries);
    };

    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onSummariesRetrieved
     */
    this.getResortById = function(resortId, onSummariesRetrieved) {
        var resort = testCase.getResorts()[resortId];
        onSummariesRetrieved(new mbp.Resort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
    };

    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} pisteId
     * @param {Function} onSummariesRetrieved
     */
    this.getResortByPisteId = function(pisteId, onSummariesRetrieved) {
        eachResort(function(resort) {
            resort.eachPiste(function(piste) {
                if (piste.id == pisteId) {
                    onSummariesRetrieved(new mbp.Resort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
                }
            });
        });
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onPistesRetrieved
     */
    this.getPistesByResortId = function(resortId, onPistesRetrieved) {
        var pistes = new Array();
        testCase.getResorts()[resortId].eachPiste(function(piste) {
            pistes.push(piste);
        });
        onPistesRetrieved(pistes);
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
        var pistes = new Array();
        eachResort(function(resort) {
            if (resort) {
                pistes = pistes.concat(criteria.getMatchingPistes(resort));
            }
        });
        onPistesRetrieved(pistes);
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {String} userId
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCreator = function(userId, onPistesRetrieved) {
        var pistes = new Array();
        eachPiste(function(piste) {
            if (piste.creatorId == userId) {
                pistes.push(piste);
            }
        });
        onPistesRetrieved(pistes);
    };

    /**
     * 
     * @param {String} latitude
     * @param {String} longitude
     * @param {Function} onPistesRetrieved
     */
    this.getPistesCloseTo = function(latitude, longitude, onPistesRetrieved) {
        var resorts = testCase.getResorts();
        var pistes = new Array(
                resorts['C1_M1_R1'].getPiste('C1_M1_R1_P1'),
                resorts['C1_M1_R1'].getPiste('C1_M1_R1_P2'),
                resorts['C3_M1_R4'].getPiste('C3_M1_R4_P1'),
                resorts['C3_M1_R4'].getPiste('C3_M1_R4_P2'));
        onPistesRetrieved(pistes);
    };

    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
        piste.lastUpdate = '42';
        testCase.getResorts()[piste.getResort().id].addPiste(piste.clone());
    };

    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addMarks = function(userId, marks) {
        var pisteToUpdate = null;
        eachPiste(function(piste) {
            if(piste.id == marks.pisteId) {
                pisteToUpdate = piste;
            }
        });
        if(pisteToUpdate) {
            pisteToUpdate.addUserMarks(userId, marks.clone());
        }
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        var pisteId = comment.getPiste().id, resortId = comment.getPiste().getResort().id;
        testCase.getResorts()[resortId].getPiste(pisteId).addComment(comment.clone());
    };

    function eachResort(func) {
        var resorts = testCase.getResorts(), resortId = null;
        for (resortId in resorts) {
            func(resorts[resortId]);
        }
    };

    function eachPiste(func) {
        eachResort(function(resort) {
            resort.eachPiste(func);
        });
    };

    /**
     * 
     * @returns {mbp.ResortSummaries} a brief of resorts structured by country and area
     */
    this.getRessortSummaries = function(onSummariesRetrieved) {
        var resortSummaryArray = new Array();
        var resorts = testCase.getResorts(), resortId = null, resort;
        for (resortId in resorts) {
            resort = resorts[resortId];
            resortSummaryArray.push(new mbp.ResortSummary(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
        }
        onSummariesRetrieved(new mbp.ResortSummaries(resortSummaryArray));
    };

    /**
     * Last time comments where added or removed in each piste of given resort
     * {
     *     lucAlphand : '2013-11-22 07:07:33',
     *     ...
     * }
     * @param {String} resortId
     * @returns {Object} a map of update ids (time-stamp or whatever) by piste id
     */
    this.getPistesUpdates = function(resortId, onUpdatesRetrieved) {
        onUpdatesRetrieved(testCase.getPistesUpdates(resortId));
    };
};

/**
 * TODO move to somewhere in tests when not used any more by stubbed StubSeolanResortRepository
 * 
 * @returns {mbp.TestCase}
 */
mbp.TestCase = function() {
    var resorts = {};
    var resortsUpdates = {};
    var pistesUpdates = {};
    var countriesUpdates = {};
    var areasUpdates = {};

    populateResorts();

    /**
     * @param {mbp.Piste} piste
     * @param {Number} pisteChrono
     */
    function populateComments(piste, pisteChrono) {
        var commentChrono;

        commentChrono = 10 * pisteChrono + 1;
        new mbp.Comment(piste.id + '_C1', commentChrono.toString(), piste, 'U1', 'comment 1', true, null);

        commentChrono = 10 * pisteChrono + 2;
        new mbp.Comment(piste.id + '_C2', commentChrono.toString(), piste, 'U2', 'comment 2', true, null);

        commentChrono = 10 * pisteChrono + 3;
        new mbp.Comment(piste.id + '_C3', commentChrono.toString() + '3', piste, 'U1', 'comment 3', false, 'inappropriate');

        commentChrono = 10 * pisteChrono + 4;
        new mbp.Comment(piste.id + '_C4', commentChrono.toString() + '4', piste, 'U1', 'comment 4', null, null);

        piste.lastUpdate = commentChrono;
        pistesUpdates[piste.getResort().id][piste.id] = commentChrono;
    };

    /**
     * @param {mbp.Resort} resort
     * @param {Number} resortChrono
     */
    function populatePistes(resort, resortChrono) {
        var pisteId, piste, pisteChrono, marks;
        resorts[resort.id] = resort;
        if (!countriesUpdates[resort.country] || resortChrono > countriesUpdates[resort.country]) {
            countriesUpdates[resort.country] = resortChrono;
        }
        if (areasUpdates[resort.area] || resortChrono > areasUpdates[resort.area]) {
            areasUpdates[resort.area] = resortChrono;
        }
        pistesUpdates[resort.id] = {};

        pisteId = resort.id + '_P1';
        pisteChrono = 10 * resortChrono + 1;
        marks = new mbp.PisteMarks(1, 2.5, 3.4, 4.3, 5, pisteId, pisteChrono);
        piste = new mbp.Piste(pisteId, undefined, resort, 'U1', 'Piste 1', mbp.Piste.BLUE, 'piste bleue', null, marks, 42, true, null);
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P2';
        pisteChrono = 10 * resortChrono + 2;
        marks = new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5, pisteId, pisteChrono);
        piste = new mbp.Piste(resort.id + '_P2', undefined, resort, 'U2', 'Piste 2', mbp.Piste.GREEN, 'piste verte', null, marks, 22, true, null);
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P3';
        pisteChrono = 10 * resortChrono + 3;
        marks = new mbp.PisteMarks(0, 0, 0, 0, 0, pisteId, pisteChrono);
        piste = new mbp.Piste(resort.id + '_P3', undefined, resort, 'U1', 'Piste 3', mbp.Piste.RED, 'piste rouge', null, marks, 0, false, 'duplicate');
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P4';
        pisteChrono = 10 * resortChrono + 4;
        marks = new mbp.PisteMarks(5, 4, 3, 2, 1, pisteId, pisteChrono);
        piste = new mbp.Piste(resort.id + '_P4', undefined, resort, 'U1', 'Piste 4', mbp.Piste.BLACK, 'piste noire', null, marks, 1, null, null);
        piste.addUserMarks('U1', marks);
        populateComments(piste, pisteChrono);

        resort.lastUpdate = pisteChrono;
        resortsUpdates[resort.id] = pisteChrono;
    };

    function populateResorts() {
        var resort, resortChrono;

        resort = new mbp.Resort('C1_M1_R1', undefined, 'Resort 1', 'Country 1', 'Area 1');
        resortChrono = 1;
        populatePistes(resort, resortChrono);

        resort = new mbp.Resort('C1_M2_R2', undefined, 'Resort 2', 'Country 1', 'Area 2');
        resortChrono = 2;
        populatePistes(resort, resortChrono);

        resort = new mbp.Resort('C2_M1_R3', undefined, 'Resort 3', 'Country 2', 'Area 1');
        resortChrono = 3;
        populatePistes(resort, resortChrono);

        resort = new mbp.Resort('C3_M1_R4', undefined, 'Resort 4', 'Country 3', 'Area 1');
        resortChrono = 4;
        populatePistes(resort, resortChrono);
    }

    /**
     * 
     * @returns {Object} a map of resorts by resortId
     */
    this.getResorts = function() {
        return resorts;
    };

    /**
     * 
     * @returns {Object}
     */
    this.getCountriesUpdates = function() {
        return countriesUpdates;
    };

    /**
     * 
     * @returns {Object}
     */
    this.getAreasUpdates = function() {
        return areasUpdates;
    };

    /**
     * 
     * @returns {Object}
     */
    this.getResortsUpdates = function() {
        return resortsUpdates;
    };

    /**
     * 
     * @returns {Object}
     */
    this.getPistesUpdates = function(resortId) {
        return pistesUpdates[resortId];
    };
};