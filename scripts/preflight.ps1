# PowerShell Preflight Check Script
Write-Host "🚀 Running preflight checks..." -ForegroundColor Cyan
Write-Host ""

$checks = @(
    @{
        Name = "📝 TypeScript Type Check"
        Command = "npx tsc --noEmit"
        Description = "Checking for TypeScript errors..."
    },
    @{
        Name = "🔍 ESLint Check"
        Command = "npm run lint"
        Description = "Running linter..."
    },
    @{
        Name = "🏗️  Next.js Build"
        Command = "npm run build"
        Description = "Building for production..."
    }
)

$allPassed = $true

foreach ($check in $checks) {
    try {
        Write-Host $check.Name -ForegroundColor Yellow
        Write-Host $check.Description -ForegroundColor Gray
        
        $startTime = Get-Date
        Invoke-Expression $check.Command
        
        if ($LASTEXITCODE -ne 0) {
            throw "Command failed with exit code $LASTEXITCODE"
        }
        
        $duration = [math]::Round(((Get-Date) - $startTime).TotalSeconds, 1)
        Write-Host "✅ $($check.Name) passed ($($duration)s)" -ForegroundColor Green
        Write-Host ""
        
    } catch {
        Write-Host "❌ $($check.Name) failed" -ForegroundColor Red
        Write-Host ""
        $allPassed = $false
        
        if ($check.Command -like "*lint*") {
            Write-Host "💡 Try running 'npm run lint:fix' to auto-fix some issues" -ForegroundColor Yellow
            Write-Host ""
        }
        
        break # Stop on first failure
    }
}

if ($allPassed) {
    Write-Host "🎉 All preflight checks passed! Ready for deployment." -ForegroundColor Green
    exit 0
} else {
    Write-Host "🚨 Preflight checks failed. Please fix the issues above before deploying." -ForegroundColor Red
    exit 1
}
