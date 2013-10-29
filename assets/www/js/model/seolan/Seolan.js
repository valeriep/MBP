"use strict";

/**
 * Single point for communication with remote Xsalto Seolan services
 * 
 * @Author ch4mp@c4-soft.com
 */
slopes.Seolan = function(login, pwd) {
    var remoteServiceUri = 'http://dynastar-chrome.xsalto.com/tzr/scripts/admin.php';
    var user = new slopes.SeolanUser(login, pwd);
    
    this.authenticationService = new slopes.AuthenticationService(remoteServiceUri, user);

    Object.preventExtensions(this);
};