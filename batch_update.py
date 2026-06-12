#!/usr/bin/env python3
import re

# Update student-moves.html
with open('d:/rapid_move-main/student-moves.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Meta tags
content = re.sub(
    r'<meta name="description" content="[^"]*">',
    '<meta name="description" content="Affordable student removal services across the UK from £120. University moves, halls to house, storage options. Get your free quote today.">',
    content
)
content = re.sub(
    r'<title>[^<]*</title>',
    '<title>Student Moves UK – Rapid Move Removals Ltd</title>',
    content
)
content = re.sub(
    r'<link rel="canonical" href="[^"]*">',
    '<link rel="canonical" href="https://www.rapidmoveremovals.co.uk/student-moves">',
    content
)
content = re.sub(
    r'<meta property="og:title" content="[^"]*">',
    '<meta property="og:title" content="Student Moves UK – Rapid Move Removals Ltd">',
    content
)
content = re.sub(
    r'<meta property="og:description" content="[^"]*">',
    '<meta property="og:description" content="Affordable student removal services across the UK from £120. University moves, halls to house, storage options.">',
    content
)
content = re.sub(
    r'<meta property="og:url" content="[^"]*">',
    '<meta property="og:url" content="https://www.rapidmoveremovals.co.uk/student-moves">',
    content
)

# Hero section
content = content.replace('./img/professional_pakeging.jpg', './img/student.jpg')
content = content.replace('alt="Professional packing services UK"', 'alt="Affordable student removals UK"')
content = content.replace('<span>Packing Services</span>', '<span>Student Moves</span>')
content = content.replace('<i class="fas fa-box-open"></i> Packing Services', '<i class="fas fa-graduation-cap"></i> Student Moves')
content = content.replace('Professional Packing Services', 'Affordable Student Moves')
content = content.replace('Save time and stress with our expert packing service. We supply all materials and pack everything safely  from everyday items to fragile antiques. Full or partial packing available.', 'Moving to or from university? We offer affordable removal services designed for students. Halls to house, house to house, or home for the holidays. Storage options available.')
content = content.replace('From £150  All Materials Included', 'From £120  Student-Friendly Prices')

# Stats
content = content.replace('<div class="stat-number">1000+</div><div class="stat-label">Homes Packed</div>', '<div class="stat-number">500+</div><div class="stat-label">Students Moved</div>')
content = content.replace('<div class="stat-number">100%</div><div class="stat-label">Materials Supplied</div>', '<div class="stat-number">£120</div><div class="stat-label">Starting Price</div>')
content = content.replace('<div class="stat-number">Fragile</div><div class="stat-label">Item Specialists</div>', '<div class="stat-number">Storage</div><div class="stat-label">Available</div>')

with open('d:/rapid_move-main/student-moves.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ student-moves.html updated")

# Update piano-removals.html
with open('d:/rapid_move-main/piano-removals.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Meta tags
content = re.sub(
    r'<meta name="description" content="[^"]*">',
    '<meta name="description" content="Specialist piano removal services across the UK from £200. Upright and grand pianos, fully insured, trained specialists. Get your free quote today.">',
    content
)
content = re.sub(
    r'<title>[^<]*</title>',
    '<title>Piano Removals UK – Rapid Move Removals Ltd</title>',
    content
)
content = re.sub(
    r'<link rel="canonical" href="[^"]*">',
    '<link rel="canonical" href="https://www.rapidmoveremovals.co.uk/piano-removals">',
    content
)
content = re.sub(
    r'<meta property="og:title" content="[^"]*">',
    '<meta property="og:title" content="Piano Removals UK – Rapid Move Removals Ltd">',
    content
)
content = re.sub(
    r'<meta property="og:description" content="[^"]*">',
    '<meta property="og:description" content="Specialist piano removal services across the UK from £200. Upright and grand pianos, fully insured, trained specialists.">',
    content
)
content = re.sub(
    r'<meta property="og:url" content="[^"]*">',
    '<meta property="og:url" content="https://www.rapidmoveremovals.co.uk/piano-removals">',
    content
)

# Hero section
content = content.replace('./img/professional_pakeging.jpg', 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80')
content = content.replace('alt="Professional packing services UK"', 'alt="Professional piano removals UK"')
content = content.replace('<span>Packing Services</span>', '<span>Piano Removals</span>')
content = content.replace('<i class="fas fa-box-open"></i> Packing Services', '<i class="fas fa-music"></i> Piano Removals')
content = content.replace('Professional Packing Services', 'Specialist Piano Removals')
content = content.replace('Save time and stress with our expert packing service. We supply all materials and pack everything safely  from everyday items to fragile antiques. Full or partial packing available.', 'Moving a piano requires specialist knowledge and equipment. Our trained team handles upright and grand pianos with care, using proper techniques and protective materials. Fully insured service.')
content = content.replace('From £150  All Materials Included', 'From £200  Specialist Service')

# Stats
content = content.replace('<div class="stat-number">1000+</div><div class="stat-label">Homes Packed</div>', '<div class="stat-number">200+</div><div class="stat-label">Pianos Moved</div>')
content = content.replace('<div class="stat-number">100%</div><div class="stat-label">Materials Supplied</div>', '<div class="stat-number">100%</div><div class="stat-label">Fully Insured</div>')
content = content.replace('<div class="stat-number">Fragile</div><div class="stat-label">Item Specialists</div>', '<div class="stat-number">Specialist</div><div class="stat-label">Equipment</div>')

with open('d:/rapid_move-main/piano-removals.html', 'w', encoding='utf-8') as f:
    f.write(content)

print("✓ piano-removals.html updated")
print("\nService pages complete! Now run the city pages script.")
