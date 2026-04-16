"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Tranh Thêu Phong Cảnh",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    href: "/san-pham?category=phong-canh",
    size: "large",
  },
  {
    id: 2,
    name: "Tranh Thêu Hoa Điểu",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    href: "/san-pham?category=hoa-dieu",
    size: "small",
  },
  {
    id: 3,
    name: "Phụ Kiện Thêu",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    href: "/phu-kien",
    size: "small",
  },
  {
    id: 4,
    name: "Khóa Học Thêu",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    href: "/khoa-hoc",
    size: "medium",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-16 bg-[#fffbf5]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="text-sm tracking-[0.2em] text-[var(--color-primary)] uppercase mb-3 font-medium">Khám Phá</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-dark)] mb-4">
            Danh Mục Nổi Bật
          </h2>
          <p className="text-[#57534e] max-w-md mx-auto">
            Các bộ sưu tập tranh thêu được yêu thích nhất
          </p>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Large Item */}
          <Link href={categories[0].href} className="group relative col-span-2 row-span-2 aspect-square overflow-hidden">
            <Image
              src={categories[0].image}
              alt={categories[0].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-serif text-white mb-2 drop-shadow-lg">{categories[0].name}</h3>
              <span className="inline-flex items-center gap-2 text-sm text-white/90 border-b border-white/40 pb-1 group-hover:border-white transition-all duration-300">
                Xem bộ sưu tập
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>

          {/* Small Items */}
          {categories.slice(1, 3).map((category) => (
            <Link key={category.id} href={category.href} className="group relative aspect-square overflow-hidden">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-base md:text-lg font-serif text-white drop-shadow-md">{category.name}</h3>
              </div>
            </Link>
          ))}

          {/* Medium Item */}
          <Link href={categories[3].href} className="group relative col-span-2 aspect-[2/1] overflow-hidden">
            <Image
              src={categories[3].image}
              alt={categories[3].name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="text-xl md:text-2xl font-serif text-white mb-2 drop-shadow-lg">{categories[3].name}</h3>
              <span className="inline-flex items-center gap-2 text-sm text-white/90 border-b border-white/40 pb-1 group-hover:border-white transition-all duration-300">
                Đăng ký ngay
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

