# ROADMAP - Tranh Thêu Tay Hằng Khoa

> File này ghi lại toàn bộ tính năng cần triển khai cho hệ thống
> Cập nhật: 14/04/2026

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

#### 1.1 Thanh Toán Tích Hợp ⭐⭐⭐⭐⭐ ✅
- [x] **Chuyển khoản ngân hàng** - Hiển thị thông tin TK trong checkout, xác nhận thủ công qua Zalo
- [x] **COD** (thanh toán khi nhận) - Giao hàng thu tiền
- [x] Trang thanh toán checkout với chọn phương thức
- [x] Trang kết quả thanh toán hiển thị thông tin chuyển khoản
- [x] Cấu hình phương thức thanh toán trong WebsiteContext (bật/tắt)
- [ ] ~~VNPay~~ (Bỏ qua - cần đăng ký doanh nghiệp, phức tạp)
- [ ] ~~Momo~~ (Bỏ qua - cần hợp đồng, phí cao)
- [ ] Chọn địa chỉ giao hàng (nhiều địa chỉ)
- [ ] Mã giảm giá/ưu đãi

#### 1.2 Quản Lý Đơn Hàng ⭐⭐⭐⭐⭐ ✅
**Khách hàng:**
- [x] Trang "Đơn hàng của tôi" trong tài khoản
- [x] Theo dõi trạng thái đơn: Chờ xác nhận → Đang chuẩn bị → Đang giao → Hoàn thành
- [ ] Hủy đơn hàng (trong 2h)
- [ ] Xem chi tiết đơn hàng (sản phẩm, giá, trạng thái) - *cần trang /don-hang/[id]*
- [ ] Đánh giá sản phẩm sau nhận hàng

**Admin:**
- [x] Bảng điều khiển đơn hàng mới (real-time từ Firebase)
- [x] Thống kê: Tổng đơn, chờ xử lý, đang giao, doanh thu
- [x] Xem chi tiết đơn hàng (modal)
- [x] Cập nhật trạng thái đơn hàng
- [ ] Lọc đơn hàng theo trạng thái, ngày
- [ ] In phiếu giao hàng

#### 1.3 Admin Sản Phẩm Hoàn Chỉnh ⭐⭐⭐⭐ ✅
- [x] Form thêm/sửa sản phẩm (UI dễ dùng, modal)
- [x] Upload ảnh (imgbb API)
- [x] Quản lý tồn kho số lượng
- [x] Thống kê: Tổng, đang bán, hết hàng, nổi bật
- [x] Xóa sản phẩm
- [ ] Rich text editor mô tả (TinyMCE) - *Tùy chọn*
- [ ] Quản lý biến thể (màu, size)
- [ ] Import/Export Excel

---

### GIAI ĐOẠN 2: HỆ THỐNG HỌC TẬP (2 tuần)

#### 2.1 Trang Học Video Thực Tế ⭐⭐⭐⭐⭐
- [ ] Trang "/hoc-tap" - danh sách khóa học đã đăng ký
- [ ] Trang học video: "/hoc-tap/[courseId]/[lessonId]"
- [ ] Embed YouTube với watermark client-side
- [ ] Chống download/chống copy (CSS + JS)
- [ ] Danh sách bài học sidebar
- [ ] Chuyển bài học next/prev

#### 2.2 Tiến Trình Học Tập ⭐⭐⭐⭐
- [ ] Đánh dấu hoàn thành bài học
- [ ] Tiến trình % khóa học
- [ ] Thời gian học cộng dồn
- [ ] Resume: tự động vào bài đang học

#### 2.3 Chứng Chỉ Hoàn Thành ⭐⭐⭐
- [ ] Tự động tạo khi đạt 100%
- [ ] Template chứng chỉ đẹp
- [ ] Tải PDF chứng chỉ
- [ ] Mã QR verify chứng chỉ

#### 2.4 Admin Khóa Học & Video ⭐⭐⭐⭐
- [ ] Thêm/sửa/xóa khóa học
- [ ] Thêm/sửa/xóa bài học
- [ ] Upload/link video YouTube
- [ ] Sắp xếp thứ tự bài học (kéo thả)
- [ ] Quản lý học viên theo khóa học

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
