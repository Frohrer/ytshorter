# YouTube Shorts Limiter 🎬

A Firefox extension that helps you control your YouTube Shorts consumption by tracking how many Shorts you've watched and notifying you after 10.

## Features

- ⚙️ **Customizable Daily Limit** - Set your own limit from 1-100 Shorts in Settings
- 🎯 **Full-Screen Overlays** - Impossible-to-miss beautiful reminders when you reach your limit
- 📊 **Smart Tracking** - Tracks unique Shorts only (no double-counting)
- 📈 **Visual Progress** - Beautiful popup with count and progress bar
- 🔄 **Daily Auto-Reset** - Counter resets every 24 hours
- 🎨 **Modern UI** - Smooth animations and gradient design
- ⚠️ **Gentle Reminders** - Additional overlay every 5 Shorts after exceeding limit
- 🔒 **Privacy First** - All data stored locally in your browser
- 🎬 **YouTube-Only** - Doesn't affect any other websites

## Installation

### Install in Firefox

1. Open Firefox and navigate to `about:debugging#/runtime/this-firefox`
2. Click "Load Temporary Add-on"
3. Navigate to this directory and select the `manifest.json` file
4. The extension is now installed temporarily (it will be removed when Firefox closes)

### Permanent Installation (for development)

To keep the extension installed permanently during development:

1. Navigate to `about:config` in Firefox
2. Search for `xpinstall.signatures.required`
3. Set it to `false`
4. Then follow the temporary installation steps above

### Package for Distribution

To create a signed extension for permanent installation:

1. Create a ZIP file of all extension files:
   ```bash
   zip -r shorts_limiter.zip manifest.json background.js content.js popup.html popup.js icon.svg README.md
   ```

2. Sign the extension through [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)

### Optional: Create PNG Icons

The extension uses an SVG icon by default, which works great in Firefox. If you prefer PNG icons:

1. Open `create_icons.html` in your browser
2. Right-click each canvas and save as `icon48.png` and `icon96.png`
3. Update `manifest.json` to reference the PNG files instead of the SVG

## Usage

1. **Install** the extension in Firefox
2. **Configure** your limit:
   - Click the extension icon
   - Click "⚙️ Settings"
   - Set your preferred daily limit (default is 10)
   - Click "Save Settings"
3. **Browse** YouTube Shorts as normal - the extension tracks automatically
4. **When you reach your limit**, a beautiful full-screen overlay appears:
   - Choose "Leave Shorts" to return to YouTube home
   - Choose "Continue Anyway" to dismiss and keep watching
5. **Get reminders** every 5 Shorts after exceeding your limit
6. **Check progress** anytime by clicking the extension icon
7. **Reset counter** manually if needed using the "Reset Counter" button

### Debug Features

The popup includes debug information showing:
- Last Short ID viewed
- Total number of unique Shorts watched
- When the counter was last reset

Check the browser console for detailed logging of Short detection and counting.

## How It Works

- **Content Script**: Runs on YouTube pages and detects when you're viewing Shorts by monitoring URL changes
- **Background Script**: Maintains the count of unique Shorts viewed and triggers notifications
- **Popup**: Provides a visual interface to see your progress and reset the counter
- **Storage**: Uses browser local storage to persist counts between sessions
- **Daily Reset**: Automatically resets the counter every 24 hours

## Customization

To change the limit from 10 to another number:

1. Open `background.js`
2. Change the `SHORTS_LIMIT` constant at the top of the file
3. Open `popup.js`
4. Change the `SHORTS_LIMIT` constant there as well
5. Reload the extension in Firefox

## Technical Details

- Uses WebExtension API (compatible with Firefox)
- Manifest Version 2 (for broad Firefox compatibility)
- Persistent storage using `browser.storage.local`
- Content script injection for YouTube page monitoring
- Background script for state management

## Troubleshooting

If notifications aren't appearing or Shorts aren't being counted, see the detailed [TROUBLESHOOTING.md](TROUBLESHOOTING.md) guide.

Quick checks:
- Click "Test Notification" in the popup to verify notifications work
- Check the Debug Info section in the popup to see if Shorts are being detected
- Open the browser console (F12) on YouTube to see detection logs
- Make sure Firefox notifications are enabled in your OS settings

## Notes

- The counter tracks unique Shorts by video ID, so rewatching the same Short won't increment the count
- The extension only works on YouTube domains
- Counts reset automatically every 24 hours
- Browser notifications require permission (granted during installation)

## Publishing to Firefox Add-ons Store

See [STORE_SUBMISSION.md](STORE_SUBMISSION.md) for detailed instructions on publishing this extension to the Firefox Add-ons store.

Quick steps:
1. Download PNG icons from `generate_icons.html`
2. Update `manifest.json` with your info (author, homepage)
3. Run `./package.sh` to create the ZIP file
4. Submit to https://addons.mozilla.org/developers/

## License

MIT License - See [LICENSE](LICENSE) file for details.

