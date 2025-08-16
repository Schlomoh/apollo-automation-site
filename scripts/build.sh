#!/bin/bash

echo "🚀 Building production version..."

# Clean everything
rm -rf dist node_modules/.vite

# Build with production optimizations
npm run build

echo "✅ Build complete!"
echo ""
echo "📊 Bundle analysis:"
du -h dist/assets/* | sort -hr | head -10

echo ""
echo "🌐 Starting preview server..."
echo "Open http://localhost:4173 in incognito mode for accurate testing"

# Start preview
npm run preview
