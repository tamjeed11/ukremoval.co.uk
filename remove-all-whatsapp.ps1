# PowerShell script to remove all WhatsApp float buttons from HTML files
# This removes the WhatsApp icon that appears after the footer

$files = @(
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
)

$count = 0

foreach ($file in $files) {
    $filePath = Join-Path $PSScriptRoot $file
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Pattern to match WhatsApp float button (single line or multi-line)
        $pattern = '<a\s+href="https://wa\.me/\d+"\s+target="_blank"\s+rel="noopener"\s+class="whatsapp-float"[^>]*>.*?</a>\s*'
        
        if ($content -match $pattern) {
            $newContent = $content -replace $pattern, ''
            Set-Content -Path $filePath -Value $newContent -NoNewline
            Write-Host "✓ Removed WhatsApp button from: $file" -ForegroundColor Green
            $count++
        }
    }
}

Write-Host "`n✅ Removed WhatsApp buttons from $count files" -ForegroundColor Cyan
