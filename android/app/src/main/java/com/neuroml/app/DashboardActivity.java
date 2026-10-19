package com.neuroml.app;

import android.app.Activity;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.TextView;

import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * The app window IS the dashboard: live phone view, micro-dot neuron layers,
 * coach feed, win record, federated status. Shows whatever Clash account is
 * signed in on this phone.
 *
 * REDESIGN: instead of pointing a WebView at an address that may not be up
 * yet (the old "loads forever" spinner), this screen POLLS the brain server
 * on /health every 700 ms and shows the exact live phase:
 *   - the brain's own status from the health endpoint (waiting for capture /
 *     running), including human-readable failure detail;
 *   - the last failure recorded in prefs (brain_error) when the server is
 *     silent;
 *   - a plain "starting the brain…" otherwise.
 * The moment the server reports the brain running, the status UI is swapped
 * for the dashboard WebView — one clean transition, no loops.
 */
public class DashboardActivity extends Activity {
    private static final String URL = "http://127.0.0.1:8765";
    private static final int BG = 0xFF0b0f14, BLUE = 0xFF58a6ff, GREY = 0xFF8b98a8,
            GREEN = 0xFF3fb950, RED = 0xFFf85149;

    private volatile boolean alive;
    private TextView status;
    private WebView web;
    private int polls;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);
        alive = true;
        setContentView(buildStatusScreen());
        new Thread(this::pollLoop, "nml-dash-poll").start();
    }

    private android.view.View buildStatusScreen() {
        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(BG);
        root.setPadding(48, 72, 48, 48);
        root.setGravity(Gravity.CENTER);

        TextView title = new TextView(this);
        title.setText("NeuroML");
        title.setTextColor(BLUE);
        title.setTextSize(30);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        root.addView(title);

        status = new TextView(this);
        status.setTextColor(GREY);
        status.setTextSize(15);
        status.setGravity(Gravity.CENTER);
        status.setText("checking the brain…");
        root.addView(status);

        Button back = new Button(this);
        back.setText("⟵ Back to the brain switch");
        back.setAllCaps(false);
        back.setTextColor(Color.WHITE);
        back.setOnClickListener(v -> finish());
        root.addView(back);
        return root;
    }

    private void pollLoop() {
        while (alive) {
            final String health = fetch(URL + "/health");
            polls++;
            if (health != null) {
                boolean botLive = false;
                String detail = "";
                try {
                    JSONObject j = new JSONObject(health);
                    botLive = j.optBoolean("bot", false);
                    detail = j.optString("device", "");
                    if (j.has("detail")) detail += " · " + j.optString("detail");
                } catch (Exception ignored) { }
                if (botLive) {
                    runOnUiThread(this::showDashboard);
                    return;
                }
                final String d = detail;
                runOnUiThread(() -> status.setText(
                        "⏳ brain is not fully up yet" + (d.isEmpty() ? "" : "\n" + d)
                        + "\n\nfirst start unzips torch — can take a minute\nkeep this screen open"));
            } else if (polls > 3) {   // no server at all
                final String err = getSharedPreferences("nml", MODE_PRIVATE)
                        .getString("brain_error", "");
                runOnUiThread(() -> status.setText(err.isEmpty()
                        ? "⏳ starting the brain…\n(first start unzips torch — can take a minute)\nsit tight — this screen switches to the dashboard on its own"
                        : "✖ last brain error:\n" + err + "\n\nToggle 🧠 BRAIN ON again to restart it."));
            }
            try { Thread.sleep(700); } catch (InterruptedException e) { return; }
        }
    }

    private static String fetch(String spec) {
        try {
            HttpURLConnection c = (HttpURLConnection) new URL(spec).openConnection();
            c.setConnectTimeout(650);
            c.setReadTimeout(650);
            if (c.getResponseCode() != 200) { c.disconnect(); return null; }
            BufferedReader r = new BufferedReader(new InputStreamReader(c.getInputStream()));
            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = r.readLine()) != null) sb.append(line);
            r.close();
            c.disconnect();
            return sb.toString();
        } catch (Exception e) {
            return null;
        }
    }

    private void showDashboard() {
        web = new WebView(this);
        WebSettings s = web.getSettings();
        s.setJavaScriptEnabled(true);
        s.setDomStorageEnabled(true);
        s.setCacheMode(WebSettings.LOAD_NO_CACHE);
        web.setBackgroundColor(BG);
        web.setWebViewClient(new WebViewClient());
        setContentView(web);
        web.loadUrl(URL);
    }

    @Override
    protected void onDestroy() {
        alive = false;
        super.onDestroy();
    }

    @Override
    public void onBackPressed() {
        if (web != null && web.canGoBack()) web.goBack();
        else super.onBackPressed();
    }
}
