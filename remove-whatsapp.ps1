# Remove WhatsApp Float Button from all HTML files
# This script removes the floating WhatsApp icon from the entire website

$files = Get-ChildItem -Path "." -Filter "*.html" -Exclude "blog-admin.html","audit-completion-summary.html","google*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Remove single-line WhatsApp float button
    $content = $content -replace '<a href="https://wa\.me/447497763670"[^>]*class="whatsapp-float"[^>]*>.*?</a>\s*', ''
    
    # Remove multi-line WhatsApp float button (with line breaks)
    $content = $content -replace '<a href="https://wa\.me/447497763670"[^>]*class="whatsapp-float"[^>]*>\s*<i[^>]*>\s*</i>\s*</a>\s*', ''
    
    # Save the file
    Set-Content -Path $file.FullName -Value $content -NoNewline
    
    Write-Host "Processed: $($file.Name)" -ForegroundColor Green
}

Write-Host "`nWhatsApp float button removed from all HTML files!" -ForegroundColor Cyan
