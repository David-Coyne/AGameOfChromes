# Alternate local server (port 8090). Always serves THIS repo folder — never a hardcoded path.
$port = 8090
$folder = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${port}/")
try {
    $listener.Start()
    Write-Host "Server running on http://localhost:${port}/ (folder: $folder)"
    Start-Process "http://localhost:${port}/"
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $resp = $ctx.Response
        $path = $req.Url.LocalPath
        if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }
        $file = Join-Path $folder ($path.TrimStart('/').Replace('/', '\'))
        try {
            if (Test-Path $file -PathType Leaf) {
                $bytes = [System.IO.File]::ReadAllBytes($file)
                $ext = [System.IO.Path]::GetExtension($file).ToLower()
                $mime = switch ($ext) {
                    ".html" { "text/html;charset=utf-8" }
                    ".css"  { "text/css;charset=utf-8" }
                    ".js"   { "application/javascript;charset=utf-8" }
                    ".json" { "application/json" }
                    ".svg"  { "image/svg+xml" }
                    ".png"  { "image/png" }
                    default { "application/octet-stream" }
                }
                $resp.ContentType = $mime
                $resp.Headers.Set("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
                $resp.Headers.Set("Pragma", "no-cache")
                $resp.ContentLength64 = $bytes.Length
                $resp.OutputStream.Write($bytes, 0, $bytes.Length)
            } else {
                $resp.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("Not Found: $path")
                $resp.OutputStream.Write($msg, 0, $msg.Length)
            }
        } catch {
            # ignore transient disconnects
        }
        $resp.Close()
    }
} finally {
    $listener.Stop()
}
