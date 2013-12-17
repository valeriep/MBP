"use strict";

/**
 * 
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanResortRepository = function() {

    /**
     * 
     * @param {Function} onSummariesRetrieved
     */
    this.getAllResortsWithoutPistes = function(onSummariesRetrieved) {
    };
    
    /**
     * 
     * @param {String} resortId
     * @param {Function} onSummariesRetrieved
     */
    this.getPisteSummariesByResortId = function(resortId, onSummariesRetrieved) {
        
    };

    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onSummariesRetrieved
     */
    this.getResortById = function(resortId, onSummariesRetrieved) {
    };

    /**
     * Retrieves a resort by id but doesn't fill pistes which will need to be manually loaded
     * @param {String} pisteId
     * @param {Function} onSummariesRetrieved
     */
    this.getResortByPisteId = function(pisteId, onSummariesRetrieved) {
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {String} resortId
     * @param {Function} onPistesRetrieved
     */
    this.getPistesByResortId = function(resortId, onPistesRetrieved) {
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
    };

    /**
     * Retrieves pistes, feeds them with recent comments and user's marks, but doesn't link them to resort which will need to be manually loaded
     * @param {String} userId
     * @param {Function} onPistesRetrieved what to do with retrieved pistes
     */
    this.getPistesByCreator = function(userId, onPistesRetrieved) {
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

    /**
     * 
     * @param {String} latitude
     * @param {String} longitude
     * @param {Function} onPistesRetrieved
     */
    this.getPistesCloseTo = function(latitude, longitude, onPistesRetrieved) {
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
    };
};