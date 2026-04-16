"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Nghệ Thuật Thêu Tay Truyền Thống Việt Nam",
    excerpt: "Khám phá lịch sử và kỹ thuật thêu tay được truyền lại qua nhiều thế hệ.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Commissioned_embroidery_by_V%C5%A9_Ng%E1%BB%8Dc_Ho%C3%A1nh%2C_Chief_of_L%E1%BA%A1ng_S%C6%A1n_Province_03.jpg",
    category: "Văn Hóa Truyền Thống",
    date: "15 Tháng 3, 2024",
  },
  {
    id: 2,
    title: "Câu Chuyện Sản Phẩm: Tranh Thêu Hoa Sen",
    excerpt: "Hành trình tạo nên tác phẩm thêu hoa sen tinh khiết từ bùn.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Silk_embroidery_with_Tree_of_Life_motif_from_Vietnam.JPG",
    category: "Câu Chuyện Sản Phẩm",
    date: "10 Tháng 3, 2024",
  },
  {
    id: 3,
    title: "Workshop Thêu Tay Của Chúng Tôi",
    excerpt: "Những khoảnh khắc đáng nhớ từ buổi workshop thêu tay tháng 2.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Commissioned_embroidery_by_V%C5%A9_Ng%E1%BB%8Dc_Ho%C3%A1nh%2C_Chief_of_L%E1%BA%A1ng_S%C6%A1n_Province_02.jpg",
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
          <p className="text-sm text-[var(--color-muted)] max-w-md mx-auto">
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
                    loading="lazy"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-[var(--color-primary)] font-medium">{post.category}</span>
                    <span className="text-[var(--color-muted)]">•</span>
                    <span className="text-[var(--color-muted)]">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-medium text-[var(--color-dark)] group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--color-muted)] line-clamp-2">
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

