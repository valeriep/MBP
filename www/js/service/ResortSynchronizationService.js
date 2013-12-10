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
            app.seolanResortRepo.getRessortSummaries(instance.updateResortList);
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
     * @param {mbp.ResortSummaries} resortSummaries
     */
    this.updateResortList = function(resortSummaries) {
        var countries = resortSummaries.getCountries(), iCountry = null, country;
        var areas, iArea = null, area;
        var summariesByResortId;

        app.localResortRepo.setCountries(countries);
        for (iCountry in countries) {
            country = countries[iCountry];
            areas = resortSummaries.getAreas(country);
            app.localResortRepo.setAreas(country, areas);
            for (iArea in areas) {
                area = areas[iArea];
                summariesByResortId = resortSummaries.getSummariesByResortId(country, area);
                var resortSynchronizer = new ResortsSynchronizer(summariesByResortId);
                app.localResortRepo.getResortsNameByCountryAndArea(country, area, resortSynchronizer.synch);
            }
        }
    };
    
    this.updatePistes = function(resortId) {
        app.localResortRepo.getResortById(resortId, function(localResort) {
            if(!localResort) {
                app.seolanResortRepo.getResortById(resortId, function(resort) {
                    app.localResortRepo.saveResort(resort);
                });
            }
            localResort.clearPistes();
            app.seolanResortRepo.getPistesByResortId(resortId, function(pistes) {
                var iPiste = null;
                for(iPiste in pistes) {
                    localResort.addPiste(pistes[iPiste]);
                    
                }
            });
        });
        
    };
    
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
        app.localResortRepo.getPistesByCriteria(criteria, onPistesRetrieved);
        if(app.device.isOnline()) {
            app.seolanResortRepo.getPistesByCriteria(criteria, function(pistes) {
                var iPiste = null, piste;
                for(iPiste in pistes) {
                    piste = pistes[iPiste];
                    app.localResortRepo.getResortById(piste.getResort().id, function(resort) {
                        if(!resort) {
                            alert(JSON.stringify(piste.getResort()));
                        } else {
                            resort.addPiste(piste.clone());
                            app.localResortRepo.saveResort(resort);
                        }
                    });
                }
                onPistesRetrieved(pistes);
            });
        }
    };

    /**
     * @constructor
     * @param {Object} summariesByResortId a map of resort summaries by resort id
     */
    function ResortsSynchronizer(summariesByResortId) {
        /**
         * 
         * @param {Array} localResorts
         */
        this.synch = function(localResorts) {
            var resortId = null;
            /** @type mbp.Resort */
            var localResort, summary;

            for (resortId in localResorts) {
                localResort = localResorts[resortId];
                if (!summariesByResortId.hasOwnProperty(localResort.id)) {
                    app.localResortRepo.removeResort(localResort);
                } else if (localResort.lastUpdate < summariesByResortId[localResort.id].lastUpdate) {
                    instance.updateResort(localResort);
                }
            }
            for (resortId in summariesByResortId) {
                if (!localResorts.hasOwnProperty(resortId)) {
                    summary = summariesByResortId[resortId];
                    app.localResortRepo.saveResort(new mbp.Resort(summary.id, summary.lastUpdate, summary.name, summary.country, summary.area));
                }
            }
        };
    };

    /**
     * @param {mbp.Resort} localResort
     */
    this.updateResort = function(localResort) {
        app.seolanResortRepo.getResortById(localResort.id, function(seolanResort) {
            var updatePistes = localResort.getPistesIds() ? true : false;

            if (localResort.country != seolanResort.country || localResort.area != seolanResort.area) {
                app.localResortRepo.removeResort(localResort);
                localResort = new mbp.Resort(seolanResort.id, seolanResort.lastUpdate, seolanResort.name, seolanResort.country, seolanResort.area);
            } else {
                localResort.name = seolanResort.name;
                localResort.lastUpdate = seolanResort.lastUpdate;
            }

            if (updatePistes) {
                app.seolanResortRepo.getPistesByResortId(localResort.id, app.user.id, function(pistes) {
                    localResort.setPistes(pistes);
                });
            }

            app.localResortRepo.saveResort(localResort);
        });
    };
};