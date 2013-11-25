"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanResortRepository = function() {
//    var instance = this;
//    var seolanResortById = new mbp.SeolanService('43', 'getResortById');
    var testCase = new mbp.TestCase();
    
    /**
     * Last time a resort was added or removed in each country
     * {
     *     France : '2033-11-23 19:07:33',
     *     Switzerland : '2013-11-23 19:08:15',
     *     ...
     * }
     * @returns {Object} a map of update ids (time-stamp or whatever) by country names
     */
    this.getCountriesUpdates = function() {
        return testCase.getCountriesUpdates();
    };
    
    /**
     * Last time a resort was added or removed in each massif of given country
     * {
     *     Ecrins : '2013-11-22 07:07:33',
     *     Vanoise : '2013-11-20 10:08:51',
     *     ...
     * }
     * @returns {Object} a map of update ids (time-stamp or whatever) by massif
     */
    this.getMassifsUpdates = function() {
        return testCase.getMassifsUpdates();
    };
    
    /**
     * Last time a piste was added or removed in each resort of given massif
     * {
     *     stJeanMontclar : '2013-11-22 07:07:33',
     *     les2Alpes : '2013-11-20 10:08:51',
     *     ...
     * }
     * @returns {Object} a map of update ids (time-stamp or whatever) by resort id
     */
    this.getRessortsUpdates = function() {
        return testCase.getResortsUpdates();
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
    this.getPistesUpdates = function(resortId) {
        return testCase.getPistesUpdates(resortId);
    };
    
    this.getPistesCloseTo = function(latitude, longitude) {
        var resorts = testCase.getResorts();
        return new Array(
            resorts('C1_M1_R1').getPiste('C1_M1_R1_P1'),
            resorts('C1_M1_R1').getPiste('C1_M1_R1_P2'),
            resorts('C2_M3_R4').getPiste('C2_M3_R4_P1'),
            resorts('C2_M3_R4').getPiste('C2_M3_R4_P2')
        );
    };
    
    this.getResortById = function(resortId) {
        return testCase.getResorts()[resortId];
    };
};

mbp.TestCase = function() {
    var resorts = {};
    var resortsUpdates = {};
    var pistesUpdates = {};
    var countriesUpdates = {};
    var massifsUpdates = {};
    
    populateResorts();
    
    /**
     * @param {mbp.Piste} piste
     * @param {Number} pisteChrono
     */
    function populateComments(piste, pisteChrono) {
        var commentChrono;
        
        commentChrono = 10 * pisteChrono + 1;
        new mbp.Comment(piste.id + '_C1', commentChrono.toString(), piste, 'U1', 'comment 1', new mbp.PisteMarks(0, 1, 0, 1, 0, 0.5), true, null);
        
        commentChrono = 10 * pisteChrono + 2;
        new mbp.Comment(piste.id + '_C2', commentChrono.toString(), piste, 'U2', 'comment 2', new mbp.PisteMarks(2, 2, 2, 2, 2, 2), true, null);
        
        commentChrono = 10 * pisteChrono + 3;
        new mbp.Comment(piste.id + '_C3', commentChrono.toString() + '3', piste, 'U1', 'comment 3', new mbp.PisteMarks(3, 3, 3, 3, 3, 3), false, 'inappropriate');
        
        commentChrono = 10 * pisteChrono + 4;
        new mbp.Comment(piste.id + '_C4', commentChrono.toString() + '4',  piste, 'U1', 'comment 4', new mbp.PisteMarks(5, 4, 5, 4, 5, 4.5), null, null);
        
        piste.lastUpdate = commentChrono;
        pistesUpdates[piste.getResort().id][piste.id] = commentChrono;
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
        if(massifsUpdates[resort.massif] || resortChrono > massifsUpdates[resort.massif]) {
            massifsUpdates[resort.massif] = resortChrono;
        }
        pistesUpdates[resort.id] = {};
        
        piste = new mbp.Piste(resort.id + '_P1', undefined, resort, 'U1', 'Piste 1', mbp.Piste.BLUE, 'piste bleue', null, new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5, 2.5), true, null);
        pisteChrono = 10 * resortChrono + 1;
        populateComments(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P2', undefined, resort, 'U2', 'Piste 2', mbp.Piste.GREEN, 'piste verte', null, new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5, 2.5), true, null);
        pisteChrono = 10 * resortChrono + 2;
        populateComments(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P3', undefined, resort, 'U1', 'Piste 3', mbp.Piste.RED, 'piste rouge', null, new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5, 2.5), false, 'duplicate');
        pisteChrono = 10 * resortChrono + 3;
        populateComments(piste, pisteChrono);
        
        piste = new mbp.Piste(resort.id + '_P4', undefined, resort, 'U1', 'Piste 4', mbp.Piste.BLACK, 'piste noire', null, new mbp.PisteMarks(2.5, 2.5, 2.5, 2.5, 2.5, 2.5), null, null);
        pisteChrono = 10 * resortChrono + 4;
        populateComments(piste, pisteChrono);
        
        resort.lastUpdate = pisteChrono;
        resortsUpdates[resort.id] = pisteChrono;
    };
    
    function populateResorts() {
        var resort, resortChrono;
        
        resort = new mbp.Resort('C1_M1_R1', undefined, 'Resort 1', 'Country 1', 'Massif 1');
        resortChrono = 1;
        populatePistes(resort, resortChrono);
        
        resort = new mbp.Resort('C1_M2_R2', undefined, 'Resort 2', 'Country 1', 'Massif 2');
        resortChrono = 2;
        populatePistes(resort, resortChrono);
        
        resort = new mbp.Resort('C2_M1_R3', undefined, 'Resort 3', 'Country 2', 'Massif 1');
        resortChrono = 3;
        populatePistes(resort, resortChrono);
        
        resort = new mbp.Resort('C3_M1_R4', undefined, 'Resort 4', 'Country 3', 'Massif 1');
        resortChrono = 4;
        populatePistes(resort, resortChrono);
    }
    
    this.getResorts = function() {
        return resorts;
    };
    
    this.getCountriesUpdates = function() {
        return countriesUpdates;
    };
    
    this.getMassifsUpdates = function() {
        return massifsUpdates;
    };
    
    this.getResortsUpdates = function() {
        return resortsUpdates;
    };
    
    this.getPistesUpdates = function(resortId) {
        return pistesUpdates[resortId];
    };
};