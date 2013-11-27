"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSynchronizationService = function(app) {
    var instance = this;
    this.localResortRepo = mbp.LocalResortRepository.getInstance();
    this.seolanResortRepo = new mbp.SeolanResortRepository();

    this.run = function() {
        if (app.device.isOnline()) {
            upload();
            instance.seolanResortRepo.getRessortSummaries(instance.updateResortList);
        }
    };

    function upload() {
        instance.localResortRepo.getPistesToSend(function(piste) {
            instance.seolanResortRepo.addPiste(piste);
        });
        instance.localResortRepo.getUserMarksToSend(function(userId, marks) {
            instance.seolanResortRepo.addMarks(userId, marks);
        });
        instance.localResortRepo.getCommentsToSend(function(comment) {
            instance.seolanResortRepo.addComment(comment);
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

        instance.localResortRepo.setCountries(countries);
        for (iCountry in countries) {
            country = countries[iCountry];
            areas = resortSummaries.getAreas(country);
            instance.localResortRepo.setAreas(country, areas);
            for (iArea in areas) {
                area = areas[iArea];
                summariesByResortId = resortSummaries.getSummariesByResortId(country, area);
                var resortSynchronizer = new ResortsSynchronizer(summariesByResortId);
                instance.localResortRepo.getResortsByCountryAndArea(country, area, resortSynchronizer.synch);
            }
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
                    instance.localResortRepo.removeResort(localResort);
                } else if (localResort.lastUpdate < summariesByResortId[localResort.id].lastUpdate) {
                    instance.updateResort(localResort);
                }
            }
            for (resortId in summariesByResortId) {
                if (!localResorts.hasOwnProperty(resortId)) {
                    summary = summariesByResortId[resortId];
                    instance.localResortRepo.saveResort(new mbp.Resort(summary.id, summary.lastUpdate, summary.name, summary.country, summary.area));
                }
            }
        };
    }
    ;

    /**
     * @param {mbp.Resort} localResort
     */
    this.updateResort = function(localResort) {
        instance.seolanResortRepo.getResortById(localResort.id, function(seolanResort) {
            var updatePistes = localResort.getPistesIds() ? true : false;

            if (localResort.country != seolanResort.country || localResort.area != seolanResort.area) {
                instance.localResortRepo.removeResort(localResort);
                localResort = new mbp.Resort(seolanResort.id, seolanResort.lastUpdate, seolanResort.name, seolanResort.country, seolanResort.area);
            } else {
                localResort.name = seolanResort.name;
                localResort.lastUpdate = seolanResort.lastUpdate;
            }

            if (updatePistes) {
                instance.seolanResortRepo.getPistesByResortId(localResort.id, app.user.id, function(pistes) {
                    localResort.setPistes(pistes);
                });
            }

            instance.localResortRepo.saveResort(localResort);
        });
    };
};