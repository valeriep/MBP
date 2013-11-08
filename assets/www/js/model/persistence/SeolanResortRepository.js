"use strict";

/**
 * @constructor
 * @author ch4mp@c4-soft.com
 */
mbp.SeolanResortRepository = function() {
    var instance = this;
    var seolanPisteIdList = new mbp.SeolanService('43', 'listPistesIds');
    var seolanPisteDetail = new mbp.SeolanService('43', 'getPiste');
    var seolanCommentIdList = new mbp.SeolanService('43', 'listCommentsIds');
    var seolanCommentDetail = new mbp.SeolanService('43', 'getComment');
    var resorts = {};
    
    this.getResortsCloseTo = function(latitude, longitude) {
        var position = {
                lat: latitude,
                lon: longitude
        };
        var seolanPistesIds = seolanPisteIdList.getObject(position);
        var i = null, pisteId, seolanPiste;
        
        resorts = {};
        for(i in seolanPistesIds) {
            pisteId = seolanPistesIds[i];
            seolanPiste = seolanPisteDetail.getObject({OID: pisteId});
            resort = getResort(seolanPiste.country, seolanPiste.massif, seolanPiste.resort);
            piste = new mbp.Piste(pisteId, seolanPiste.name, seolanPiste.color, seolanPiste.description, seolanPiste.picture, resort);
            instance.retrieveComments(piste);
        }
        
        return resorts;
    };
    
    this.retrieveComments = function(piste) {
        var commentsIds = seolanCommentIdList.getObject({OID: piste.id});
        var i = null, seolanComment;
        for(i in commentsIds) {
            seolanComment = seolanCommentDetail.getObject({OID: commentsIds[i]});
            new mbp.Comment(seolanComment.OID, seolanComment.text, seolanComment.snowMark, seolanComment.sunMark, piste);
        }
    };
    
    var getResort = function(country, massif, name) {
        var c, m, resort;
        c = resorts[country];
        if(!c) {
            c = {};
            resorts[country] = c;
        }
        m = c[massif];
        if(!m) {
            m = {};
            c[massif] = m;
        }
        resort = m[name];
        if(!resort) {
            resort = new mbp.Resort(null, name, country, massif);
            m[name] = resort;
        }
        return resort;
    };
};