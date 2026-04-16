"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Nghệ Thuật Thêu Tay Truyền Thống Việt Nam",
    excerpt: "Khám phá lịch sử và kỹ thuật thêu tay được truyền lại qua nhiều thế hệ.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    category: "Văn Hóa Truyền Thống",
    date: "15 Tháng 3, 2024",
  },
  {
    id: 2,
    title: "Câu Chuyện Sản Phẩm: Tranh Thêu Hoa Sen",
    excerpt: "Hành trình tạo nên tác phẩm thêu hoa sen tinh khiết từ bùn.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
    category: "Câu Chuyện Sản Phẩm",
    date: "10 Tháng 3, 2024",
  },
  {
    id: 3,
    title: "Workshop Thêu Tay Của Chúng Tôi",
    excerpt: "Những khoảnh khắc đáng nhớ từ buổi workshop thêu tay tháng 2.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    category: "Tin Tức & Sự Kiện",
    date: "5 Tháng 3, 2024",
  },
];

export default function BlogSection() {
  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-dark)] mb-3">
            Bài Viết Mới Nhất
          </h2>
          <p className="text-sm text-[#57534e] max-w-md mx-auto">
            Khám phá câu chuyện, tin tức và kiến thức về nghệ thuật thêu tay
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/bai-viet/${post.id}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[var(--color-primary)] font-medium">{post.category}</span>
                    <span className="text-[#57534e]">•</span>
                    <span className="text-[#57534e]">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#57534e] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/bai-viet"
            className="inline-block border border-[var(--color-dark)] text-[var(--color-dark)] px-8 py-3 text-sm tracking-wide hover:bg-[var(--color-dark)] hover:text-white transition-all duration-300"
          >
            Xem tất cả bài viết
          </Link>
        </div>
      </div>
    </section>
  );
}

