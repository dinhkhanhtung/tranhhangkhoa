#!/usr/bin/env node

/**
 * SETUP CUSTOMER SCRIPT - Option B
 * Tự động config shop mới cho khách hàng
 * 
 * Usage: node setup-customer.js
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

async function setupCustomer() {
  console.log('\n🚀 SETUP SHOP MỚI CHO KHÁCH HÀNG\n');
  console.log('================================\n');

  // 1. Nhập thông tin khách hàng
  const shopName = await question('🏪 Tên shop (VD: Đồ Gỗ Hoàng Gia): ');
  const industry = await question('🎨 Ngành nghề (VD: do-go, thoi-trang, my-pham): ');
  const adminEmail = await question('📧 Email admin khách (VD: admin@dogo.com): ');
  const adminPassword = await question('🔑 Password admin (khuyến nghị: để trống để tự generate): ') || generatePassword();
  const domain = await question('🌐 Domain muốn deploy (VD: dogo-shop.vercel.app): ');

  console.log('\n⏳ Đang setup...\n');

  // 2. Cập nhật WebsiteContext.tsx - Default settings
  updateWebsiteContext(shopName, industry);

  // 3. Cập nhật layout.tsx - Metadata
  updateLayout(shopName);

  // 4. Tạo file .env.local với admin credentials
  createEnvFile(adminEmail, adminPassword);

  // 5. Tạo README bàn giao
  createHandoverReadme(shopName, industry, adminEmail, adminPassword, domain);

  console.log('\n✅ SETUP HOÀN TẤT!\n');
  console.log('================================');
  console.log(`🏪 Shop: ${shopName}`);
  console.log(`🎨 Ngành: ${industry}`);
  console.log(`📧 Admin: ${adminEmail}`);
  console.log(`🔑 Password: ${adminPassword}`);
  console.log(`🌐 Domain: ${domain}`);
  console.log('\n📋 File bàn giao: HANDOVER.md');
  console.log('🚀 Chạy: git push && vercel --prod\n');

  rl.close();
}

function updateWebsiteContext(shopName, industry) {
  const filePath = path.join(__dirname, '../src/context/WebsiteContext.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Thay đổi default industry
  content = content.replace(
    /industry: "[^"]+"/,
    `industry: "${industry}"`
  );

  // Thay đổi brand name
  content = content.replace(
    /name: "[^"]+"/,
    `name: "${shopName}"`
  );

  fs.writeFileSync(filePath, content);
  console.log('✅ Đã cập nhật WebsiteContext.tsx');
}

function updateLayout(shopName) {
  const filePath = path.join(__dirname, '../src/app/layout.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  // Thay đổi title
  content = content.replace(
    /title: "[^"]+"/,
    `title: "${shopName}"`
  );

  // Thay đổi description
  content = content.replace(
    /description: "[^"]+"/,
    `description: "${shopName} - Website bán hàng chuyên nghiệp"`
  );

  fs.writeFileSync(filePath, content);
  console.log('✅ Đã cập nhật layout.tsx');
}

function createEnvFile(adminEmail, adminPassword) {
  const envContent = `# Admin Credentials (Handover to customer)
ADMIN_EMAIL=${adminEmail}
ADMIN_PASSWORD=${adminPassword}

# Database (Customer will setup their own)
# FIREBASE_API_KEY=xxx
# FIREBASE_PROJECT_ID=xxx

# Image Upload (Customer will setup their own)
# IMGBB_API_KEY=xxx

# NextAuth (Customer will setup their own)
# NEXTAUTH_SECRET=xxx
# NEXTAUTH_URL=http://localhost:3000
`;

  fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
  console.log('✅ Đã tạo .env.local');
}

function createHandoverReadme(shopName, industry, adminEmail, adminPassword, domain) {
  const readmeContent = `# 🎉 BÀN GIAO WEBSITE - ${shopName}

## 📋 Thông tin đăng nhập

| Thông tin | Chi tiết |
|-----------|----------|
| **Website** | https://${domain} |
| **Admin URL** | https://${domain}/admin |
| **Email** | ${adminEmail} |
| **Password** | ${adminPassword} |

## 🚀 Các bước khách hàng cần làm

### 1. Đổi mật khẩu (QUAN TRỌNG)
- Vào: https://${domain}/admin
- Đăng nhập bằng email/password ở trên
- Vào "Cài đặt tài khoản" → Đổi mật khẩu ngay

### 2. Cập nhật thông tin shop
- Vào: **Cài đặt Website** → **Thương hiệu**
- Cập nhật: Logo, Tên shop, Slogan, Mô tả
- Cập nhật: Thông tin liên hệ (SĐT, địa chỉ)

### 3. Thêm sản phẩm
- Vào: **Quản lý Sản phẩm** → **Thêm sản phẩm**
- Upload ảnh lên ImgBB trước khi thêm

### 4. Cấu hình thanh toán
- Vào: **Cài đặt Website** → **Thanh toán**
- Thêm: Thông tin chuyển khoản ngân hàng
- Hoặc: Kết nối Momo/Stripe (nếu cần)

## 🎨 Giao diện hiện tại

- **Ngành nghề**: ${industry}
- **Theme**: Auto-generated theo ngành
- **Màu sắc**: Theo theme ngành đã chọn
- **Layout**: Responsive (Desktop + Mobile)

## 📞 Hỗ trợ

Nếu cần hỗ trợ kỹ thuật, liên hệ:
- **Email**: support@yourcompany.com
- **SĐT**: 0982.581.222

---
*Ngày bàn giao: ${new Date().toLocaleDateString('vi-VN')}*
*Phiên bản: v1.0.0*
`;

  fs.writeFileSync(path.join(__dirname, '../HANDOVER.md'), readmeContent);
  console.log('✅ Đã tạo HANDOVER.md');
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
  let password = '';
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

// Run setup
setupCustomer().catch(console.error);
