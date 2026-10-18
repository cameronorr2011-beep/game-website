package com.neuroml.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Typeface;
import android.media.projection.MediaProjectionManager;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.Gravity;
import android.view.View;
import android.widget.Button;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Onboarding: (1) grant screen capture, (2) enable the tap service in
 * accessibility settings, (3) start the brain. In this SAME phone — the
 * player phone — no computer or connection is ever needed.
 */
public class MainActivity extends Activity {
    private static final int PROJECTION_REQ = 4242;
    private TextView status;

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
        sub.setPadding(0, 16, 0, 32);
        root.addView(sub);

        status = new TextView(this);
        status.setTextColor(Color.parseColor("#3fb950"));
        status.setTextSize(13);
        status.setPadding(0, 0, 0, 32);
        root.addView(status);

        root.addView(btn("① Allow screen capture (sees the game)", v -> requestCapture()));
        root.addView(btn("② Enable taps in accessibility settings", v -> {
            startActivity(new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS));
            Toast.makeText(this, "Find \u201CNeuroML brain tap service\u201D and switch it ON", Toast.LENGTH_LONG).show();
        }));
        root.addView(btn("③ Start the brain + live dashboard", v -> {
            if (!CaptureService.ready() || !TapAccessibilityService.available()) {
                Toast.makeText(this, "Finish ① and ② first", Toast.LENGTH_LONG).show();
                return;
            }
            copyAssets();
            startForegroundService(new Intent(this, BrainService.class));
            startActivity(new Intent(this, DashboardActivity.class));
        }));
        root.addView(btn("Open dashboard again", v ->
                startActivity(new Intent(this, DashboardActivity.class))));

        TextView note = new TextView(this);
        note.setText("Automating Clash Royale violates Supercell's ToS — use an account you accept losing. The dashboard displays the account signed in on THIS phone (the player's), never anythingelse.");
        note.setTextColor(Color.parseColor("#6e7b8a"));
        note.setTextSize(11);
        note.setPadding(0, 40, 0, 0);
        root.addView(note);

        setContentView(new ScrollView(this) {{ addView(root); }});
    }

    private Button btn(String label, View.OnClickListener c) {
        Button b = new Button(this);
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
        if (Build.VERSION.SDK_INT >= 33 && checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS)
                != PackageManager.PERMISSION_GRANTED) {
            requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, 3);
        }
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
        status.setText("✓ Capture active");
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
