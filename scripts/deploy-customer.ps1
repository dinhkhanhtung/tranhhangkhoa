# 🚀 DEPLOY SCRIPT FOR CUSTOMERS (Windows PowerShell)
# Usage: .\deploy-customer.ps1 -CustomerName "dong-nhan-duong" -Industry "thuoc-dong-y"

param(
    [Parameter(Mandatory=$true)]
    [string]$CustomerName,
    
    [Parameter(Mandatory=$true)]
    [string]$Industry
)

Write-Host "🚀 Deploying for customer: $CustomerName" -ForegroundColor Green
Write-Host "🎨 Industry: $Industry" -ForegroundColor Cyan

# 1. Create new branch
Write-Host "📦 Creating branch..." -ForegroundColor Yellow
git checkout -b "customer/$CustomerName"

# 2. Update default settings
Write-Host "⚙️ Updating default settings..." -ForegroundColor Yellow
$configContent = @"
export const customerConfig = {
  name: "$CustomerName",
  industry: "$Industry",
  defaultTheme: "$Industry",
  phone: "0982581222",
  address: "Cu Van, Thái Nguyên"
}
"@

$configContent | Out-File -FilePath "src\config\customer-config.ts" -Encoding UTF8

# 3. Commit changes
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git add .
git commit -m "Setup for customer: $CustomerName"

# 4. Deploy to Vercel
Write-Host "🌐 Deploying to Vercel..." -ForegroundColor Yellow
vercel --prod

Write-Host "✅ Deployment complete!" -ForegroundColor Green
Write-Host "🌐 Check Vercel dashboard for URL" -ForegroundColor Cyan
