$port = 8090
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:${port}/")
try {
    $listener.Start()
    Write-Host "Server running on http://localhost:${port}/"
    Start-Process "http://localhost:${port}/"
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $resp = $ctx.Response
        $path = $req.Url.LocalPath
        if ($path -eq "/") { $path = "/index.html" }
        $basePath = "c:\Users\david\Documents\antigravity\mysterious-brahmagupta"
        $file = Join-Path $basePath $path.TrimStart("/")
        try {
            if (Test-Path $file) {
                $bytes = [System.IO.File]::ReadAllBytes($file)
                $ext = [System.IO.Path]::GetExtension($file)
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
