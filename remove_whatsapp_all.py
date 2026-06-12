#!/usr/bin/env python3
"""Remove all WhatsApp float buttons from HTML files"""

import re
import os

files = [
    "about.html",
    "areas.html",
    "blog-post.html",
    "contact.html",
    "faq.html",
    "home-removals.html",
    "index.html",
    "office-removals.html",
    "packing-services.html",
    "piano-removals.html",
    "privacy.html",
    "quote.html",
    "removals-birmingham.html",
    "removals-bristol.html",
    "removals-edinburgh.html",
    "removals-glasgow.html",
    "removals-leeds.html",
    "removals-liverpool.html",
    "removals-london.html",
    "removals-manchester.html",
    "removals-nottingham.html",
    "removals-sheffield.html",
    "services.html",
    "storage-solutions.html",
    "student-moves.html",
    "testimonials.html"
]

count = 0

for filename in files:
    filepath = os.path.join(os.path.dirname(__file__), filename)
    
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Pattern to match WhatsApp float button (handles both single and multi-line)
        pattern = r'<a\s+href="https://wa\.me/\d+"\s+target="_blank"\s+rel="noopener"\s+class="whatsapp-float"[^>]*>.*?</a>\s*'
        
        if re.search(pattern, content, re.DOTALL):
            new_content = re.sub(pattern, '', content, flags=re.DOTALL)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            
            print(f"✓ Removed WhatsApp button from: {filename}")
            count += 1

print(f"\n✅ Removed WhatsApp buttons from {count} files")
