package com.neuroml.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

import com.chaquo.python.PyObject;
import com.chaquo.python.Python;
import com.chaquo.python.android.AndroidPlatform;

import java.io.File;

/**
 * Runs bot_ml.py's brain loop + dashboard.py's server from inside ONE Python
 * process (android_main.py) on this phone. The user's Clash account shown on
 * screen is whoever is signed in on this device — the player's own account.
 */
public class BrainService extends Service {
    private static final String CH = "neuroml";

    @Override
    public IBinder onBind(Intent i) { return null; }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        startForeground(2, buildNotif());
        if (!Python.isStarted()) {
            Python.start(new AndroidPlatform(getApplicationContext()));
        }
        final File filesDir = getFilesDir();
        new Thread(() -> {
            try {
                Python py = Python.getInstance();
                PyObject mod = py.getModule("android_main");
                mod.callAttr("run", filesDir.getAbsolutePath()).toString();
            } catch (Exception e) {
                android.util.Log.e("NeuroML", "brain crashed: " + e, e);
                pythonCrashed = String.valueOf(e);
            }
        }, "neuroml-brain").start();
        return START_STICKY;
    }

    public static volatile String pythonCrashed;

    private Notification buildNotif() {
        NotificationManager nm = getSystemService(NotificationManager.class);
        if (android.os.Build.VERSION.SDK_INT >= 26) {
            nm.createNotificationChannel(new NotificationChannel(CH, "NeuroML",
                    NotificationManager.IMPORTANCE_LOW));
            return new Notification.Builder(this, CH)
                    .setContentTitle("NeuroML brain running")
                    .setContentText("Playing + learning; dashboard at in-app screen")
                    .setSmallIcon(android.R.drawable.ic_media_play)
                    .build();
        }
        return new Notification.Builder(this).build();
    }
}
