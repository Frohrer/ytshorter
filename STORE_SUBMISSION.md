# Firefox Add-ons Store Submission Guide

## Prerequisites

1. **Download the PNG icons** from `generate_icons.html` (should be open in your browser)
   - Click the download buttons for `icon48.png`, `icon96.png`, and `icon128.png`
   - Move them to the extension directory

2. **Update manifest.json** with your information:
   - Replace `"author": "Your Name"` with your actual name
   - Replace `"homepage_url"` with your GitHub repo or website
   - Review the description and modify if desired

## Store Listing Information

### Name
**YouTube Shorts Limiter**

### Summary (150 characters max)
Control your YouTube Shorts consumption with customizable daily limits and impossible-to-miss full-screen reminders.

### Description

Help yourself maintain healthy viewing habits with YouTube Shorts Limiter!

**🎯 Features:**

• **Customizable Limits** - Set your own daily Shorts limit (1-100) in the settings
• **Full-Screen Overlays** - Beautiful, impossible-to-miss reminders when you reach your limit
• **Smart Tracking** - Counts unique videos only, no double-counting
• **Visual Progress** - See your daily count with a beautiful popup interface
• **Gentle Reminders** - Get a reminder every 5 Shorts after exceeding your limit
• **Daily Reset** - Counter automatically resets every 24 hours
• **Privacy First** - All data stored locally, nothing sent to external servers

**How It Works:**

1. Install the extension
2. Set your preferred daily limit in Settings (default is 10)
3. Browse YouTube Shorts normally
4. When you reach your limit, a full-screen overlay appears
5. Choose to leave Shorts or continue watching (with reminders)

**Perfect for:**
- Breaking doomscrolling habits
- Managing screen time
- Maintaining focus and productivity
- Practicing digital wellness

The extension only tracks Shorts you haven't seen before, so rewatching doesn't count against your limit. All tracking is done locally in your browser - your viewing habits stay private.

Take control of your YouTube Shorts consumption today!

### Categories
- Other
- Privacy & Security (if available)

### Tags
- youtube
- shorts
- productivity
- time management
- screen time
- digital wellness
- limit
- tracker
- habits

### Support Information

**Support Email:** your.email@example.com (update this!)

**Support Website:** https://github.com/yourusername/shorts-limiter/issues (update this!)

## Screenshots Needed

The Firefox Add-ons store requires screenshots. Here's what to capture:

### Screenshot 1: Extension Popup (640x480 or 1280x800)
1. Click the extension icon to open popup
2. Make sure it shows some counted Shorts (not 0)
3. Capture the full popup with count and progress bar

**Caption:** "Track your daily Shorts count with a beautiful popup interface"

### Screenshot 2: Full-Screen Overlay (640x480 or 1280x800)
1. Watch YouTube Shorts until you hit your limit
2. Capture the full-screen overlay that appears
3. Make sure the gradient and buttons are visible

**Caption:** "Impossible-to-miss full-screen reminder when you reach your limit"

### Screenshot 3: Settings Page (640x480 or 1280x800)
1. Right-click extension icon → Manage Extension → Options
2. Or click the Settings button in the popup
3. Capture the settings page showing the limit configuration

**Caption:** "Customize your daily limit from 1 to 100 Shorts"

### Screenshot 4: YouTube Shorts Detection (640x480 or 1280x800)
1. Browse to a YouTube Short
2. Show the popup counting it
3. Optional: Show the debug info

**Caption:** "Automatically detects and tracks YouTube Shorts as you watch"

## Packaging the Extension

### For Review Submission:

1. Make sure all icon files are in place:
   ```
   icon48.png
   icon96.png
   icon128.png
   ```

2. Create a ZIP file with ALL extension files:
   ```bash
   zip -r shorts-limiter-1.0.0.zip \
     manifest.json \
     background.js \
     content.js \
     popup.html \
     popup.js \
     options.html \
     options.js \
     icon48.png \
     icon96.png \
     icon128.png \
     icon.svg
   ```

3. DO NOT include:
   - README.md
   - TROUBLESHOOTING.md
   - STORE_SUBMISSION.md
   - create_icons.html
   - generate_icons.html
   - test_notification.html
   - .git folder
   - .gitignore

### Submission Steps:

1. **Create Firefox Add-ons Account**
   - Go to https://addons.mozilla.org/
   - Sign in or create an account

2. **Submit Extension**
   - Go to https://addons.mozilla.org/developers/addon/submit/distribution
   - Choose "On this site" (listed on Firefox Add-ons)
   - Upload your ZIP file
   - Fill in all the information above
   - Upload screenshots

3. **Licensing**
   - Choose MIT License (or your preference)
   - Include LICENSE file if using open source

4. **Review Process**
   - Automated review happens first (usually minutes)
   - Manual review may take 1-7 days
   - You'll receive email updates on the status

5. **After Approval**
   - Your extension will be live on the store!
   - Share the link: https://addons.mozilla.org/firefox/addon/your-extension-name/

## Privacy Policy

Firefox may require a privacy policy. Here's a simple one:

```
PRIVACY POLICY

YouTube Shorts Limiter does not collect, store, or transmit any personal data outside of your browser.

Data Storage:
- All data is stored locally using Firefox's browser.storage API
- Data includes: daily Shorts count, list of viewed video IDs, and your configured limit
- No data is sent to external servers or third parties

Permissions:
- "notifications": To show browser notifications (deprecated, now uses overlays)
- "storage": To save your count and settings locally
- "tabs": To send overlay messages to YouTube tabs
- "*://*.youtube.com/*": To detect when you're watching Shorts

Your privacy is important. This extension operates entirely within your browser.
```

## Version Updates

When releasing updates:

1. Update `version` in manifest.json (e.g., "1.0.1", "1.1.0")
2. Create new ZIP file
3. Go to your extension page on addons.mozilla.org
4. Upload new version
5. Add changelog/release notes

## Questions?

If you encounter issues during submission:
- Check Mozilla's extension documentation: https://extensionworkshop.com/
- Visit the add-on developer hub: https://addons.mozilla.org/developers/
- Review policies: https://extensionworkshop.com/documentation/publish/add-on-policies/

Good luck with your submission! 🚀

