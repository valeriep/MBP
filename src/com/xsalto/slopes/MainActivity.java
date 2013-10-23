package com.xsalto.slopes;

import org.apache.cordova.DroidGap;

import android.graphics.Color;
import android.os.Bundle;
import android.view.Menu;

public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.setIntegerProperty("backgroundColor", Color.TRANSPARENT);
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
