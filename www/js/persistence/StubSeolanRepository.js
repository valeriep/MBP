"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.StubSeolanRepository = function() {
    var testCase = new mbp.TestCase();

    /**
     * 
     * @param {String} lastUpdate
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResorts = function(lastUpdate, onSummariesRetrieved) {
        onSummariesRetrieved({
            'timestamp' : '2014-01-05 22:49:00',
            'resorts' : testCase.resorts
        });
    };

    /**
     * Retrieves pistes but doesn't link them to resort
     * @param {String} lastUpdate
     * @param {Function} onPistesRetrieved
     */
    this.getAllPistes = function(lastUpdate, onPistesRetrieved) {
        var pistes = [], resortId = null;
        for(resortId in testCase.pistesByResortId) {
            pistes = pistes.concat(testCase.pistesByResortId[resortId]);
        }
        onPistesRetrieved(pistes);
    };
    
    /**
     * 
     * @param {mbp.Piste} piste
     */
    this.addPiste = function(piste) {
        testCase.pistesByResortId[resortId].push(piste);
        return {
            id : 'piste:' + piste.id,
            lastUpdate : '2014-01-05 22:49:00',
        };
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Number} page
     * @param {Function} onImagesRetrieved
     */
    this.getImagesPageByPisteId = function(pisteId, page, onImagesRetrieved) {
        onImagesRetrieved(testCase.imagesByPisteId[pisteId]);
    };

    /**
     * 
     * @param {String} pisteId
     * @param {?} image
     */
    this.addImage = function(pisteId, image) {
        return {
            src : image
        };
    };
    
    /**
     * 
     * @param {String} pisteId
     * @param {Number} page
     * @param {Function} onCommentsRetrieved
     */
    this.getCommentsPageByPisteId = function(pisteId, page, onCommentsRetrieved) {
        onCommentsRetrieved(testCase.commentsByPisteId[pisteId]);
    };

    /**
     * 
     * @param {mbp.Comment} comment
     */
    this.addComment = function(comment) {
        testCase.commentsByPisteId[pisteId].push(comment);
    };
    
    /**
     * 
     * @param {String} userId
     * @param {Function} onPisteMarksRetrieved
     */
    this.getPisteMarksByUserId = function(userId, onPisteMarksRetrieved) {
        onPisteMarksRetrieved(testCase.pisteMarksByUserId[userId]);
    };

    /**
     * 
     * @param {String} userId
     * @param {mbp.PisteMarks} marks
     */
    this.addMarks = function(userId, marks) {
        if(!testCase.pisteMarksByUserId.hasOwnProperty(userId)) {
            testCase.pisteMarksByUserId = {};
        }
        testCase.pisteMarksByUserId[userId][marks.pisteId] = marks;
    };
};

/**
 * 
 * @returns {mbp.TestCase}
 */
mbp.TestCase = function() {
    var instance = this;
    
    this.resorts = [];
    this.pistesByResortId = {};
    this.commentsByPisteId = {};
    this.pisteMarksByUserId = {};
    this.pisteMarksByUserId['U1'] = {};
    this.imagesByPisteId = {};

    populateResorts();

    /**
     * @param {mbp.Piste} piste
     * @param {Number} pisteChrono
     */
    function populateComments(piste, pisteChrono) {
        var commentChrono;
        instance.commentsByPisteId[piste.id] = [];

        commentChrono = 10 * pisteChrono + 1;
        instance.commentsByPisteId[piste.id].push(mbp.Comment.build(piste.id + '_C1', commentChrono.toString(), piste.id, 'U1', 'comment 1', true));

        commentChrono = 10 * pisteChrono + 3;
        instance.commentsByPisteId[piste.id].push(mbp.Comment.build(piste.id + '_C2', commentChrono.toString(), piste, 'U2', 'comment 2', true));

        commentChrono = 10 * pisteChrono + 5;
        instance.commentsByPisteId[piste.id].push(mbp.Comment.build(piste.id + '_C3', commentChrono.toString() + '3', piste, 'U1', 'comment 3', false));

        commentChrono = 10 * pisteChrono + 7;
        instance.commentsByPisteId[piste.id].push(mbp.Comment.build(piste.id + '_C4', commentChrono.toString() + '4', piste, 'U1', 'comment 4', null));
    };

    /**
     * @param {mbp.Resort} resort
     * @param {Number} resortChrono
     */
    function populatePistes(resort, resortChrono) {
        var pisteChrono, pisteId, avgMarks, piste;
        instance.pistesByResortId[resort.id] = [];

        pisteId = resort.id + '_P1';
        pisteChrono = 10 * resortChrono + 1;
        avgMarks = mbp.PisteMarks.build(pisteId, pisteChrono, 1, 2.5, 3.4, 4.3, 5, 4);
        piste = mbp.Piste.build(pisteId, pisteChrono, resort.id, 'U1', 'Piste 1', mbp.Piste.BLUE, 'piste bleue', avgMarks, [], 42, true);
        instance.pistesByResortId[resort.id].push(piste);
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P2';
        pisteChrono = 10 * resortChrono + 2;
        avgMarks = mbp.PisteMarks.build(pisteId, pisteChrono, 2.5, 2.5, 2.5, 2.5, 2.5, 2.5);
        piste = mbp.Piste.build(pisteId, pisteChrono, resort.id, 'U2', 'Piste 2', mbp.Piste.GREEN, 'piste verte', avgMarks, [], 22, true);
        instance.pistesByResortId[resort.id].push(piste);
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P3';
        pisteChrono = 10 * resortChrono + 3;
        avgMarks = mbp.PisteMarks.build(pisteId, pisteChrono, 0, 0, 0, 0, 0, 0);
        piste = mbp.Piste.build(pisteId, pisteChrono, resort.id, 'U1', 'Piste 3', mbp.Piste.RED, 'piste rouge', avgMarks, [], 0, false);
        instance.pistesByResortId[resort.id].push(piste);
        populateComments(piste, pisteChrono);

        pisteId = resort.id + '_P4';
        pisteChrono = 10 * resortChrono + 4;
        avgMarks = mbp.PisteMarks.build(pisteId, pisteChrono, 5, 4, 3, 2, 1, 4);
        piste = mbp.Piste.build(pisteId, pisteChrono, resort.id, 'U1', 'Piste 4', mbp.Piste.BLACK, 'piste noire', avgMarks, [], 1, null);
        instance.pistesByResortId[resort.id].push(piste);
        populateComments(piste, pisteChrono);
        instance.pisteMarksByUserId['U1'][piste.id] = mbp.PisteMarks.build(pisteId, pisteChrono, 5, 4, 3, 2, 1, 4);
        instance.imagesByPisteId[piste.id] = ['img/piste/testPiste1.jpg', 'img/piste/testPiste2.jpg'];
    };

    function populateResorts() {
        var resortChrono, resort;

        resortChrono = 1;
        resort = mbp.Resort.build('C1_M1_R1', resortChrono, 'Resort 1', 'Country 1', 'Area 1', '44.4098', '6.351');
        instance.resorts.push(resort);
        populatePistes(resort, resortChrono);

        resortChrono = 2;
        resort = mbp.Resort.build('C1_M2_R2', resortChrono, 'Resort 2', 'Country 1', 'Area 2', '44.3475', '6.2940');
        instance.resorts.push(resort);
        populatePistes(resort, resortChrono);

        resortChrono = 3;
        resort = mbp.Resort.build('C2_M1_R3', resortChrono, 'Resort 3', 'Country 2', 'Area 1', '44.3475', '6.351');
        instance.resorts.push(resort);
        populatePistes(resort, resortChrono);

        resortChrono = 4;
        resort = mbp.Resort.build('C3_M1_R4', resortChrono, 'Resort 4', 'Country 3', 'Area 1', '44.4098', '6.2940');
        instance.resorts.push(resort);
        populatePistes(resort, resortChrono);
    }
};