# Troubleshooting Guide

## Notifications Not Appearing After 10 Shorts

Follow these steps to diagnose and fix the issue:

### Step 1: Test Notifications
1. Click the extension icon in your Firefox toolbar
2. Click the **"Test Notification"** button in the popup
3. You should see a test notification appear

**If you DON'T see a test notification:**
- Firefox notifications might be disabled
- Go to Firefox Settings → Privacy & Security → Permissions → Notifications
- Make sure notifications are not blocked
- Check that Firefox has notification permissions in your OS:
  - **macOS**: System Preferences → Notifications → Firefox
  - **Windows**: Settings → System → Notifications → Firefox
  - **Linux**: Check your desktop environment's notification settings

### Step 2: Check if Shorts Are Being Detected
1. Open Firefox Developer Tools (F12 or Cmd/Ctrl+Shift+I)
2. Go to the **Console** tab
3. Navigate to YouTube Shorts: `https://youtube.com/shorts/`
4. Watch a Short
5. Look for console messages like:
   ```
   YouTube Shorts Limiter: Detected new Short: [video_id]
   ```

**If you DON'T see these messages:**
- The content script may not be running
- Try reloading the extension:
  1. Go to `about:debugging#/runtime/this-firefox`
  2. Click "Reload" next to the extension
  3. Refresh the YouTube page
- Check that the extension has permission to run on YouTube

### Step 3: Check the Background Script
1. Go to `about:debugging#/runtime/this-firefox`
2. Find "YouTube Shorts Limiter"
3. Click **"Inspect"** to open the background page console
4. Watch some Shorts and look for messages like:
   ```
   SHORT_VIEWED message received: [video_id]
   Count after increment: 1
   ```

**If you DON'T see these messages:**
- The content script isn't communicating with the background script
- Try reloading the extension

### Step 4: Check the Count in the Popup
1. Click the extension icon
2. Look at the "Debug Info" section at the bottom
3. Check:
   - **Last Short ID**: Should show the ID of the last Short you watched
   - **Viewed Shorts**: Should match the number in the counter
   - **Last Reset**: When the counter was last reset

**If the count isn't incrementing:**
- You might be rewatching the same Shorts (the extension only counts unique videos)
- Try watching different Shorts
- Check the "Viewed Shorts" count in debug info

### Step 5: Manually Trigger a Notification
If you want to test the notification without watching 10 shorts, you can manually set the count:

1. Go to `about:debugging#/runtime/this-firefox`
2. Click "Inspect" on the extension's background page
3. In the console, run:
   ```javascript
   browser.storage.local.set({shortsCount: 9});
   ```
4. Watch one more Short - you should get a notification

### Step 6: Check Browser Console for Errors
1. Open the Browser Console (Cmd/Ctrl+Shift+J)
2. Look for any error messages related to the extension
3. Common issues:
   - `browser is not defined` → The extension might not be properly loaded
   - Permission errors → Check the manifest.json permissions

## Common Issues

### Issue: "browser is not defined"
**Solution**: Make sure you're using Firefox (not Chrome). Chrome uses `chrome` instead of `browser`.

### Issue: Shorts detection not working
**Possible causes:**
- YouTube changed their URL structure
- The extension needs to be reloaded
- Content Security Policy is blocking the script

**Solution**: 
1. Check if the URL pattern for Shorts is still `/shorts/[video_id]`
2. Reload the extension
3. Check the console for CSP errors

### Issue: Count resets unexpectedly
**Cause**: The counter automatically resets every 24 hours.

**Solution**: This is by design, but you can check when it was last reset in the Debug Info section.

### Issue: Same Short counted multiple times
**Cause**: This shouldn't happen - the extension tracks unique video IDs.

**Solution**: Check the Debug Info to see the "Viewed Shorts" count vs the displayed count.

## Enable Detailed Logging

All key events are now logged to the console. To see them:

1. **Content Script logs**: Open DevTools console on YouTube pages
2. **Background Script logs**: Inspect the background page from `about:debugging`
3. **Popup logs**: Right-click the popup → Inspect

Look for messages starting with `YouTube Shorts Limiter:`

## Still Having Issues?

If you've tried all the above steps and notifications still aren't working:

1. Check your Firefox version (extension requires Firefox 57+)
2. Try disabling other extensions that might interfere
3. Test in a new Firefox profile:
   ```bash
   firefox -P
   ```
   Create a new profile and install the extension there
4. Check if YouTube has updated their site structure (view page source and look for the Shorts URL pattern)

## Quick Debug Checklist

- [ ] Test notification works
- [ ] Console shows "Detected new Short" messages
- [ ] Background console shows "SHORT_VIEWED message received"
- [ ] Count increments in popup
- [ ] Debug info shows last Short ID
- [ ] Tried watching 10 different (unique) Shorts
- [ ] Firefox notifications are enabled in OS settings
- [ ] Extension has YouTube permissions

