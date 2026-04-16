# 🚀 HƯỚNG DẪN TRIỂN KHAI VÀ DEMO CHO KHÁCH HÀNG

> **Project:** industry-themes  
> **Vercel URL:** https://industry-themes.vercel.app  
> **Tính năng:** 19 ngành nghề, 1 codebase, auto-demo  

---

## 📋 MỤC LỤC

1. [Demo cho khách hàng](#1-demo-cho-khách-hàng)
2. [Nhân bản cho khách hàng](#2-nhân-bản-cho-khách-hàng)
3. [Setup mới cho khách hàng](#3-setup-mới-cho-khách-hàng)
4. [Checklist triển khai](#4-checklist-triển-khai)

---

## 1. DEMO CHO KHÁCH HÀNG

### 🔗 URL Demo Sẵn Có

Gửi cho khách hàng xem trước theo ngành:

```
🔗 https://industry-themes.vercel.app/demo?industry=tranh-theu
🔗 https://industry-themes.vercel.app/demo?industry=do-go
🔗 https://industry-themes.vercel.app/demo?industry=thoi-trang
🔗 https://industry-themes.vercel.app/demo?industry=my-pham
🔗 https://industry-themes.vercel.app/demo?industry=am-thuc
🔗 https://industry-themes.vercel.app/demo?industry=do-uong
🔗 https://industry-themes.vercel.app/demo?industry=suc-khoe
... (19 ngành)
```

### 📱 Cách demo nhanh

**Bước 1:** Hỏi khách hàng ngành nghề
- Ví dụ: "Anh/chị bán đồ gỗ phải không?"

**Bước 2:** Gửi URL tương ứng
- Gửi: `https://industry-themes.vercel.app/demo?industry=do-go`

**Bước 3:** Giải thích
- "Đây là giao diện mẫu cho ngành đồ gỗ"
- "Màu sắc, bố cục, menu tự động thay đổi theo ngành"
- "Click 'Gọi ngay' để liên hệ setup"

**Bước 4:** So sánh ngành khác
- Mở tab mới với ngành khác để so sánh
- VD: `/demo?industry=thoi-trang` (hoàn toàn khác màu, layout)

---

## 2. NHÂN BẢN CHO KHÁCH HÀNG

### 🎯 Strategy: GitHub Template (Khuyến nghị)

**Ưu điểm:**
- 1 click tạo repo mới cho khách
- Dễ maintain, dễ update
- Khách tự deploy trên Vercel

**Nhược điểm:**
- Khách cần có GitHub account

### 📋 Quy trình nhân bản

#### **Bước 1: Tạo Template từ repo hiện tại**

```bash
# Trên GitHub
1. Vào repo: https://github.com/dinhkhanhtung/tranhhangkhoa
2. Settings → General → Template repository ✅
3. Save
```

#### **Bước 2: Hướng dẫn khách sử dụng template**

Gửi email cho khách:

```
Subject: Website [Tên Shop] - Hướng dẫn setup

Chào [Tên khách],

Dưới đây là hướng dẫn setup website:

1. **Tạo GitHub account** (miễn phí)
   → https://github.com/signup

2. **Tạo repo từ template**
   → Click: https://github.com/dinhkhanhtung/tranhhangkhoa/generate
   → Đặt tên: [ten-shop]-website
   → Chọn Private

3. **Kết nối Vercel**
   → Vào https://vercel.com/new
   → Import repo vừa tạo
   → Framework: Next.js
   → Deploy

4. **Cấu hình ngành nghề**
   → Vào Admin → Cài đặt → Ngành nghề
   → Chọn: [Tên ngành]
   → Lưu

5. **Cấu hình Firebase** (lưu trữ data)
   → Tôi sẽ setup giúp qua Zalo

Liên hệ: 0982.581.222
```

#### **Bước 3: Clone và customize cho khách**

Nếu khách không rành kỹ thuật, tự làm giúp:

```bash
# Clone repo
gh repo create [ten-shop]/website --template dinhkhanhtung/tranhhangkhoa

# Customize
cd website
# Edit: src/context/WebsiteContext.tsx defaultSettings
# Edit: .env.local với Firebase config của khách

# Push và deploy
git push origin main
vercel --prod
```

---

## 3. SETUP MỚI CHO KHÁCH HÀNG

### 🔥 Strategy 1: Subdomain (Khuyến nghị cho nhiều khách)

**Kiến trúc:**
```
industry-themes.vercel.app          ← Main site
customer1.industry-themes.vercel.app ← Khách 1
customer2.industry-themes.vercel.app ← Khách 2
```

**Cách làm:**

```bash
# Tạo branch cho khách
git checkout -b customer1-tranh-theu

# Customize default settings
# Edit src/context/WebsiteContext.tsx
# Change default industry, brand info

# Deploy branch
vercel --prod --target production
```

**Vercel Settings:**
```
Settings → Domains
Add: customer1.industry-themes.vercel.app
```

### 🔧 Strategy 2: Multi-tenant (1 codebase, N database)

**Cách làm:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  
  // Extract subdomain
  const subdomain = host.split('.')[0]
  
  // Add subdomain to request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-subdomain', subdomain)
  
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}
```

```typescript
// Firebase config based on subdomain
const getFirebaseConfig = (subdomain: string) => {
  const configs: Record<string, any> = {
    'customer1': { projectId: 'customer1-db', ... },
    'customer2': { projectId: 'customer2-db', ... },
  }
  return configs[subdomain] || configs['default']
}
```

---

## 4. CHECKLIST TRIỂN KHAI

### ✅ Trước khi gặp khách

- [ ] Chọn ngành nghề phù hợp
- [ ] Chuẩn bị 2-3 URL demo
- [ ] Test URL trên điện thoại
- [ ] Chuẩn bị giá (theo gói)

### ✅ Trong buổi demo

- [ ] Hỏi ngành nghề trước
- [ ] Show demo phù hợp
- [ ] Show so sánh ngành khác
- [ ] Giải thích tính năng: "Đổi màu 1 click"
- [ ] Show admin panel
- [ ] Ghi chú yêu cầu đặc biệt

### ✅ Sau khi khách đồng ý

- [ ] Thu tiền cọc (50%)
- [ ] Yêu cầu: Logo, tên shop, địa chỉ
- [ ] Tạo GitHub repo / branch
- [ ] Setup Firebase
- [ ] Deploy
- [ ] Hướng dẫn sử dụng admin
- [ ] Thu tiền còn lại
- [ ] Bàn giao

---

## 💰 BẢNG GIÁ GỢI Ý

| Gói | Tính năng | Giá |
|-----|-----------|-----|
| **Starter** | 1 ngành, cơ bản, subdomain | 2-3 triệu |
| **Business** | 1 ngành, đầy đủ, custom domain | 5-7 triệu |
| **Enterprise** | Multi-tenant, bảo trì 1 năm | 10-15 triệu |

---

## 📞 LIÊN HỆ

- **Phone:** 0982.581.222
- **Zalo:** 0982.581.222
- **Email:** your@email.com

---

*Cập nhật: 16/04/2026*
