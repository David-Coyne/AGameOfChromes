# A Game of Chromes - Native PowerShell Static Web Server
# Works out-of-the-box on Windows with zero dependencies!

$port = 8080
$url = "http://localhost:$port/"
$folder = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($url)

try {
    $listener.Start()
    Write-Host "⚔️ =================================================== ⚔️" -ForegroundColor Yellow
    Write-Host "  A GAME OF CHROMES - Local Server Running!            " -ForegroundColor Cyan
    Write-Host "  Open your browser at: $url                           " -ForegroundColor Green
    Write-Host "  Press Ctrl+C in this terminal window to stop server. " -ForegroundColor DarkGray
    Write-Host "⚔️ =================================================== ⚔️" -ForegroundColor Yellow

    # Automatically launch default browser
    Start-Process $url

    while ($listener.IsListening) {
        try {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response

            $path = $request.Url.LocalPath
            if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
            $filePath = Join-Path $folder ($path.TrimStart('/').Replace('/', '\'))

            if (Test-Path $filePath -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($filePath)
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()

                $mime = switch ($ext) {
                    ".html" { "text/html; charset=utf-8" }
                    ".css"  { "text/css; charset=utf-8" }
                    ".js"   { "application/javascript; charset=utf-8" }
                    ".json" { "application/json; charset=utf-8" }
                    ".png"  { "image/png" }
                    ".jpg"  { "image/jpeg" }
                    ".svg"  { "image/svg+xml" }
                    default { "application/octet-stream" }
                }

                $response.ContentType = $mime
                # Prevent stale app.js/index.html from making Enter look broken after git pull
                $response.Headers.Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
                $response.Headers.Set("Pragma", "no-cache")
                $response.Headers.Set("Expires", "0")
                $response.ContentLength64 = $bytes.Length
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $response.StatusCode = 404
                $errBytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
            }
            $response.Close()
        } catch {
            # Catch transient network / client abort errors and keep listening
        }
    }
} finally {
    $listener.Stop()
}
