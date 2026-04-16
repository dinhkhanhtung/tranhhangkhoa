# 📋 HƯỚNG DẪN NHÂN BẢN CHO KHÁCH HÀNG

## 🎯 Tổng quan

Hệ thống **Option B**: Mỗi khách = 1 project riêng biệt, hoàn toàn độc lập.

---

## 🚀 Quy trình nhanh (5 phút)

### Bước 1: Clone template

```bash
# Từ GitHub
git clone https://github.com/dinhkhanhtung/industry-themes.git dogo-shop
cd dogo-shop

# Hoặc copy local
cp -r my-app dogo-shop
cd dogo-shop
```

### Bước 2: Chạy script setup

**Cách 1 - Interactive (khuyến nghị):**
```bash
cd scripts
node setup-customer.js
```

**Cách 2 - Command line:**
```bash
cd scripts
node setup-customer-quick.js "Đồ Gỗ Hoàng Gia" "do-go" "admin@dogo.com" "dogo-shop.vercel.app"
```

**Cách 3 - Windows batch:**
```bash
cd scripts
quick-setup.bat
```

### Bước 3: Review & Push

```bash
# Kiểm tra file HANDOVER.md
cat HANDOVER.md

# Push lên repo mới
git remote remove origin
git remote add origin https://github.com/khach-hang/dogo-shop.git
git add .
git commit -m "Initial setup for customer"
git push -u origin main
```

### Bước 4: Deploy

```bash
# Cài Vercel CLI nếu chưa có
npm i -g vercel

# Deploy
vercel --prod
```

### Bước 5: Bàn giao

Gửi cho khách:
1. ✅ File `HANDOVER.md`
2. ✅ URL website
3. ✅ Thông tin đăng nhập admin

---

## 📊 Chi tiết các file thay đổi

### Sau khi chạy setup:

| File | Thay đổi |
|------|----------|
| `src/context/WebsiteContext.tsx` | Tên shop, ngành nghề, slogan |
| `src/app/layout.tsx` | Title, description |
| `.env.local` | Admin credentials |
| `HANDOVER.md` | Tài liệu bàn giao |

---

## 🔐 Bảo mật

### Admin Credentials

```javascript
// .env.local - KHÔNG commit lên git
ADMIN_EMAIL=admin@shop.com
ADMIN_PASSWORD=TempPass123!
```

**Lưu ý:**
- Khách phải đổi mật khẩu ngay sau lần đăng nhập đầu
- Mỗi shop có database riêng (Firebase riêng)
- Khách hoàn toàn độc lập sau khi bàn giao

---

## 🎨 Danh sách ngành có sẵn

| ID | Tên hiển thị | Màu chủ đạo |
|----|-------------|-------------|
| `tranh-theu` | Tranh Thêu Tay | Amber |
| `do-go` | Đồ Gỗ | Brown |
| `gom-su` | Gốm Sứ | Blue-Gray |
| `trang-suc` | Trang Sức | Gold |
| `thoi-trang` | Thời Trang | Pink |
| `my-pham` | Mỹ Phẩm | Purple |
| `giay-dep` | Giày Dép | Orange |
| `do-gia-dung` | Đồ Gia Dụng | Cyan |
| `noi-that` | Nội Thất | Teal |
| `den-trang-tri` | Đèn Trang Trí | Yellow |
| `do-dien-tu` | Đồ Điện Tử | Blue |
| `phu-kien-cong-nghe` | Phụ Kiện CN | Indigo |
| `am-thuc` | Ẩm Thực | Red-Orange |
| `do-uong` | Đồ Uống | Brown |
| `suc-khoe` | Sức Khỏe | Green |
| `y-te` | Y Tế | Light Blue |
| `giao-duc` | Giáo Dục | Blue |
| `sach-vpp` | Sách & VPP | Amber |
| `du-lich` | Du Lịch | Sky Blue |
| `the-thao` | Thể Thao | Lime |
| `nong-san` | Nông Sản | Green |
| `cay-canh` | Cây Cảnh | Emerald |

---

## ❓ Xử lý lỗi thường gặp

### Lỗi 1: "Cannot find module"

```bash
npm install
```

### Lỗi 2: Script không chạy

```bash
# Cấp quyền (Linux/Mac)
chmod +x scripts/setup-customer.js

# Hoặc chạy trực tiếp bằng node
node scripts/setup-customer.js
```

### Lỗi 3: Deploy thất bại

```bash
# Kiểm tra Vercel CLI đã login chưa
vercel whoami

# Login nếu cần
vercel login

# Deploy lại
vercel --prod
```

---

## 📞 Hỗ trợ

Liên hệ nếu cần:
- 📧 Email: support@yourcompany.com
- 📱 SĐT: 0982.581.222

---

## 📝 Phiên bản

- **v1.0.0** - Setup tự động cho khách hàng
- **Ngày**: 16/04/2026
