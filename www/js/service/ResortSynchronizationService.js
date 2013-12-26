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
            app.seolanResortRepo.getAllResortsWithoutPistes(instance.download);
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

    /**
     * 
     * @param {Array} remoteResortArray
     */
    this.download = function(remoteResortArray) {
        var summaryHelper = new mbp.SummaryHelper(remoteResortArray, app.seolanResortRepo);

        var countries = summaryHelper.getCountries(), iCountry = null, country;

        app.localResortRepo.setCountries(countries);
        for (iCountry in countries) {
            country = countries[iCountry];
            app.localResortRepo.setAreas(country, summaryHelper.getAreas(country));
        }

        summaryHelper.eachResort(function(remoteResort) {
            app.localResortRepo.getResortById(remoteResort.id, function(localResort) {
                if (!localResort) {
                    localResort = createLocalResort(remoteResort);
                } else {
                    if (localResort.lastUpdate != remoteResort.lastUpdate) {
                        updateLocalResort(localResort, remoteResort);
                    }
                    updateLocalPistes(localResort);
                }
                app.localResortRepo.saveResort(localResort);
            });
        });
    };

    /**
     * @param {mbp.Resort} remoteResort
     */
    function createLocalResort(remoteResort) {
        var localResort = new mbp.Resort(remoteResort.id, remoteResort.lastUpdate, remoteResort.name, remoteResort.country, remoteResort.area, remoteResort.lat, remoteResort.lon);
        var i = null;

        app.seolanResortRepo.getPistesByResortId(remoteResort.id, function(pistes) {
            for (i in pistes) {
                localResort.addPiste(pistes[i]);
            }
        });
        return localResort;
    }

    /**
     * 
     * @param {mbp.Resort} localResort
     * @param {mbp.Resort} remoteResort
     */
    function updateLocalResort(localResort, remoteResort) {
        localResort.name = remoteResort.name;
        localResort.country = remoteResort.country;
        localResort.area = remoteResort.area;
        localResort.lat = remoteResort.lat;
        localResort.lon = remoteResort.lon;
        localResort.lastUpdate = remoteResort.lastUpdate;
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
                        localPiste.setImages(remotePiste.getImages());
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