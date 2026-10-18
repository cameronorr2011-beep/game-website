package com.neuroml.app;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.GestureDescription;
import android.graphics.Path;
import android.os.Bundle;
import android.util.Log;
import android.view.accessibility.AccessibilityEvent;

/**
 * The only way the brain touches the game: tap gestures at the coordinates it
 * decides. Runs on THIS phone, so no computer or ADB is involved.
 */
public class TapAccessibilityService extends AccessibilityService {
    private static final String TAG = "NeuroMLTap";
    private static volatile TapAccessibilityService instance;

    @Override
    protected void onServiceConnected() {
        super.onServiceConnected();
        instance = this;
        Log.i(TAG, "tap service connected");
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) { }

    @Override
    public void onInterrupt() { }

    @Override
    public void onDestroy() {
        instance = null;
        super.onDestroy();
    }

    public static boolean available() { return instance != null; }

    /** Tap once. Blocking up to ~150 ms. */
    public static boolean tap(int x, int y) {
        TapAccessibilityService s = instance;
        if (s == null) return false;
        try {
            Path p = new Path();
            p.moveTo(x, y);
            GestureDescription.Builder b = new GestureDescription.Builder();
            b.addStroke(new GestureDescription.StrokeDescription(p, 0, 55));
            final boolean[] done = {false};
            s.dispatchGesture(b.build(), new AccessibilityService.GestureResultCallback() {
                @Override public void onCompleted(GestureDescription g) { done[0] = true; }
                @Override public void onCancelled(GestureDescription g) { }
            }, null);
            long deadline = System.currentTimeMillis() + 600;
            while (!done[0] && System.currentTimeMillis() < deadline) {
                try { Thread.sleep(12); } catch (InterruptedException ignored) {}
            }
            return done[0];
        } catch (Exception e) {
            Log.w(TAG, "tap failed: " + e);
            return false;
        }
    }
}
