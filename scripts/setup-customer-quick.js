#!/usr/bin/env node

/**
 * QUICK SETUP - Command line version
 * Usage: node setup-customer-quick.js "Shop Name" "do-go" "admin@email.com" "domain.vercel.app"
 */

const fs = require('fs');
const path = require('path');

const [,, shopName, industry, adminEmail, domain] = process.argv;

if (!shopName || !industry) {
  console.log('❌ Thiếu thông tin!');
  console.log('Usage: node setup-customer-quick.js "Shop Name" "do-go" "admin@email.com" "domain.vercel.app"');
  process.exit(1);
}

const adminPassword = generatePassword();

console.log('⏳ Đang setup...\n');

// 1. Update WebsiteContext
updateWebsiteContext(shopName, industry);

// 2. Update layout
updateLayout(shopName);

// 3. Create env file
createEnvFile(adminEmail || `admin@${domain || 'shop.com'}`, adminPassword);

// 4. Create handover doc
createHandoverReadme(shopName, industry, adminEmail, adminPassword, domain);

console.log('\n✅ SETUP HOÀN TẤT!\n');
console.log('================================');
console.log(`🏪 Shop: ${shopName}`);
console.log(`🎨 Ngành: ${industry}`);
console.log(`📧 Admin: ${adminEmail || 'Chưa cấu hình'}`);
console.log(`🔑 Password: ${adminPassword}`);
console.log(`🌐 Domain: ${domain || 'Cần setup sau'}`);
console.log('\n📋 File bàn giao: HANDOVER.md');
console.log('🚀 Tiếp theo:');
console.log('   1. Kiểm tra lại file HANDOVER.md');
console.log('   2. Git push lên repo mới');
console.log('   3. Deploy lên Vercel');
console.log('   4. Gửi HANDOVER.md cho khách\n');

function updateWebsiteContext(shopName, industry) {
  const filePath = path.join(__dirname, '../src/context/WebsiteContext.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/industry: "[^"]+"/, `industry: "${industry}"`);
  content = content.replace(/name: "[^"]+"/, `name: "${shopName}"`);
  content = content.replace(/slogan: "[^"]+"/, `slogan: "Chất lượng - Uy tín - ${shopName}"`);

  fs.writeFileSync(filePath, content);
  console.log('✅ WebsiteContext.tsx');
}

function updateLayout(shopName) {
  const filePath = path.join(__dirname, '../src/app/layout.tsx');
  let content = fs.readFileSync(filePath, 'utf8');

  content = content.replace(/title: "[^"]+"/, `title: "${shopName}"`);
  content = content.replace(/description: "[^"]+"/, `description: "${shopName} - Website bán hàng chuyên nghiệp"`);

  fs.writeFileSync(filePath, content);
  console.log('✅ layout.tsx');
}

function createEnvFile(adminEmail, adminPassword) {
  const envContent = `# Admin Credentials
ADMIN_EMAIL=${adminEmail}
ADMIN_PASSWORD=${adminPassword}

# Customer needs to configure these:
# FIREBASE_API_KEY=xxx
# IMGBB_API_KEY=xxx
# NEXTAUTH_SECRET=xxx
`;

  fs.writeFileSync(path.join(__dirname, '../.env.local'), envContent);
  console.log('✅ .env.local');
}

function createHandoverReadme(shopName, industry, adminEmail, adminPassword, domain) {
  const domainUrl = domain || 'your-domain.vercel.app';
  const email = adminEmail || `admin@${domainUrl}`;

  const readmeContent = `# 🎉 BÀN GIAO WEBSITE - ${shopName}

## 🔐 Thông tin đăng nhập

| Mục | Thông tin |
|-----|-----------|
| **Website** | https://${domainUrl} |
| **Trang quản lý** | https://${domainUrl}/admin |
| **Email đăng nhập** | ${email} |
| **Mật khẩu** | \`${adminPassword}\` |

⚠️ **LƯU Ý QUAN TRỌNG**: Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!

## 🚀 Checklist khách hàng

### Bước 1: Đổi mật khẩu (BẮT BUỘC)
1. Truy cập: https://${domainUrl}/admin
2. Đăng nhập bằng email/password ở trên
3. Vào **Cài đặt** → **Tài khoản** → Đổi mật khẩu

### Bước 2: Cập nhật thông tin shop
Vào **Cài đặt Website** → **Thương hiệu**:
- [ ] Logo shop
- [ ] Tên: ${shopName}
- [ ] Slogan
- [ ] Mô tả
- [ ] SĐT liên hệ
- [ ] Địa chỉ

### Bước 3: Thêm sản phẩm
Vào **Sản phẩm** → **Thêm mới**:
1. Upload ảnh lên https://imgbb.com trước
2. Copy link ảnh
3. Thêm thông tin sản phẩm

### Bước 4: Cấu hình thanh toán
Vào **Cài đặt** → **Thanh toán**:
- [ ] Thông tin chuyển khoản
- [ ] Momo (nếu có)
- [ ] QR Code

## 🎨 Thông tin kỹ thuật

- **Ngành nghề**: ${industry}
- **Theme**: Auto-generated theo ngành
- **Màu sắc**: Theo bảng màu ngành
- **Responsive**: Desktop + Mobile

## 📞 Hỗ trợ

Cần giúp đỡ? Liên hệ:
- 📧 Email: support@yourcompany.com
- 📱 Zalo: 0982.581.222

---
Ngày bàn giao: ${new Date().toLocaleDateString('vi-VN')}
`;

  fs.writeFileSync(path.join(__dirname, '../HANDOVER.md'), readmeContent);
  console.log('✅ HANDOVER.md');
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}
