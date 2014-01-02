"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSynchronizationService = function() {
    var instance = this;
    var lastUpdate = '';

    this.run = function() {
        if (app.device.isOnline()) {
            upload();
            instance.download();
        }
    };

    function upload() {
        app.localResortRepo.eachPistesToSend(function(piste) {
            app.seolanResortRepo.addPiste(piste);
        });
        app.localResortRepo.eachUserMarksToSend(function(userId, marks) {
            app.seolanResortRepo.addMarks(userId, marks);
        });
        app.localResortRepo.eachCommentsToSend(function(comment) {
            app.seolanResortRepo.addComment(comment);
        });
    }

    /**
     * 
     */
    this.download = function() {
        var lastUpdateRefreshed = false;
        app.seolanResortRepo.getAllResorts(lastUpdate, function(answer) {
            var i = null, remoteResort;
            
            if(!lastUpdateRefreshed) {
                lastUpdate = answer.timestamp;
                lastUpdateRefreshed = true;
            }
            for(i in answer.resorts) {
                remoteResort = answer.resorts[i];
                app.localResortRepo.getResortById(remoteResort.id, function(localResort) {
                    if (!localResort) {
                        createLocalResort(remoteResort);
                    } else {
                        if (localResort.lastUpdate != remoteResort.lastUpdate) {
                            updateLocalResort(localResort, remoteResort);
                        }
                    }
                });
            }
        });
        
        updateLocalPistes();
    };

    /**
     * @param {mbp.Resort} remoteResort
     */
    function createLocalResort(remoteResort) {
        var localResort = new mbp.Resort(remoteResort.id, remoteResort.lastUpdate, remoteResort.name, remoteResort.country, remoteResort.area, remoteResort.lat, remoteResort.lon);
        app.localResortRepo.saveResort(localResort);
        
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
        app.localResortRepo.saveResort(localResort);
        
        return localResort;
    }

    function updateLocalPistes() {
        app.seolanResortRepo.getAllPistes(lastUpdate, function(remotePistes) {
            var resortId = null;
            for(resortId in remotePistes) {
                app.localResortRepo.getResortById(resortId, function(localResort) {
                    processRemote(localResort, remotePistes[resortId]);
                    processLocal(localResort, remotePistes[resortId]);
                    app.localResortRepo.saveResort(localResort);
                });
            }
        });
    }

    function processRemote(localResort, remotePistes) {
        var i = null, localPiste, remotePiste;
        for (i in remotePistes) {
            remotePiste = remotePistes[i];
            localPiste = localResort.getPiste(remotePiste.id);
            if (!localPiste || localPiste.lastUpdate != remotePiste.lastUpdate) {
                if (!localPiste) {
                    localResort.addPiste(remotePiste.clone());
                } else {
                    localPiste.accepted = remotePiste.accepted;
                    localPiste.averageMarks = remotePiste.averageMarks.clone();
                    localPiste.color = remotePiste.color;
                    localPiste.creatorId = remotePiste.creatorId;
                    localPiste.description = remotePiste.description;
                    localPiste.lastUpdate = remotePiste.lastUdate;
                    localPiste.marksCount = remotePiste.marksCount;
                    localPiste.name = remotePiste.name;
                }
            }
        }
    }

    /**
     * 
     * @param {mbp.Resort} localResort
     * @param {Object} pisteSummaries
     */
    function processLocal(localResort, remotePistes) {
        var i = null, localPistesIds = localResort.getPistesIds(), remotePisteIds = new Array();
        for (i in remotePistes) {
            remotePisteIds.push(remotePistes[i].id);
        }
        for(i in localPistesIds) {
            if (-1 == jQuery.inArray(localPistesIds[i], remotePisteIds)) {
                localResort.removePiste(localResort.getPiste(localPistesIds[i]));
            }
        }
    }
};