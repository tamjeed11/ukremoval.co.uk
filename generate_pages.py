#!/usr/bin/env python3
# Script to generate remaining service and city pages

# Service pages data
services = [
    {
        "filename": "storage-solutions.html",
        "title": "Storage Solutions UK – Rapid Move Removals Ltd",
        "meta_desc": "Secure storage solutions across the UK from £80/month. Short or long-term, climate-controlled units, 24/7 access. Get your free quote today.",
        "og_title": "Storage Solutions UK – Rapid Move Removals Ltd",
        "og_desc": "Secure storage solutions across the UK from £80/month. Short or long-term, climate-controlled units, 24/7 access.",
        "canonical": "https://www.rapidmoveremovals.co.uk/storage-solutions",
        "icon": "warehouse",
        "label": "Storage Solutions",
        "h1": "Secure Storage Solutions <em style=\"color:var(--accent);font-style:normal;\">Across the UK</em>",
        "hero_text": "Need somewhere safe to store your belongings? Our secure storage facilities offer flexible short-term and long-term options. Climate-controlled units, 24/7 access, fully insured.",
        "price": "From £80/month",
        "image": "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80",
        "alt": "Secure storage solutions UK",
        "stats": [
            {"number": "100+", "label": "Storage Units"},
            {"number": "4.9★", "label": "Average Rating"},
            {"number": "24/7", "label": "Access Available"},
            {"number": "100%", "label": "Secure & Insured"}
        ],
        "about_title": "Flexible Storage for Every Need",
        "about_paras": [
            "Whether you're between homes, downsizing, renovating, or just need extra space, our storage solutions provide a safe and convenient place for your belongings. We offer a range of unit sizes to suit everything from a few boxes to the contents of a large family home.",
            "All our storage facilities are secure, clean, and well-maintained. Units are climate-controlled to protect sensitive items from temperature and humidity fluctuations. We offer flexible rental periods  from a few weeks to several years  with no long-term contracts required.",
            "Access is available 24/7 at most locations, so you can retrieve or store items whenever you need to. Every unit is individually alarmed and our facilities have CCTV coverage throughout. Your belongings are fully insured while in storage, giving you complete peace of mind.",
            "We cover the entire UK with storage facilities in major cities and towns. If you're combining storage with a removal, we can collect your items, store them securely, and deliver them to your new address when you're ready  all as part of one seamless service."
        ],
        "included": [
            "Range of unit sizes from small lockers to large rooms",
            "Climate-controlled facilities",
            "24/7 access at most locations",
            "Individual unit alarms and CCTV",
            "Flexible rental periods (no long-term contracts)",
            "Full insurance coverage",
            "Collection and delivery service available",
            "Clean, dry, and well-maintained units"
        ],
        "steps": [
            {"title": "Choose Your Unit", "text": "Tell us what you need to store and we'll recommend the right unit size and quote you a monthly price."},
            {"title": "Book Your Space", "text": "Reserve your unit online or by phone. We'll confirm availability and send you access details."},
            {"title": "Move In", "text": "Bring your items to the facility or use our collection service. We'll help you get set up."},
            {"title": "Access Anytime", "text": "Your belongings are safe and accessible whenever you need them. Extend or end your rental anytime."}
        ],
        "benefits": [
            {"icon": "lock", "title": "Secure Facilities", "text": "Individual alarms, CCTV, and controlled access. Your belongings are safe 24/7."},
            {"icon": "thermometer-half", "title": "Climate Controlled", "text": "Temperature and humidity regulated to protect sensitive items like furniture, electronics, and documents."},
            {"icon": "calendar-alt", "title": "Flexible Terms", "text": "No long-term contracts. Rent for as long as you need  weeks, months, or years."},
            {"icon": "truck", "title": "Collection Service", "text": "We can collect your items, store them, and deliver them back when you're ready."}
        ],
        "faqs": [
            {"q": "What size storage unit do I need?", "a": "It depends on what you're storing. A small unit (25-50 sq ft) suits a few boxes or a studio flat. A medium unit (75-100 sq ft) fits a 1-2 bedroom home. A large unit (150+ sq ft) accommodates a 3-4 bedroom home. We'll help you choose the right size."},
            {"q": "Can I access my unit anytime?", "a": "Most of our facilities offer 24/7 access. Some locations have set access hours (typically 6am-10pm). We'll confirm access times when you book."},
            {"q": "How much does storage cost?", "a": "Storage starts from £80 per month for a small unit. Prices vary by location and unit size. There are no hidden fees  the price we quote is what you pay."},
            {"q": "Is my stuff insured in storage?", "a": "Yes. All items stored in our facilities are covered by insurance. We can provide additional coverage for high-value items if needed."}
        ],
        "cta_title": "Need Secure<br><span>Storage?</span>",
        "cta_text": "Get a free quote today. We'll find the perfect storage solution for your needs."
    },
    {
        "filename": "piano-removals.html",
        "title": "Piano Removals UK – Rapid Move Removals Ltd",
        "meta_desc": "Specialist piano removal services across the UK from £200. Upright and grand pianos, fully insured, trained specialists. Get your free quote today.",
        "og_title": "Piano Removals UK – Rapid Move Removals Ltd",
        "og_desc": "Specialist piano removal services across the UK from £200. Upright and grand pianos, fully insured, trained specialists.",
        "canonical": "https://www.rapidmoveremovals.co.uk/piano-removals",
        "icon": "music",
        "label": "Piano Removals",
        "h1": "Specialist Piano Removals <em style=\"color:var(--accent);font-style:normal;\">Across the UK</em>",
        "hero_text": "Moving a piano requires specialist knowledge and equipment. Our trained team handles upright and grand pianos with care, using proper techniques and protective materials. Fully insured service.",
        "price": "From £200",
        "image": "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=800&q=80",
        "alt": "Professional piano removals UK",
        "stats": [
            {"number": "200+", "label": "Pianos Moved"},
            {"number": "4.9★", "label": "Average Rating"},
            {"number": "100%", "label": "Fully Insured"},
            {"number": "Specialist", "label": "Equipment"}
        ],
        "about_title": "Expert Piano Moving Service",
        "about_paras": [
            "Pianos are heavy, delicate, and valuable instruments that require specialist handling. Our piano removal service is designed specifically for the safe transport of upright pianos, baby grands, and full-size grand pianos. We use proper techniques, specialist equipment, and protective materials to ensure your piano arrives in perfect condition.",
            "Our team is trained in piano moving techniques including proper lifting, securing, and maneuvering through tight spaces and staircases. We use piano skids, dollies, and straps designed specifically for piano transport. Every piano is wrapped in thick protective blankets and secured properly in our vehicles.",
            "We handle all types of pianos  from small upright pianos to concert grand pianos weighing over 500kg. For grand pianos, we can disassemble the legs and pedal lyre if needed, then reassemble everything at your new location. We take extra care with antique and high-value instruments.",
            "Our piano removal service is available across the UK for local and long-distance moves. Every piano move is covered by comprehensive insurance. Whether you're moving house, relocating a music school, or delivering a newly purchased piano, we provide a professional and reliable service."
        ],
        "included": [
            "Specialist piano moving equipment (skids, dollies, straps)",
            "Trained piano moving specialists",
            "Protective blankets and wrapping",
            "Staircase and tight access handling",
            "Grand piano disassembly and reassembly",
            "Full goods-in-transit insurance",
            "Upright and grand piano moves",
            "Antique and high-value instrument specialists"
        ],
        "steps": [
            {"title": "Get Your Quote", "text": "Tell us what type of piano you have and where it needs to go. We'll provide a fixed price."},
            {"title": "Book Your Move", "text": "Choose your date and we'll confirm. We'll discuss any access challenges in advance."},
            {"title": "Safe Transport", "text": "Our specialist team arrives with proper equipment and moves your piano safely."},
            {"title": "Delivered Safely", "text": "Your piano is placed exactly where you want it, in perfect condition."}
        ],
        "benefits": [
            {"icon": "user-graduate", "title": "Trained Specialists", "text": "Our team is trained in proper piano moving techniques and has years of experience."},
            {"icon": "tools", "title": "Specialist Equipment", "text": "Piano skids, dollies, and straps designed specifically for safe piano transport."},
            {"icon": "shield-alt", "title": "Fully Insured", "text": "Comprehensive insurance on every piano move. Your valuable instrument is fully protected."},
            {"icon": "stairs", "title": "Staircase Experts", "text": "We handle difficult access including narrow staircases, tight corners, and multiple floors."}
        ],
        "faqs": [
            {"q": "Can you move grand pianos?", "a": "Yes. We move all types of pianos including upright pianos, baby grands, and full-size concert grand pianos. For grand pianos, we can disassemble the legs and pedal lyre if needed."},
            {"q": "Do you move pianos up stairs?", "a": "Yes. We're experienced in moving pianos up and down staircases. We use proper techniques and equipment to do this safely."},
            {"q": "How much does piano removal cost?", "a": "Piano removals start from £200 for a local upright piano move. Grand pianos and long-distance moves cost more. We provide a fixed quote based on your specific requirements."},
            {"q": "Is my piano insured during the move?", "a": "Yes. Every piano move is covered by comprehensive goods-in-transit insurance. Your instrument is fully protected from collection to delivery."}
        ],
        "cta_title": "Need to Move<br><span>a Piano?</span>",
        "cta_text": "Get a free quote today. We'll move your piano safely with specialist care."
    },
    {
        "filename": "student-moves.html",
        "title": "Student Moves UK – Rapid Move Removals Ltd",
        "meta_desc": "Affordable student removal services across the UK from £120. University moves, halls to house, storage options. Get your free quote today.",
        "og_title": "Student Moves UK – Rapid Move Removals Ltd",
        "og_desc": "Affordable student removal services across the UK from £120. University moves, halls to house, storage options.",
        "canonical": "https://www.rapidmoveremovals.co.uk/student-moves",
        "icon": "graduation-cap",
        "label": "Student Moves",
        "h1": "Affordable Student Moves <em style=\"color:var(--accent);font-style:normal;\">Across the UK</em>",
        "hero_text": "Moving to or from university? We offer affordable removal services designed for students. Halls to house, house to house, or home for the holidays. Storage options available.",
        "price": "From £120",
        "image": "./img/student.jpg",
        "alt": "Affordable student removals UK",
        "stats": [
            {"number": "500+", "label": "Students Moved"},
            {"number": "4.9★", "label": "Average Rating"},
            {"number": "£120", "label": "Starting Price"},
            {"number": "Storage", "label": "Available"}
        ],
        "about_title": "Student Removal Service",
        "about_paras": [
            "Moving to university, between student houses, or back home for the holidays can be stressful and expensive. Our student removal service is designed to make it easy and affordable. We understand student budgets and offer competitive fixed prices with no hidden charges.",
            "Whether you're moving from halls to a student house, between rental properties, or taking everything home for the summer, we provide a reliable and professional service. We can handle everything from a few boxes and a bike to a full room of furniture and belongings.",
            "We offer flexible booking including short-notice moves during busy university term times. If you're going home for the summer but returning in September, we can collect your belongings, store them securely over the summer, and deliver them to your new address when term starts again.",
            "Our student removal service covers all major university cities across the UK including London, Manchester, Birmingham, Leeds, Bristol, Edinburgh, Glasgow, and more. We're experienced in navigating student accommodation access restrictions and can work around your schedule."
        ],
        "included": [
            "Affordable fixed prices for students",
            "Halls to house and house to house moves",
            "Short-notice bookings available",
            "Summer storage options",
            "Furniture and boxes handled",
            "Bikes and sports equipment moved",
            "Fully insured service",
            "Flexible scheduling around term times"
        ],
        "steps": [
            {"title": "Get Your Quote", "text": "Tell us what you need to move and where. We'll give you an affordable fixed price."},
            {"title": "Book Your Date", "text": "Choose your moving date. We can usually accommodate short-notice bookings."},
            {"title": "We Collect", "text": "Our team collects your belongings from your current accommodation."},
            {"title": "Delivered", "text": "Everything is delivered to your new address or stored securely if you're going home for summer."}
        ],
        "benefits": [
            {"icon": "pound-sign", "title": "Student-Friendly Prices", "text": "Affordable fixed prices designed for student budgets. No hidden charges or surprise fees."},
            {"icon": "calendar-check", "title": "Flexible Booking", "text": "Short-notice moves available. We understand term times can be hectic."},
            {"icon": "warehouse", "title": "Summer Storage", "text": "Store your belongings over summer and we'll deliver them to your new address in September."},
            {"icon": "map-marked-alt", "title": "All Universities", "text": "We cover all major university cities across the UK. Experienced with student accommodation access."}
        ],
        "faqs": [
            {"q": "How much does a student move cost?", "a": "Student moves start from £120 for a local move with a small van. The price depends on how much you're moving and the distance. We provide fixed quotes with no hidden charges."},
            {"q": "Can you store my stuff over summer?", "a": "Yes. We can collect your belongings at the end of term, store them securely over summer, and deliver them to your new address when you return in September."},
            {"q": "Do you move bikes and sports equipment?", "a": "Yes. We can move bikes, sports equipment, musical instruments, and any other belongings you have."},
            {"q": "Can you move me at short notice?", "a": "We'll do our best to accommodate short-notice bookings, especially during busy term times. Contact us as soon as you know your moving date."}
        ],
        "cta_title": "Moving to<br><span>University?</span>",
        "cta_text": "Get a free quote today. Affordable, reliable removal service for students."
    }
]

print(f"Will generate {len(services)} service pages")
for service in services:
    print(f"  - {service['filename']}")
