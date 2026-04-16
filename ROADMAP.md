# ROADMAP - Website E-commerce & E-learning

> File này ghi lại toàn bộ tính năng cần triển khai cho hệ thống
> Cập nhật: 16/04/2026

---

## 📊 TRẠNG THÁI HIỆN TẠI

### ✅ Đã Hoàn Thành
- [x] Trang chủ với sản phẩm nổi bật
- [x] Trang chi tiết sản phẩm
- [x] Trang phụ kiện thêu tay
- [x] Giỏ hàng cơ bản
- [x] Trang blog/bài viết
- [x] Đăng nhập/Đăng ký (Google + Email)
- [x] Trang tài khoản người dùng
- [x] Trang danh sách khóa học
- [x] Trang chi tiết khóa học (có đăng ký)
- [x] Toast notification
- [x] Header với search, wishlist, account icons
- [x] Quick view modal
- [x] Admin sidebar layout
- [x] **Thanh toán & Quản lý đơn hàng hoàn chỉnh**
- [x] **Hệ thống học tập LMS (video, tiến trình)**
- [x] **Wishlist với localStorage**
- [x] **Admin CRUD sản phẩm, khóa học**
- [x] **UI/UX improvements (micro-interactions, SEO)**

### 🔴 Đang Thiếu (Quan Trọng)
- [ ] Hệ thống thanh toán (VNPay/Momo)
- [ ] Quản lý đơn hàng end-to-end
- [ ] Trang học video thực tế (LMS)
- [ ] Tiến trình học tập
- [ ] Admin quản lý sản phẩm hoàn chỉnh (CRUD)
- [ ] Admin quản lý đơn hàng
- [ ] Admin quản lý khóa học & video
- [ ] Admin quản lý học viên

---

## 🎯 LỘ TRÌNH TRIỂN KHAI

### 🟡 GIAI ĐOẠN 1: BÁN HÀNG HOÀN CHỈNH (2 tuần) - ĐANG THỰC HIỆN

#### 1.1 Thanh Toán Tích Hợp ⭐⭐⭐⭐⭐ ✅ ĐÃ HOÀN THÀNH
- [x] **Chuyển khoản ngân hàng** - Hiển thị thông tin TK trong checkout, xác nhận thủ công qua Zalo
- [x] **COD** (thanh toán khi nhận) - Giao hàng thu tiền
- [x] Trang thanh toán checkout với chọn phương thức
- [x] Trang kết quả thanh toán hiển thị thông tin chuyển khoản
- [x] Cấu hình phương thức thanh toán trong WebsiteContext (bật/tắt)
- [ ] ~~VNPay~~ (Bỏ qua - cần đăng ký doanh nghiệp, phức tạp)
- [ ] ~~Momo~~ (Bỏ qua - cần hợp đồng, phí cao)
- [ ] Chọn địa chỉ giao hàng (nhiều địa chỉ) - *Giai đoạn sau*
- [ ] Mã giảm giá/ưu đãi - *Giai đoạn sau*

#### 1.2 Quản Lý Đơn Hàng ⭐⭐⭐⭐⭐ ✅ ĐÃ HOÀN THÀNH CORE
**Khách hàng:**
- [x] Trang "Đơn hàng của tôi" trong tài khoản
- [x] Theo dõi trạng thái đơn: Chờ xác nhận → Đang chuẩn bị → Đang giao → Hoàn thành
- [x] Xem chi tiết đơn hàng (modal trong trang tài khoản)
- [ ] Hủy đơn hàng (trong 2h) - *Giai đoạn sau*
- [ ] Đánh giá sản phẩm sau nhận hàng - *Giai đoạn 3*

**Admin:**
- [x] Bảng điều khiển đơn hàng mới (real-time từ Firebase)
- [x] Thống kê: Tổng đơn, chờ xử lý, đang giao, doanh thu
- [x] Xem chi tiết đơn hàng (modal)
- [x] Cập nhật trạng thái đơn hàng
- [x] Lọc đơn hàng theo trạng thái, ngày
- [ ] In phiếu giao hàng - *Giai đoạn sau*

#### 1.3 Admin Sản Phẩm Hoàn Chỉnh ⭐⭐⭐⭐ ✅ ĐÃ HOÀN THÀNH CORE
- [x] Form thêm/sửa sản phẩm (UI dễ dùng, modal)
- [x] Upload ảnh (imgbb API)
- [x] Quản lý tồn kho số lượng
- [x] Thống kê: Tổng, đang bán, hết hàng, nổi bật
- [x] Xóa sản phẩm
- [ ] Rich text editor mô tả (TinyMCE) - *Tùy chọn, giai đoạn sau*
- [ ] Quản lý biến thể (màu, size) - *Giai đoạn sau*
- [ ] Import/Export Excel - *Giai đoạn sau*

---

### GIAI ĐOẠN 2: HỆ THỐNG HỌC TẬP (2 tuần)

#### 2.1 Trang Học Video Thực Tế ⭐⭐⭐⭐⭐ ✅ ĐÃ HOÀN THÀNH
- [x] Trang "/hoc-tap" - danh sách khóa học đã đăng ký (Firebase)
- [x] Trang học video: "/hoc-tap/[courseId]/[lessonId]"
- [x] Video player với controls
- [x] Danh sách bài học sidebar
- [x] Đánh dấu hoàn thành bài học
- [x] Theo dõi tiến trình học tập
- [x] Chuyển bài học (previous/next)
- [x] Resume: tự động vào bài đang học dở

#### 2.2 Admin Khóa Học ⭐⭐⭐⭐ ✅ ĐÃ HOÀN THÀNH
- [x] CRUD khóa học (Firebase)
- [x] Upload ảnh thumbnail
- [x] Quản lý bài học (thêm/sửa/xóa)
- [x] Phân cấp độ: Cơ bản/Trung cấp/Nâng cao
- [x] Đánh dấu nổi bật, công khai/bản nháp
- [x] Theo dõi học viên theo khóa học
- [x] Google Drive API - lấy video từ folder

#### 2.3 Chứng Chỉ Hoàn Thành ⭐⭐⭐
- [ ] Tự động tạo khi đạt 100%
- [ ] Template chứng chỉ đẹp
- [ ] Tải PDF chứng chỉ
- [ ] Mã QR verify chứng chỉ

---

### GIAI ĐOẠN 3: TƯƠNG TÁC & ENGAGEMENT (1 tuần)

#### 3.1 Bảng Xếp Hạng (Leaderboard) ⭐⭐⭐⭐
**Học viên:**
- [ ] Xếp hạng theo thời gian học
- [ ] Xếp hạng theo số bài hoàn thành
- [ ] Xếp hạng theo tốc độ hoàn thành
- [ ] Xếp hạng theo điểm bài tập

**Khóa học:**
- [ ] Xếp hạng khóa học bán chạy
- [ ] Xếp hạng theo rating
- [ ] Xu hướng tăng/giảm

#### 3.2 Đánh Giá & Review ⭐⭐⭐⭐
**Sản phẩm:**
- [ ] Đánh giá 1-5 sao
- [ ] Upload ảnh thành phẩm
- [ ] Viết review
- [ ] Phản hồi của shop

**Khóa học:**
- [ ] Đánh giá khóa học
- [ ] Bình luận từng bài học
- [ ] Hỏi đáp Q&A
- [ ] Đánh dấu câu hỏi đã giải đáp

#### 3.3 Chat & Liên Hệ ⭐⭐⭐
- [ ] Chat widget (Tawk.to hoặc Zalo OA)
- [ ] Form liên hệ
- [ ] Quản lý tin nhắn admin

---

### GIAI ĐOẠN 4: TỐI ƯU & MARKETING (1 tuần)

#### 4.1 SEO & Performance ⭐⭐⭐
- [ ] Sitemap XML động
- [ ] Meta tags tự động
- [ ] Schema.org Product/Course
- [ ] Share buttons (Zalo, Facebook)

#### 4.2 Email Automation ⭐⭐⭐
- [ ] Email xác nhận đơn hàng
- [ ] Email nhắc nhở khóa học (đang dở)
- [ ] Email khuyến mãi
- [ ] Newsletter đăng ký

#### 4.3 Analytics ⭐⭐
- [ ] Google Analytics 4
- [ ] Facebook Pixel
- [ ] Hotjar heatmap
- [ ] Dashboard thống kê admin

---

## 💡 TÍNH NĂNG ĐỘC ĐÁO (Optional)

### Công Cụ Xem Phối Cảnh 🖼️
- [ ] Khách upload ảnh phòng
- [ ] Xem preview tranh treo tường
- [ ] Giúp khách hình dung trước khi mua

### Đặt Tranh Theo Yêu Cầu ✏️
- [ ] Form đặt hàng custom
- [ ] Chọn kích thước, chủ đề, màu sắc
- [ ] Báo giá tự động theo độ phức tạp

### Cộng Đồng Thêu Tay 👥
- [ ] Gallery tác phẩm học viên
- [ ] Bình chọn "Tác phẩm của tháng"
- [ ] Chia sẻ kinh nghiệm, tips

---

## 🎨 GIAI ĐOẠN 5: INDUSTRY THEME + DEMO SYSTEM (MỚI - 2 tuần)

### 🎯 Mục Tiêu
- 1 codebase → N ngành nghề (tranh thêu, đồ gỗ, thời trang, mỹ phẩm...)
- Khách xem demo không cần setup thủ công
- Auto-generate demo site theo ngành

### 5.1 Industry Theme System ⭐⭐⭐⭐⭐

#### GIAI ĐOẠN 5.1.1: Thiết kế Theme Presets (2-3 ngày) ✅ ĐÃ HOÀN THÀNH
- [x] Nghiên cứu UI/UX Pro Max cho từng ngành
- [x] Tạo 7+ industry presets:
  - [x] `tranh-theu` (màu #b45309, style tinh tế)
  - [x] `do-go` (màu #8B4513, style mạnh mẽ)
  - [x] `thoi-trang` (màu #ec4899, style hiện đại)
  - [x] `my-pham` (màu #a855f7, style sang trọng)
  - [x] `do-gia-dung` (màu #059669, style sạch sẽ)
  - [x] `do-dien-tu` (màu #2563eb, style tech)
  - [x] `custom` (tùy chỉnh hoàn toàn)
- [x] Mỗi preset có:
  - [x] Color palette (primary, secondary, accent)
  - [x] Typography scale
  - [x] Border radius strategy
  - [x] Shadow/elevation style
  - [x] Navigation structure
  - [x] Product card style

#### GIAI ĐOẠN 5.1.2: Update WebsiteContext (1 ngày) ✅ ĐÃ HOÀN THÀNH
- [x] Thêm field `industry` vào WebsiteSettings interface
- [x] Thêm `customColors` override
- [x] Thêm `layoutStyle` (rounded/square/modern)
- [x] Tạo theme resolver function (useMemo)
- [x] Update localStorage persistence
- [x] Thêm `currentTheme` và `getThemeValue` vào context

#### GIAI ĐOẠN 5.1.3: Update Components (2 ngày)
**Tuần tự để tránh lỗi:**
- [ ] Globals.css - CSS variables cho theme
- [ ] Header.tsx - Dynamic navigation
- [ ] ProductCard.tsx - Dynamic styling
- [ ] HeroBanner.tsx - Dynamic layout
- [ ] Footer.tsx - Dynamic content
- [ ] Các trang còn lại

#### GIAI ĐOẠN 5.1.4: Admin UI (2 ngày)
- [ ] Thêm tab "Industry Theme" trong Website Settings
- [ ] Dropdown chọn industry preset
- [ ] Color picker cho custom override
- [ ] Layout style selector (card style, shadow, border radius)
- [ ] Live preview trong admin
- [ ] Reset to default button

### 5.2 Demo System ⭐⭐⭐⭐

#### GIAI ĐOẠN 5.2.1: URL Strategy (1 ngày)
**Quyết định: Dùng URL-based để tránh quá tải API**
```
/demo?industry=do-go&preset=premium
/demo?industry=thoi-trang&preset=minimal
```

**Ưu điểm:**
- Không cần subdomain/wildcard DNS
- 1 Vercel project = N demo
- Không gọi API liên tục
- Dễ cache

#### GIAI ĐOẠN 5.2.2: Demo Data Generator (2 ngày)
**Tách biệt hoàn toàn khỏi production data:**
- [ ] Tạo `demo-data/` folder
- [ ] Mỗi ngành có file JSON riêng:
  - `demo-data/do-go/products.json`
  - `demo-data/do-go/categories.json`
  - `demo-data/do-go/settings.json`
- [ ] Mock data cho 6-8 sản phẩm/ngành
- [ ] Ảnh từ Unsplash (không cần upload)

#### GIAI ĐOẠN 5.2.3: Demo Page Implementation (2 ngày)
- [ ] Tạo `/app/demo/page.tsx`
- [ ] Đọc query params (?industry=xxx)
- [ ] Override WebsiteContext với demo data
- [ ] Override ProductGrid với demo products
- [ ] Thêm banner "Đây là demo - Liên hệ để mua"
- [ ] Thêm nút "Mua giao diện này"

#### GIAI ĐOẠN 5.2.4: Demo Gallery (1 ngày)
- [ ] Trang `/demo` hiển thị tất cả industries
- [ ] Grid preview các theme
- [ ] Click để xem demo đầy đủ
- [ ] Form đăng ký xem demo

### 5.3 Rate Limiting & Performance ⭐⭐⭐⭐

**Quan trọng để tránh quá tải:**
- [ ] Static generation cho demo pages (ISR)
- [ ] Cache demo data 24h
- [ ] Image optimization (WebP, lazy load)
- [ ] Debounce API calls trong admin
- [ ] Rate limit: Max 10 demo requests/phút/IP

---

## ⚠️ KẾ HOẠCH TRIỂN KHAI TỪNG GIAI ĐOẠN

### Nguyên tắc tránh quá tải:
1. **Không gọi API liên tục** - Dùng local state, batch updates
2. **Static generation** - ISR cho demo pages
3. **Client-side only** - localStorage, không SSR
4. **Lazy loading** - Code split cho từng theme
5. **Debounce** - Admin inputs 300ms

### Thứ tự ưu tiên:
**Tuần 1:**
- Giai đoạn 5.1.1: Theme presets (nghiên cứu + design)
- Giai đoạn 5.1.2: WebsiteContext update

**Tuần 2:**
- Giai đoạn 5.1.3: Update components (tuần tự)
- Giai đoạn 5.1.4: Admin UI

**Tuần 3:**
- Giai đoạn 5.2.1: URL strategy
- Giai đoạn 5.2.2: Demo data generator

**Tuần 4:**
- Giai đoạn 5.2.3: Demo page implementation
- Giai đoạn 5.2.4: Demo gallery
- Testing & Optimization

---

## 📝 GHI CHÚ KỸ THUẬT

### Tech Stack
- Next.js 14 App Router
- TypeScript
- TailwindCSS
- shadcn/ui
- Firebase Firestore
- Firebase Auth
- NextAuth.js
- YouTube Embed API
- VNPay SDK

### API Keys Cần Có
- [ ] IMGBB_KEY (upload ảnh)
- [ ] VNPAY_TMN_CODE
- [ ] VNPAY_HASH_SECRET
- [ ] MOMO_PARTNER_CODE
- [ ] MOMO_ACCESS_KEY
- [ ] GOOGLE_CLIENT_ID
- [ ] GOOGLE_CLIENT_SECRET
- [ ] NEXTAUTH_SECRET

### Database Schema
```
/users
/orders
/order_items
/products
/courses
/lessons
/enrollments
/progress
/reviews
/cart_items
```

---

## ✅ CHECKLIST TRIỂN KHAI

### Trước khi bắt đầu mỗi giai đoạn:
- [ ] Backup code hiện tại
- [ ] Tạo branch mới
- [ ] Viết test cases (nếu cần)
- [ ] Chuẩn bị mock data

### Sau khi hoàn thành mỗi tính năng:
- [ ] Test trên local
- [ ] Kiểm tra responsive mobile
- [ ] Build production (npm run build)
- [ ] Deploy Vercel
- [ ] Cập nhật ROADMAP.md (đánh dấu [x])
- [ ] Viết hướng dẫn sử dụng (nếu cần)

---

## 🎯 MỤC TIÊU CUỐI CÙNG

**Thời gian dự kiến:** 6 tuần (từ 14/04/2026)

**Kết quả:**
- Hệ thống bán hàng hoàn chỉnh
- Hệ thống học tập LMS đầy đủ
- Admin dễ dùng cho người không biết code
- Khách hàng tự động mua hàng, học online
- Doanh thu tự động

---

## 📞 LIÊN HỆ HỖ TRỢ

Nếu cần hỗ trợ trong quá trình triển khai:
- Review code
- Debug lỗi
- Tối ưu performance
- Tư vấn UX/UI

---

*Cập nhật gần nhất: 14/04/2026*
*Phiên bản: 1.0*
