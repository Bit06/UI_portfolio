Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile("C:\Users\ADMIN\Documents\od---digital-designer-portfolio\public\images\flow.png")
$img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
$img.Save("C:\Users\ADMIN\Documents\od---digital-designer-portfolio\public\images\flow_rotated.png", [System.Drawing.Imaging.ImageFormat]::Png)
$img.Dispose()
