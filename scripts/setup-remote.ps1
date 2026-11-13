# Interactive Setup Helper for VibeStore & ACVIS Testbed
param (
    [string]$RepoUrl
)

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "  VibeStore - Remote Git & Vercel Deployment Setup Helper" -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

if (-not $RepoUrl) {
    $RepoUrl = Read-Host "Enter your GitHub repository URL (e.g., https://github.com/username/vibestore.git)"
}

if ($RepoUrl) {
    Write-Host "`n[1/3] Configuring Git remote origin..." -ForegroundColor Yellow
    git remote remove origin 2>$null
    git remote add origin $RepoUrl
    Write-Host "✓ Remote origin set to: $RepoUrl" -ForegroundColor Green

    Write-Host "`n[2/3] Renaming current branch to main..." -ForegroundColor Yellow
    git branch -M main
    Write-Host "✓ Current branch is main." -ForegroundColor Green

    Write-Host "`n[3/3] Ready to push code to GitHub!" -ForegroundColor Yellow
    Write-Host "Run this command to push:" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor Cyan
} else {
    Write-Host "No repository URL provided. Skipping git remote configuration." -ForegroundColor Yellow
}
