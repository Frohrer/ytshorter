#!/bin/bash

# Package script for YouTube Shorts Limiter Firefox Extension

echo "📦 Packaging YouTube Shorts Limiter..."
echo ""

# Check if required icon files exist
if [ ! -f "icon48.png" ] || [ ! -f "icon96.png" ] || [ ! -f "icon128.png" ]; then
    echo "❌ Error: Icon files missing!"
    echo "Please run generate_icons.html and download icon48.png, icon96.png, and icon128.png"
    echo "Place them in this directory before packaging."
    exit 1
fi

# Get version from manifest
VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": "\(.*\)".*/\1/')
echo "Version: $VERSION"
echo ""

# Create package filename
PACKAGE_NAME="youtube-shorts-limiter-${VERSION}.zip"

# Remove old package if exists
if [ -f "$PACKAGE_NAME" ]; then
    echo "Removing old package..."
    rm "$PACKAGE_NAME"
fi

# Create ZIP file with only necessary files
echo "Creating package..."
zip -r "$PACKAGE_NAME" \
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
    icon.svg \
    -x "*.DS_Store" \
    -x "__MACOSX/*"

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Package created successfully!"
    echo "📦 File: $PACKAGE_NAME"
    echo ""
    echo "Next steps:"
    echo "1. Go to https://addons.mozilla.org/developers/addon/submit/"
    echo "2. Upload $PACKAGE_NAME"
    echo "3. Follow the submission guide in STORE_SUBMISSION.md"
    echo ""
    echo "File size:"
    ls -lh "$PACKAGE_NAME" | awk '{print $5}'
else
    echo ""
    echo "❌ Error creating package"
    exit 1
fi

