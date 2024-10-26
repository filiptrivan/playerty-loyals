param (
    [string]$mode = "pre"
)

$basePath = Get-Location
$startupFileAbsolutePath = "$basePath\Startup.cs"
$env = "Staging"

if ($mode -eq "pre") 
{
    Write-Host "Running pre-publish tasks..."

    if (Test-Path $startupFileAbsolutePath) {
        (Get-Content $startupFileAbsolutePath) -replace "appsettings.json", "appsettings.$env.json" | Set-Content $startupFileAbsolutePath
        Write-Host "Updated Startup.cs to use appsettings.$env.json."
    } else {
        Write-Host "Error: Startup.cs file not found at path $startupFileAbsolutePath."
    }
} 

elseif ($mode -eq "post") 
{
    Write-Host "Running post-publish tasks..."

    if (Test-Path $startupFileAbsolutePath) {
        (Get-Content $startupFileAbsolutePath) -replace "appsettings.$env.json", "appsettings.json" | Set-Content $startupFileAbsolutePath
        Write-Host "Updated Startup.cs to use appsettings.json."
    } else {
        Write-Host "Error: Startup.cs file not found at path $startupFileAbsolutePath."
    }
} 

else {
    Write-Host "Invalid mode specified. Use 'pre' or 'post'."
}