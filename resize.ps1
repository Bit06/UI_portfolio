Add-Type -AssemblyName System.Drawing
$files = @(
    "C:\Users\ADMIN\Documents\od---digital-designer-portfolio\public\images\Echo Handoff.png",
    "C:\Users\ADMIN\Documents\od---digital-designer-portfolio\public\images\MyEsate Handoff.png"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $img = [System.Drawing.Image]::FromFile($file)
        if ($img.Width -gt 2500) {
            $ratio = 2500.0 / $img.Width
            $newHeight = [int]($img.Height * $ratio)
            $newImg = New-Object System.Drawing.Bitmap(2500, $newHeight)
            $g = [System.Drawing.Graphics]::FromImage($newImg)
            $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $g.DrawImage($img, 0, 0, 2500, $newHeight)
            $outFile = $file.Replace(".png", " Small.png")
            $newImg.Save($outFile, [System.Drawing.Imaging.ImageFormat]::Png)
            $g.Dispose()
            $newImg.Dispose()
        }
        $img.Dispose()
    }
}
