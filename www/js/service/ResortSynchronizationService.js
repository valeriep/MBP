"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSynchronizationService = function() {
    var instance = this;

    this.run = function() {
        if (app.device.isOnline()) {
            upload();
            app.seolanResortRepo.getAllResortSummaries(instance.download);
        }
    };

    function upload() {
        app.localResortRepo.getPistesToSend(function(piste) {
            app.seolanResortRepo.addPiste(piste);
        });
        app.localResortRepo.getUserMarksToSend(function(userId, marks) {
            app.seolanResortRepo.addMarks(userId, marks);
        });
        app.localResortRepo.getCommentsToSend(function(comment) {
            app.seolanResortRepo.addComment(comment);
        });
    }
    ;

    /**
     * 
     * @param {Array} resortSummaryArray
     */
    this.download = function(resortSummaryArray) {
        var summaryHelper = new mbp.SummaryHelper(resortSummaryArray, app.seolanResortRepo);

        var countries = summaryHelper.getCountries(), iCountry = null, country;

        app.localResortRepo.setCountries(countries);
        for (iCountry in countries) {
            country = countries[iCountry];
            app.localResortRepo.setAreas(country, summaryHelper.getAreas(country));
        }

        summaryHelper.eachResortSummary(function(resortSummary) {
            app.localResortRepo.getResortById(resortSummary.id, function(localResort) {
                if (!localResort) {
                    localResort = createLocalResort(resortSummary);
                } else {
                    if (localResort.lastUpdate != resortSummary.lastUpdate) {
                        updateLocalResort(localResort, resortSummary);
                    }
                    updateLocalPistes(localResort);
                }
                app.localResortRepo.saveResort(localResort);
            });
        });
    };

    function createLocalResort(resortSummary) {
        var localResort = new mbp.Resort(resortSummary.id, resortSummary.lastUpdate, resortSummary.name, resortSummary.country, resortSummary.area);
        var i = null;

        app.seolanResortRepo.getPistesByResortId(resortSummary.id, function(pistes) {
            for (i in pistes) {
                localResort.addPiste(pistes[i]);
            }
        });
        return localResort;
    }

    /**
     * 
     * @param {mbp.Resort} localResort
     * @param {mbp.ResortSummary} resortSummary
     */
    function updateLocalResort(localResort, resortSummary) {
        localResort.name = resortSummary.name;
        localResort.country = resortSummary.country;
        localResort.area = resortSummary.area;
        localResort.lastUpdate = resortSummary.lastUpdate;
    }

    function updateLocalPistes(localResort) {
        app.seolanResortRepo.getPisteSummariesByResortId(localResort.id, function(pisteSummaries) {
            processRemote(localResort, pisteSummaries);
            processLocal(localResort, pisteSummaries);
        });
    }

    function processRemote(localResort, pisteSummaries) {
        var remotePisteId = null, localPiste;
        for (remotePisteId in pisteSummaries) {
            localPiste = localResort.getPiste(remotePisteId);
            if (!localPiste || localPiste.lastUpdate != pisteSummaries[remotePisteId]) {
                app.seolanResortRepo.getPisteById(remotePisteId, function(remotePiste) {
                    if(!remotePiste) {
                        return;
                    }
                    if (!localPiste) {
                        localResort.addPiste(remotePiste);
                    } else {
                        localPiste.accepted = remotePiste.accepted;
                        localPiste.averageMarks = remotePiste.averageMarks;
                        localPiste.color = remotePiste.color;
                        localPiste.creatorId = remotePiste.creatorId;
                        localPiste.description = remotePiste.description;
                        localPiste.lastUpdate = remotePiste.lastUdate;
                        localPiste.marksCount = remotePiste.marksCount;
                        localPiste.name = remotePiste.name;
                        localPiste.picture = remotePiste.picture;
                        localPiste.rejectCause = remotePiste.rejectCause;
                    }
                });
            }
        }
    }

    /**
     * 
     * @param {mbp.Resort} localResort
     * @param {Object} pisteSummaries
     */
    function processLocal(localResort, pisteSummaries) {
        var i = null, pistesIds = localResort.getPistesIds();
        for (i in pistesIds) {
            if (!pisteSummaries.hasOwnProperty(pistesIds[i])) {
                localResort.removePiste(localResort.getPiste(pistesIds[i]));
            }
        }
    }
};