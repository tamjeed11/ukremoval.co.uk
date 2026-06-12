#!/bin/bash
# Auto image compression on Vercel build
# Installs sharp and compresses all images in /img folder

echo "🚀 Starting image optimization..."

if [ -d "img" ]; then
  # Install sharp for Node.js image processing
  npm install sharp --save-dev 2>/dev/null || true

  node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imgDir = './img';
if (!fs.existsSync(imgDir)) { console.log('No img folder found'); process.exit(0); }

const files = fs.readdirSync(imgDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
console.log('Found ' + files.length + ' images to optimize');

const promises = files.map(file => {
  const filePath = path.join(imgDir, file);
  const stats = fs.statSync(filePath);
  const sizeMB = (stats.size / 1024 / 1024).toFixed(2);
  
  return sharp(filePath)
    .resize(1800, 1200, { fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 78, progressive: true, mozjpeg: true })
    .toBuffer()
    .then(buf => {
      const newSizeMB = (buf.length / 1024 / 1024).toFixed(2);
      const saving = Math.round((1 - buf.length / stats.size) * 100);
      if (saving > 10) {
        fs.writeFileSync(filePath, buf);
        console.log('✓ ' + file + ': ' + sizeMB + 'MB → ' + newSizeMB + 'MB (' + saving + '% smaller)');
      } else {
        console.log('⊘ ' + file + ': already optimized (' + sizeMB + 'MB)');
      }
    })
    .catch(err => console.error('✗ ' + file + ': ' + err.message));
});

Promise.all(promises).then(() => console.log('✅ Image optimization complete!'));
" 2>/dev/null || echo "⚠ Sharp not available, skipping image compression"

else
  echo "⚠ No img folder found, skipping"
fi

echo "✅ Build complete"
