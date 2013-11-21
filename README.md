MyBestPist
==========

Dynastar social mobile app to share info about ski pistes

Technical background
--------------------

This is a Cordova project. Application is written in HTML5 - javascript using jQuery, jQuery-mobile, doT and of course cordova.  
iOS, android and windows phone builds are available at https://build.phonegap.com/apps/636656/builds.  
If you want to debug MyBestPiste on a physical or virtual device, you need to:
* install cordova CLI (see http://cordova.apache.org/docs/en/3.1.0/guide_cli_index.md.html#The%20Command-line%20Interface)
* you should also read http://cordova.apache.org/docs/en/3.1.0/guide_platforms_index.md.html#Platform%20Guides to setup your workstation
* open a command line window and cd the directory were you cloned MyBestPiste repo
* run ```cordova platform add x```, x beeing your taget platform (most probably android, ios, wp7 or wp8)
* run ```cordova plugins add org.apache.cordova.camera```
* run ```cordova plugins add org.apache.cordova.device```
* run ```cordova plugins add org.apache.cordova.geolocation```
* run ```cordova plugins add org.apache.cordova.globalization```
* run ```cordova plugins add org.apache.cordova.network-information```
* run ```cordova plugins add org.apache.cordova.splashscreen```
* run ```cordova build```
* open the project under plateform/x x still being your chosen platform  
Caution : if you want to modify source code, do it in www and run cordova build again.
Do not touch platform/x/assets/www which will be overriden at each cordova build (and is not synchronized in git for that reason).
