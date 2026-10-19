package com.neuroml.app;

import android.Manifest;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.media.projection.MediaProjectionManager;
import android.os.Bundle;
import android.view.View;
import android.view.accessibility.AccessibilityManager;
import android.widget.CompoundButton;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.Switch;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * ONE control: the brain switch.
 *  - toggle ON  -> requests the screen-capture grant itself, asks for the tap
 *                 service if missing, then STARTS the brain and opens the
 *                 dashboard. It runs right away — nothing else to press.
 *  - toggle OFF -> stops the brain completely (BotService hard-exits python).
 * The dashboard shows the account signed in on THIS phone (the player's).
 */
public class MainActivity extends Activity {
    private static final int PROJECTION_REQ = 4242;
    private static final String PREFS = "nml";
    private TextView status;
    private Switch brainSwitch;

    @Override
    protected void onCreate(Bundle b) {
        super.onCreate(b);

        LinearLayout root = new LinearLayout(this);
        root.setOrientation(LinearLayout.VERTICAL);
        root.setBackgroundColor(Color.parseColor("#0b0f14"));
        root.setPadding(48, 72, 48, 48);

        TextView title = new TextView(this);
        title.setText("NeuroML");
        title.setTextColor(Color.parseColor("#58a6ff"));
        title.setTextSize(30);
        title.setTypeface(Typeface.DEFAULT_BOLD);
        root.addView(title);

        TextView sub = new TextView(this);
        sub.setText("The full RL brain runs on THIS phone. It sees the game through the screen, plays matches, learns, and federates anonymized packages. No API key, no computer.");
        sub.setTextColor(Color.parseColor("#8b98a8"));
        sub.setTextSize(14);
        sub.setPadding(0, 16, 0, 24);
        root.addView(sub);

        brainSwitch = new Switch(this);
        brainSwitch.setText("  🧠 BRAIN (run / stop)");
        brainSwitch.setTextSize(18);
        brainSwitch.setTextColor(Color.WHITE);
        root.addView(brainSwitch);

        TextView addr = new TextView(this);
        addr.setText("Dashboard address: http://127.0.0.1:8765\n(reachable only on this phone, only while the brain runs)");
        addr.setTextColor(Color.parseColor("#58a6ff"));
        addr.setTextSize(12);
        addr.setPadding(0, 0, 0, 8);
        root.addView(addr);

        status = new TextView(this);
        status.setTextColor(Color.parseColor("#3fb950"));
        status.setTextSize(13);
        status.setPadding(0, 16, 0, 28);
        root.addView(status);

        root.addView(btn("📱 Open live dashboard", v -> {
            copyAssets();
            startActivity(new Intent(this, DashboardActivity.class));
        }));

        TextView note = new TextView(this);
        note.setText("Automating Clash Royale violates Supercell's ToS — use an account you accept losing. The bot taps only inside the game and never opens account or deck screens.");
        note.setTextColor(Color.parseColor("#6e7b8a"));
        note.setTextSize(11);
        note.setPadding(0, 40, 0, 0);
        root.addView(note);

        brainSwitch.setOnCheckedChangeListener((CompoundButton sb, boolean on) -> {
            if (on) {
                proceedToRun();
            } else {
                stopEverything();
            }
        });

        setContentView(new ScrollView(this) {{ addView(root); }});
    }

    /** Toggling OFF: stop the brain AND retire the screen-capture session
     *  (its process is going down; a fresh one-time grant is requested on the
     *  next start — Android security calls for that anyway). */
    private void stopEverything() {
        Intent stop = new Intent(this, BrainService.class);
        stop.setAction(BrainService.ACTION_STOP);
        startService(stop);
        try { stopService(new Intent(this, CaptureService.class)); } catch (Exception ignored) { }
        getSharedPreferences(PREFS, Context.MODE_PRIVATE)
                .edit().putBoolean("capture_ready", false).apply();
        status.setText("Brain stopped — nothing is playing. Toggle ON to start again.");
    }

    @Override
    protected void onResume() {
        super.onResume();
        SharedPreferences p = getSharedPreferences(PREFS, Context.MODE_PRIVATE);
        boolean running = p.getBoolean("brain_running", false);
        brainSwitch.setOnCheckedChangeListener(null);   // reflect state, don't retrigger
        brainSwitch.setChecked(running);
        brainSwitch.setOnCheckedChangeListener((CompoundButton sb, boolean on) -> {
            if (on) proceedToRun();
            else stopEverything();
        });
        String err = p.getString("brain_error", "");
        if (!running && err != null && !err.isEmpty()) {
            status.setText("✖ Brain stopped: " + err + "\nToggle ON to try again.");
        } else if (running) {
            status.setText("✓ Brain running — it plays the account signed in on this phone.\nDashboard: the in-app screen, or any browser at http://127.0.0.1:8765 while it runs.");
        }
    }

    /** Cross-process capture readiness (CaptureService runs in :brain).
     *  SharedPreferences are per-process cached — a write from the :brain
     *  process is NOT visible through the cached object in this process, so
     *  poll the actual file on disk instead. (This stale-cache read is what
     *  made the poll report "capture taking long" even after a grant.) */
    private boolean captureReady() {
        try {
            File f = new File(getApplicationInfo().dataDir, "shared_prefs/nml.xml");
            BufferedReader r = new BufferedReader(new java.io.FileReader(f));
            String line;
            while ((line = r.readLine()) != null) {
                if (line.contains("capture_ready") && line.contains("\"true\"")) {
                    r.close();
                    return true;
                }
            }
            r.close();
        } catch (Exception ignored) { }
        return false;
    }

    /** Toggle ON or returning from a permission grant: run what's missing, in order. */
    private void proceedToRun() {
        // Already running? Just show the dashboard instead of re-running the chain
        // (double-toggle was what poisoned the state on older builds).
        if (getSharedPreferences(PREFS, Context.MODE_PRIVATE).getBoolean("brain_running", false)) {
            startActivity(new Intent(this, DashboardActivity.class));
            return;
        }
        if (!captureReady()) {
            status.setText(" Android needs your one-time OK to see the screen…");
            requestCapture();
            return;
        }
        if (!tapsEnabled()) {
            status.setText(" Android needs the NeuroML tap service ON — enabling it in settings…");
            startActivity(new Intent(android.provider.Settings.ACTION_ACCESSIBILITY_SETTINGS));
            Toast.makeText(this, "Find \u201CNeuroML brain tap service\u201D and switch it ON, then come back — the brain will start by itself", Toast.LENGTH_LONG).show();
            return;
        }
        startBrain();
    }

    /** Hard, reliable check: read the SYSTEM's enabled accessibility list
     *  (static-instance detection lost races when the app process restarted). */
    private boolean tapsEnabled() {
        AccessibilityManager am = (AccessibilityManager) getSystemService(ACCESSIBILITY_SERVICE);
        for (AccessibilityServiceInfo info : am.getEnabledAccessibilityServiceList(AccessibilityServiceInfo.FEEDBACK_ALL_MASK)) {
            String pkg = info.getResolveInfo() == null ? "" :
                    info.getResolveInfo().serviceInfo == null ? "" :
                            info.getResolveInfo().serviceInfo.packageName;
            if (getPackageName().equals(pkg)) return true;
        }
        return false;
    }

    private void startBrain() {
        copyAssets();
        startForegroundService(new Intent(this, BrainService.class));
        startActivity(new Intent(this, DashboardActivity.class));
    }

    private android.widget.Button btn(String label, View.OnClickListener c) {
        android.widget.Button b = new android.widget.Button(this);
        b.setText(label);
        b.setAllCaps(false);
        b.setTextColor(Color.WHITE);
        b.setPadding(16, 16, 16, 16);
        b.setOnClickListener(c);
        LinearLayout.LayoutParams lp = new LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT, LinearLayout.LayoutParams.WRAP_CONTENT);
        lp.setMargins(0, 12, 0, 12);
        b.setLayoutParams(lp);
        return b;
    }

    private void requestCapture() {
        if (android.os.Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 3);
        }
        // The brain only needs the GAME, not the user's other apps. The consent
        // dialog lets the user hand over a single app window — guide them to
        // exactly that (the public API can't force app-only without user choice).
        status.setText("In the consent dialog, tap  🎯 App window  →  choose  Clash Royale.\nDo NOT pick the whole screen — the bot only needs the game.");
        MediaProjectionManager mgr =
                (MediaProjectionManager) getSystemService(MEDIA_PROJECTION_SERVICE);
        startActivityForResult(mgr.createScreenCaptureIntent(), PROJECTION_REQ);
    }

    @Override
    protected void onActivityResult(int req, int code, Intent data) {
        super.onActivityResult(req, code, data);
        if (req != PROJECTION_REQ || code != RESULT_OK || data == null) {
            status.setText("✖ Screen capture not granted — the brain cannot see the game");
            return;
        }
        Intent svc = new Intent(this, CaptureService.class);
        svc.putExtra(CaptureService.EXTRA_RESULT, code);
        svc.putExtras(data); // MediaProjection result payload must reach the service
        startForegroundService(svc);
        status.setText("✓ Capture active — checking the tap service…");
        // The capture service activates asynchronously (different process):
        // poll its readiness flag, then continue the chain tap → brain.
        pollCaptureReady(0);
    }

    private void pollCaptureReady(final int attempt) {
        if (captureReady()) {
            proceedToRun();
            return;
        }
        if (attempt > 60) {   // ~36 s — cold :brain process start can be slow
            status.setText("Capture is taking long — toggle 🧠 BRAIN OFF and ON again, and pick 🎯 App window → Clash Royale this time");
            return;
        }
        new android.os.Handler(android.os.Looper.getMainLooper()).postDelayed(
                () -> pollCaptureReady(attempt + 1), 600);
    }

    /** bot data files (json) → filesDir so relative-path logic in bot_ml.py works. */
    private void copyAssets() {
        String[] files = {"cards.json", "bot_config.json", "my_deck.json", "meta_decks.json"};
        for (String f : files) {
            File out = new File(getFilesDir(), f);
            if (out.exists()) continue; // never overwrite user memory/config
            try (InputStream in = getAssets().open("neuroml/" + f);
                 OutputStream os = new FileOutputStream(out)) {
                byte[] buf = new byte[8192];
                int n;
                while ((n = in.read(buf)) > 0) os.write(buf, 0, n);
            } catch (Exception ignored) { }
        }
    }
}
