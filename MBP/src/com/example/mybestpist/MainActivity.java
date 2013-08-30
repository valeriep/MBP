package com.example.mybestpist;


import org.apache.cordova.DroidGap;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.widget.ProgressBar;
public class MainActivity extends DroidGap {

	@Override
	public void onCreate(Bundle savedInstanceState) {
		 super.onCreate(savedInstanceState);
		 
		 super.setIntegerProperty("backgroundColor", Color.TRANSPARENT);
		 
		 /*
		  *  J'essayais d'afficher un spinner en dessous du splash de la page de demarrage de l'application,
		  *   mais je ne suis pas arrivé à le faire
		  *   
		    final Activity activity = this;
		    final ProgressBar progessBar1;

		    super.setIntegerProperty("splashscreen", R.drawable.image_accueil);
		    super.setStringProperty("loadingDialog", "Wait, loading packages ...");
		    
		    
		    super.loadUrl("file:///android_asset/www/index.html", 20000);
		    super.setIntegerProperty("loadUrlTimeoutValue", 20000);


		    View footer = View.inflate(getContext(), R.layout.image_accueil, null);
		    root.addView(footer);

		    progessBar1 = (ProgressBar) findViewById(R.id.progressBar1 );

		    this.appView.setWebChromeClient(new WebChromeClient() {

		        public void onProgressChanged(WebView view, int progress) {
		            activity.setProgress(progress * 1000);
		            if (progress < 100
		                    && progessBar1.getVisibility() == ProgressBar.GONE) {
		                progessBar1.setVisibility(ProgressBar.VISIBLE);
		            }
		            progessBar1.setProgress(progress);
		            if (progress == 100) {
		                progessBar1.setVisibility(ProgressBar.GONE);
		            }

		            Log.d("Progress", progress + "");

		        }
		    });
		*/
		//super.setIntegerProperty("splashscreen", R.drawable.image_accueil);
		//super.loadUrl(Config.getStartUrl(), 10000);
		 
		super.setIntegerProperty("splashscreen", R.drawable.image_accueil);
        super.loadUrl("file:///android_asset/www/index.html", 1000);  
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

}
