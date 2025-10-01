# 🚀 Quick Start Guide

## Your Extension is Ready!

Here's what you need to do to publish to the Firefox Add-ons Store:

## Step 1: Download Icons (1 minute)

The icon generator page should be open in your browser. If not:
```bash
open generate_icons.html
```

Click the three "Download" buttons to get:
- `icon48.png`
- `icon96.png`  
- `icon128.png`

Move these files to the extension directory (where manifest.json is).

## Step 2: Update Your Info (2 minutes)

Edit `manifest.json`:
```json
"author": "Your Name",  // ← Change this
"homepage_url": "https://github.com/yourusername/shorts-limiter",  // ← Change this
```

Edit `LICENSE`:
- Replace `[Your Name]` with your actual name

## Step 3: Test It (5 minutes)

1. Reload the extension in Firefox:
   - Go to `about:debugging#/runtime/this-firefox`
   - Click "Reload" next to YouTube Shorts Limiter

2. Test the settings:
   - Click the extension icon
   - Click "⚙️ Settings"
   - Try changing the limit to 3
   - Watch 3 Shorts - you should see the overlay!

3. Reset and test again with your preferred limit

## Step 4: Package It (30 seconds)

```bash
cd /Users/fredericrohrer/Documents/repos/shorts_limiter
./package.sh
```

This creates `youtube-shorts-limiter-1.0.0.zip`

## Step 5: Take Screenshots (5 minutes)

You need 3-4 screenshots for the store:

1. **Popup**: Click extension icon, take screenshot
2. **Overlay**: Watch Shorts until overlay appears, take screenshot
3. **Settings**: Open settings page, take screenshot
4. **Optional**: Show YouTube Shorts with the extension working

Save as:
- `screenshot-popup.png`
- `screenshot-overlay.png`
- `screenshot-settings.png`

## Step 6: Submit to Store (10 minutes)

1. Go to https://addons.mozilla.org/developers/addon/submit/
2. Sign in or create account
3. Choose "On this site"
4. Upload `youtube-shorts-limiter-1.0.0.zip`
5. Fill in information from `STORE_SUBMISSION.md`:
   - Name: YouTube Shorts Limiter
   - Summary: (copy from STORE_SUBMISSION.md)
   - Description: (copy from STORE_SUBMISSION.md)
   - Categories: Other, Privacy & Security
   - Upload your screenshots
6. Submit!

## Step 7: Wait for Approval ⏳

- Automated review: ~5 minutes
- Manual review: 1-7 days
- You'll get email updates

## Done! 🎉

Once approved, your extension will be live at:
`https://addons.mozilla.org/firefox/addon/youtube-shorts-limiter/`

---

## Need Help?

- Full submission guide: `STORE_SUBMISSION.md`
- Publishing checklist: `PUBLISHING_CHECKLIST.md`
- Troubleshooting: `TROUBLESHOOTING.md`
- Main docs: `README.md`

## What You've Built

A fully-functional Firefox extension with:
✓ Customizable daily limits (1-100 Shorts)
✓ Full-screen overlays that actually work
✓ Beautiful settings page
✓ Smart tracking (unique videos only)
✓ Daily auto-reset
✓ Privacy-focused (all data local)
✓ Professional UI with animations
✓ Production-ready code
✓ Complete documentation

---

**Total time to publish: ~25 minutes** (after icons are downloaded)

Good luck! 🚀

