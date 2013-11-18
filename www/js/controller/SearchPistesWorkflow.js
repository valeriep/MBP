"use strict";

mbp.SearchPistesWorkflow = function(onPistesRetrieved) {
    var instance = this;
    var resortRepo = new mbp.LocalResortRepository();
    var searchPistesWidget = null;
    
    /**
     * @param {mbp.SearchPistesCriteria} criteria
     * @param {Function} onPistesRetrieved a callback expecting an {Array} of {mbp.Piste}
     */
    this.submit = function(criteria) {
        resortRepo.findPistes(criteria, onPistesRetrieved);
    };
    
    this.activate = function() {
        if(!searchPistesWidget) {
            searchPistesWidget = new mbp.SearchPistesWidget(instance.submit);
        }
        searchPistesWidget.display();
    };
};