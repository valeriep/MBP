"use strict";

/**
 * TODO replace stub implementations with calls to Seolan platform services
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanResortRepository = function() {
//    var instance = this;
//    var seolanResortById = new mbp.SeolanService('43', 'getResortById');
    var testCase = new mbp.TestCase();

    /**
     * 
     * @param {Function} onResortSummariesRetrieved
     */
    this.getAllResortSummaries = function(onResortSummariesRetrieved) {
        var summaries = new Array();
        eachResort(function(resort) {
            summaries.push(new mbp.ResortSummary(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
        });
        onResortSummariesRetrieved(summaries);
    };
    
    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onResortRetrieved
     */
    this.getResortById = function(resortId, onResortRetrieved) {
        var resort = testCase.getResorts()[resortId];
        onResortRetrieved(new mbp.Resort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
    };
    
    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} pisteId
     * @param {Function} onResortRetrieved
     */
    this.getResortByPisteId = function(pisteId, onResortRetrieved) {
        eachResort(function(resort) {
            resort.eachPiste(function(piste) {
                if(piste.id == pisteId) {
                    onResortRetrieved(new mbp.Resort(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
                }
            });
        });
    };
    
    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onPistesRetrieved
     */
    this.getPistesByResortId = function(resortId, userId, onPistesRetrieved) {
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
    this.getPistesByCriteria = function(criteria, userId, onPistesRetrieved) {
        var pistes = new Array();
        eachResort(function(resort) {
            if(resort) {
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
            if(piste.creatorId == userId) {
                pistes.push(piste);
            }
        });
        onPistesRetrieved(pistes);
    };
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
    };
    
    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addMarks = function(userId, marks) {
    };
    
    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
    };
    
    function eachResort(func) {
        var resorts = testCase.getResorts(), resortId = null;
        for(resortId in resorts) {
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
     * @param {String} latitude
     * @param {String} longitude
     * @param {Function} onPistesRetrieved
     */
    this.getPistesCloseTo = function(latitude, longitude, onPistesRetrieved) {
        var resorts = testCase.getResorts();
        onPistesRetrieved(new Array(
            resorts('C1_M1_R1').getPiste('C1_M1_R1_P1'),
            resorts('C1_M1_R1').getPiste('C1_M1_R1_P2'),
            resorts('C2_M3_R4').getPiste('C2_M3_R4_P1'),
            resorts('C2_M3_R4').getPiste('C2_M3_R4_P2')
        ));
    };
    
    /**
     * Last time a resort was added or removed in each country
     * {
     *     France : '2033-11-23 19:07:33',
     *     Switzerland : '2013-11-23 19:08:15',
     *     ...
     * }
     * @param {Function} onUpdatesRetrieved
     * @returns {Object} a map of update ids (time-stamp or whatever) by country names
     */
    this.getCountriesUpdates = function(onUpdatesRetrieved) {
        onUpdatesRetrieved(testCase.getCountriesUpdates());
    };
    
    /**
     * Last time a resort was added or removed in each area of given country
     * {
     *     Ecrins : '2013-11-22 07:07:33',
     *     Vanoise : '2013-11-20 10:08:51',
     *     ...
     * }
     * @param {Function} onUpdatesRetrieved
     * @returns {Object} a map of update ids (time-stamp or whatever) by area
     */
    this.getAreasUpdates = function(country, onUpdatesRetrieved) {
        onUpdatesRetrieved(country, testCase.getAreasUpdates());
    };
    
    /**
     * 
     * @returns {mbp.ResortSummaries} a brief of resorts structured by country and area
     */
    this.getRessortSummaries = function(onResortSummariesRetrieved) {
        var resortSummaryArray = new Array();
        var resorts = testCase.getResorts(); resortId = null, resort;
        for(resortId in resorts) {
            resort = resorts[resortId];
            resortSummaryArray.push(new mbp.ResortSummary(resort.id, resort.lastUpdate, resort.name, resort.country, resort.area));
        }
        onUpdatesRetrieved(new mbp.ResortSummaries(resortSummaryArray));
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
 * TODO move to somewhere in tests when not used any more by stubbed SeolanResortRepository
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
        new mbp.Comment(piste.id + '_C4', commentChrono.toString() + '4',  piste, 'U1', 'comment 4', null, null);
        
        piste.lastUpdate = commentChrono;
        pistesUpdates[piste.getResort().id][piste.id] = commentChrono;
    };
    
    /**
     * @param {mbp.Piste} piste
     * @param {Number} pisteChrono
     */
    function populateUserMarks(piste, pisteChrono) {
        var markChrono;
        
        markChrono = 10 * pisteChrono + 5;
        piste.addUserMarks('U1', new mbp.PisteMarks(1, 2, 3, 4, 5, piste.id, markChrono));
        
        markChrono = 10 * pisteChrono + 6;
        piste.addUserMarks('U2', new mbp.PisteMarks(5, 4, 3, 2, 1, piste.id, markChrono));

        piste.averageMarks.pisteId = piste.id;
        piste.averageMarks.lastUpdate = markChrono;
        piste.lastUpdate = markChrono;
        pistesUpdates[piste.getResort().id][piste.id] = markChrono;
    };
    
    /**
     * @param {mbp.Resort} resort
     * @param {Number} resortChrono
     */
    function populatePistes(resort, resortChrono) {
        var piste, pisteChrono;
        resorts[resort.id] = resort;
        if(!countriesUpdates[resort.country] || resortChrono > countriesUpdates[resort.country]) {
            countriesUpdates[resort.country] = resortChrono;
        }
        if(areasUpdates[resort.area] || resortChrono > areasUpdates[resort.area]) {
            areasUpdates[resort.area] = resortChrono;
        }
        pistesUpdates[resort.id] = {};
        
        piste = new mbp.Piste(resort.id + '_P1', undefined, resort, 'U1', 'Piste 1', mbp.Piste.BLUE, 'piste bleue', null, new mbp.PisteMarks(1, 2.5, 3.4, 4.3, 5), 42, true, null);
        pisteChrono = 10 * resortChrono + 1;
        populateComments(piste, pisteChrono);
        populateUserMarks(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P2', undefined, resort, 'U2', 'Piste 2', mbp.Piste.GREEN, 'piste verte', null, new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5), 22, true, null);
        pisteChrono = 10 * resortChrono + 2;
        populateComments(piste, pisteChrono);
        populateUserMarks(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P3', undefined, resort, 'U1', 'Piste 3', mbp.Piste.RED, 'piste rouge', null, new mbp.PisteMarks(2, 3, 2, 3, 2.5), 51, false, 'duplicate');
        pisteChrono = 10 * resortChrono + 3;
        populateComments(piste, pisteChrono);
        populateUserMarks(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P4', undefined, resort, 'U1', 'Piste 4', mbp.Piste.BLACK, 'piste noire', null, new mbp.PisteMarks(5, 4, 3, 2, 1, 3), 69, null, null);
        pisteChrono = 10 * resortChrono + 4;
        populateComments(piste, pisteChrono);
        populateUserMarks(piste, pisteChrono);
        
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
    
    this.getResorts = function() {
        return resorts;
    };
    
    this.getCountriesUpdates = function() {
        return countriesUpdates;
    };
    
    this.getAreasUpdates = function() {
        return areasUpdates;
    };
    
    this.getResortsUpdates = function() {
        return resortsUpdates;
    };
    
    this.getPistesUpdates = function(resortId) {
        return pistesUpdates[resortId];
    };
};