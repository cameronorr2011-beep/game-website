package com.neuroml.app;

import android.app.Activity;
import android.graphics.Color;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * The app window IS the dashboard: live phone view, micro-dot neuron layers
 * (the tiny dots = individual neurons), coach feed, win record, federated
 * status. Shows whatever Clash account is signed in on this phone.
 * Dashboard address: http://127.0.0.1:8765 — reachable only on this phone,
 * and only while the brain is running.
 */
public class DashboardActivity extends Activity {
    private WebView web;

    private static final String WAIT_HTML =
        "<html><body style='background:#0b0f14;color:#dbe2ea;font-family:monospace;" +
        "display:flex;align-items:center;justify-content:center;height:100%'>" +
        "<div style='text-align:center'>" +
        "<div style='font-size:22px;color:#58a6ff'>NeuroML</div>" +
        "<p id='msg' style='color:#8b98a8'>starting the brain… (first start loads torch " +
        "and may take a minute)</p>" +
        "</div>" +
        "<script>var i=0; setInterval(function(){var m=document.getElementById('msg');" +
        "m.textContent='starting the brain… (' + (++i) + ') — open the main app screen " +
        "and switch \\u201CBRAIN\\u201D ON if this does not start';},1000);</script>" +
        "</body></html>";

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        setContentView(initialWebView());
        web.loadUrl("http://127.0.0.1:8765");
        web.postDelayed(() -> {
            if (web.getProgress() == 0 || !serverUp()) {
                web.loadDataWithBaseURL(null, WAIT_HTML, "text/html", "utf-8", null);
                web.postDelayed(this::retryLive, 2000);
            }
        }, 3500);
    }

    private WebView initialWebView() {
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        web.setBackgroundColor(Color.parseColor("#0b0f14"));
        web.setWebViewClient(new WebViewClient() {
            @Override
            public void onReceivedError(WebView v, int code, String desc, String url) {
                // brain server not up yet — show the friendly wait page, retry shortly
                web.postDelayed(() -> retryLive(), 1500);
            }
        });
        return web;
    }

    private boolean serverUp() {
        try {
            java.net.Socket s = new java.net.Socket();
            s.connect(new java.net.InetSocketAddress("127.0.0.1", 8765), 400);
            s.close();
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private void retryLive() {
        if (serverUp()) {
            web.loadUrl("http://127.0.0.1:8765");
        } else {
            web.loadDataWithBaseURL(null, WAIT_HTML, "text/html", "utf-8", null);
            web.postDelayed(this::retryLive, 2000);
        }
    }

    @Override
    public void onBackPressed() {
        if (web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
