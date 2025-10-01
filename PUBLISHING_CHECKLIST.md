# 📋 Publishing Checklist for Firefox Add-ons Store

Use this checklist before submitting your extension to the Firefox Add-ons store.

## Pre-Submission Checklist

### 1. Icons ✓
- [ ] Download `icon48.png` from `generate_icons.html`
- [ ] Download `icon96.png` from `generate_icons.html`
- [ ] Download `icon128.png` from `generate_icons.html`
- [ ] Place all three PNG files in the extension root directory

### 2. Manifest Updates ✓
- [ ] Update `"author"` field with your name
- [ ] Update `"homepage_url"` with your GitHub/website URL
- [ ] Verify `"version"` is correct (currently 1.0.0)
- [ ] Review `"description"` field

### 3. Testing ✓
- [ ] Test the extension in Firefox
- [ ] Verify Shorts detection works
- [ ] Test the full-screen overlay appears at limit
- [ ] Test Settings page opens and saves preferences
- [ ] Test Reset Counter button works
- [ ] Test with different limit values (5, 10, 20, etc.)
- [ ] Verify daily reset works

### 4. Documentation ✓
- [ ] Update LICENSE with your name/year
- [ ] Review README.md for accuracy
- [ ] Check all links work

### 5. Screenshots (Required for Store)
Take these screenshots for the store listing:

- [ ] **Screenshot 1**: Extension popup showing count
  - File: `screenshot-popup.png`
  - Size: 1280x800 recommended
  - Caption: "Track your daily Shorts count with a beautiful popup"

- [ ] **Screenshot 2**: Full-screen overlay
  - File: `screenshot-overlay.png`
  - Size: 1280x800 recommended
  - Caption: "Full-screen reminder when you reach your limit"

- [ ] **Screenshot 3**: Settings page
  - File: `screenshot-settings.png`
  - Size: 1280x800 recommended
  - Caption: "Customize your daily limit from 1 to 100 Shorts"

- [ ] **Screenshot 4**: YouTube Shorts in action (optional)
  - File: `screenshot-youtube.png`
  - Size: 1280x800 recommended
  - Caption: "Automatically detects YouTube Shorts"

### 6. Packaging
- [ ] Run `./package.sh` to create the ZIP file
- [ ] Verify the ZIP contains all necessary files
- [ ] Test the ZIP by installing it in Firefox

### 7. Store Submission
- [ ] Create account at https://addons.mozilla.org
- [ ] Go to https://addons.mozilla.org/developers/addon/submit/
- [ ] Choose "On this site" distribution
- [ ] Upload your ZIP file
- [ ] Fill in store listing information (see STORE_SUBMISSION.md)
- [ ] Upload screenshots
- [ ] Add tags and categories
- [ ] Submit for review

### 8. After Submission
- [ ] Wait for automated review (usually minutes)
- [ ] Respond to any reviewer feedback
- [ ] Wait for manual review (1-7 days typically)
- [ ] Celebrate when approved! 🎉

## Quick Command Reference

```bash
# Make packaging script executable
chmod +x package.sh

# Create package
./package.sh

# Check package contents
unzip -l youtube-shorts-limiter-1.0.0.zip

# Test install the package
# Go to about:debugging → Load Temporary Add-on → select ZIP
```

## Common Issues

### Icons not showing
- Make sure PNG files are in root directory
- Check manifest.json points to correct filenames
- Firefox store requires PNG, not SVG

### ZIP too large
- Remove unnecessary files (README, docs, etc.)
- package.sh already excludes them

### Manifest validation errors
- Use https://extensionworkshop.com/documentation/develop/manifest-v2/
- Ensure all required fields are present
- Check JSON syntax is valid

## Resources

- **Extension Workshop**: https://extensionworkshop.com/
- **Developer Hub**: https://addons.mozilla.org/developers/
- **Submission Guide**: https://extensionworkshop.com/documentation/publish/submitting-an-add-on/
- **Review Policies**: https://extensionworkshop.com/documentation/publish/add-on-policies/

## Version Updates

When releasing version 1.1.0 or later:

1. Update `version` in manifest.json
2. Document changes in a CHANGELOG.md
3. Run `./package.sh` again
4. Upload new version to your extension page
5. Add release notes describing changes

---

Good luck with your submission! 🚀

Feel free to modify this extension and make it your own.

