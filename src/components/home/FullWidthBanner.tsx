"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function FullWidthBanner() {
  return (
    <section className="relative bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-dark)] mb-4 leading-tight">
              <span className="text-[var(--color-primary)]">Tham Gia Chương Trình</span>
              <br />
              Thành Viên & Nhận Quà!
            </h2>
            <p className="text-[#57534e] mb-6 leading-relaxed">
              Tận hưởng ưu đãi giảm 10% cho đơn hàng tiếp theo, miễn phí vận chuyển*, 
              tích điểm cho mỗi giao dịch và nhiều đặc quyền hấp dẫn khác!
            </p>
            <Link
              href="/tai-khoan/dang-ky"
              className="inline-block border border-[var(--color-primary)] text-[var(--color-primary)] px-8 py-3 text-sm tracking-wide hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 uppercase"
            >
              Tìm Hiểu Thêm
            </Link>
            <p className="text-xs text-[#a8a29e] mt-4">
              *Không áp dụng cho tất cả sản phẩm
            </p>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 shadow-lg"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Họ"
                className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
              <input
                type="text"
                placeholder="Tên"
                className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[var(--color-primary)] focus:outline-none transition-colors"
              />
              <button className="w-full bg-[var(--color-primary)] text-white py-4 font-medium tracking-wide hover:bg-[var(--color-dark)] transition-colors uppercase">
                Tạo Tài Khoản Miễn Phí
              </button>
            </div>
            <p className="text-sm text-[#57534e] text-center mt-4">
              Đã có tài khoản?{" "}
              <Link href="/tai-khoan/dang-nhap" className="text-[var(--color-primary)] hover:underline">
                Đăng nhập tại đây
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

