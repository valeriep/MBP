"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSynchronizationService = function(app) {
    var instance = this;

    this.run = function() {
        if (app.device.isOnline()) {
            upload();
            app.services.seolanResortRepo.getRessortSummaries(instance.updateResortList);
        }
    };

    function upload() {
        app.services.localResortRepo.getPistesToSend(function(piste) {
            app.services.seolanResortRepo.addPiste(piste);
        });
        app.services.localResortRepo.getUserMarksToSend(function(userId, marks) {
            app.services.seolanResortRepo.addMarks(userId, marks);
        });
        app.services.localResortRepo.getCommentsToSend(function(comment) {
            app.services.seolanResortRepo.addComment(comment);
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

        app.services.localResortRepo.setCountries(countries);
        for (iCountry in countries) {
            country = countries[iCountry];
            areas = resortSummaries.getAreas(country);
            app.services.localResortRepo.setAreas(country, areas);
            for (iArea in areas) {
                area = areas[iArea];
                summariesByResortId = resortSummaries.getSummariesByResortId(country, area);
                var resortSynchronizer = new ResortsSynchronizer(summariesByResortId);
                app.services.localResortRepo.getResortsNameByCountryAndArea(country, area, resortSynchronizer.synch);
            }
        }
    };
    
    this.updatePistes = function(resortId) {
        app.services.localResortRepo.getResortById(resortId, function(localResort) {
            if(!localResort) {
                app.services.seolanResortRepo.getResortById(resortId, function(resort) {
                    app.services.localResortRepo.saveResort(resort);
                });
            }
            localResort.clearPistes();
            app.services.seolanResortRepo.getPistesByResortId(resortId, function(pistes) {
                var iPiste = null;
                for(iPiste in pistes) {
                    localResort.addPiste(pistes[iPiste]);
                    
                }
            });
        });
        
    };
    
    this.getPistesByCriteria = function(criteria, onPistesRetrieved) {
        app.services.localResortRepo.getPistesByCriteria(criteria, onPistesRetrieved);
        if(app.device.isOnline()) {
            app.services.seolanResortRepo.getPistesByCriteria(criteria, function(pistes) {
                var iPiste = null, piste;
                for(iPiste in pistes) {
                    piste = pistes[iPiste];
                    app.services.localResortRepo.getResortById(piste.getResort().id, function(resort) {
                        if(!resort) {
                            alert(JSON.stringify(piste.getResort()));
                        } else {
                            resort.addPiste(piste.clone());
                            app.services.localResortRepo.saveResort(resort);
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
                    app.services.localResortRepo.removeResort(localResort);
                } else if (localResort.lastUpdate < summariesByResortId[localResort.id].lastUpdate) {
                    instance.updateResort(localResort);
                }
            }
            for (resortId in summariesByResortId) {
                if (!localResorts.hasOwnProperty(resortId)) {
                    summary = summariesByResortId[resortId];
                    app.services.localResortRepo.saveResort(new mbp.Resort(summary.id, summary.lastUpdate, summary.name, summary.country, summary.area));
                }
            }
        };
    };

    /**
     * @param {mbp.Resort} localResort
     */
    this.updateResort = function(localResort) {
        app.services.seolanResortRepo.getResortById(localResort.id, function(seolanResort) {
            var updatePistes = localResort.getPistesIds() ? true : false;

            if (localResort.country != seolanResort.country || localResort.area != seolanResort.area) {
                app.services.localResortRepo.removeResort(localResort);
                localResort = new mbp.Resort(seolanResort.id, seolanResort.lastUpdate, seolanResort.name, seolanResort.country, seolanResort.area);
            } else {
                localResort.name = seolanResort.name;
                localResort.lastUpdate = seolanResort.lastUpdate;
            }

            if (updatePistes) {
                app.services.seolanResortRepo.getPistesByResortId(localResort.id, app.user.id, function(pistes) {
                    localResort.setPistes(pistes);
                });
            }

            app.services.localResortRepo.saveResort(localResort);
        });
    };
};