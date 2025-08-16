#!/bin/bash

echo "🚀 Optimizing images for better performance..."

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Install with: brew install imagemagick"
    exit 1
fi

# Convert PNG to WebP for better compression
echo "📸 Converting statue.png to WebP format..."
convert src/assets/statue.png -quality 85 src/assets/statue.webp

# Show file size comparison
echo "📊 File size comparison:"
du -h src/assets/statue.png
du -h src/assets/statue.webp

echo "✅ Image optimization complete!"
echo "💡 Update your import to use statue.webp for ~77% size reduction"
