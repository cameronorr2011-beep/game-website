package com.neuroml.app;

import android.app.Activity;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * The app window IS the dashboard: live phone view, micro-dot neuron layers
 * (the tiny dots = individual neurons), coach feed, win record, federated
 * status. Shows whatever Clash account is signed in on this phone.
 */
public class DashboardActivity extends Activity {
    private WebView web;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView v, int code, String desc, String url) {
                // brain server not up yet — retry shortly
                web.postDelayed(() -> web.loadUrl(url), 1500);
            }
        });
        setContentView(web);
        web.loadUrl("http://127.0.0.1:8765");
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
