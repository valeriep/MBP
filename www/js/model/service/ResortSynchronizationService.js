"use strict";

/**
 * @constructor
 * @param {mbp.MyBestPistes} app
 * @author ch4mp@c4-soft.com
 */
mbp.ResortSynchronizationService = function(app) {
    var instance = this;
    var localResortRepo = new mbp.LocalResortRepository();
    var seolanResortRepo = new mbp.SeolanResortRepository();
    
    this.run = function() {
        if(app.device.isOnline()) {
            upload();
            seolanResortRepo.getRessortSummaries(instance.updateResortList);
        }
    };
    
    function upload() {
        localResortRepo.getPistesToSend(function(piste) {
            seolanResortRepo.addPiste(piste);
        });
        localResortRepo.getUserMarksToSend(function(userId, marks) {
            seolanResortRepo.addMarks(userId, marks);
        });
        localResortRepo.getCommentsToSend(function(comment) {
            seolanResortRepo.addComment(comment);
        });
    };
    
    /**
     * 
     * @param {mbp.ResortSummaries} resortSummaries
     */
    this.updateResortList = function(resortSummaries) {
        var countries = resortSummaries.getCountries(), country = null;
        var areas, iArea = null, area;
        var summariesByResortId;
        
        localResortRepo.setCountries(countries);
        for(country in countries) {
            areas = resortSummaries.getAreas(country);
            localResortRepo.setAreas(country, areas);
            for(iArea in areas) {
                area = areas[iArea];
                summariesByResortId = resortSummaries.getSummariesByResortId(country, area);
                localResortRepo.getResortsByCountryAndArea(country, area, new ResortsSynchronizer(summariesByResortId).sync);
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
            var i = null;
            /** @type mbp.Resort */
            var localResort;
            
            for(i in localResorts) {
                localResort = localResorts[i];
                if(!summariesByResortId.hasOwnProperty(localResort.id)) {
                    localResortRepo.removeResort(localResort);
                } else if(localResort.lastUpdate < summariesByResortId[localResort.id].lastUpdate) {
                    instance.updateResort(localResort);
                }
            }
            for(resortId in summariesByResortId) {
                if(localResorts.indexOf(resortId) == -1) {
                    localResortRepo.save(new mbp.Resort(seolanResortSummary.id, seolanResortSummary.lastUpdate, seolanResortSummary.name, seolanResortSummary.country, seolanResortSummary.area));
                }
            }
        };
    };
    
    /**
     * @param {mbp.Resort} localResort
     */
    this.updateResort = function(localResort) {
        seolanResortRepo.getResortById(resort.id, function(seolanResort) {
            var updatePistes = localResort.getPistesIds() ? true : false;
            
            if(localResort.country != seolanResort.country || localResort.area != seolanResort.area) {
                localResortRepo.removeResort(localResort);
                localResort = new mbp.Resort(seolanResort.id, seolanResort.lastUpdate, seolanResort.name, seolanResort.country, seolanResort.area);
            } else {
                localResort.name = seolanResort.name;
                localResort.lastUpdate = seolanResort.lastUpdate;
            }
            
            if(updatePistes) {
                seolanResortRepo.getPistesByResortId(localResort.id, app.user.id, function(pistes) {
                    localResort.setPistes(pistes);
                });
            }
            
            localResortRepo.saveResort(localResort);
        });
    };
};