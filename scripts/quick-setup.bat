@echo off
chcp 65001 >nul
echo.
echo ========================================
echo 🚀 SETUP NHANH SHOP CHO KHÁCH
echo ========================================
echo.

set /p SHOP_NAME="🏪 Tên shop: "
set /p INDUSTRY="🎨 Ngành (do-go/thoi-trang/my-pham...): "
set /p EMAIL="📧 Email admin: "
set /p DOMAIN="🌐 Domain (VD: dogo-shop.vercel.app): "

echo.
echo ⏳ Đang setup...
echo.

REM Chạy Node.js script
node setup-customer-quick.js "%SHOP_NAME%" "%INDUSTRY%" "%EMAIL%" "%DOMAIN%"

echo.
echo ========================================
echo ✅ SETUP XONG!
echo ========================================
echo 📄 Xem file HANDOVER.md để bàn giao
echo 🚀 Chạy: git push ^&^& vercel --prod
echo.
pause
