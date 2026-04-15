"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import BlogSkeleton from "@/components/blog/BlogSkeleton";

const blogPosts = [
  {
    id: 1,
    title: "Nghệ Thuật Thêu Tay Truyền Thống Việt Nam",
    excerpt: "Khám phá lịch sử và kỹ thuật thêu tay được truyền lại qua nhiều thế hệ. Từ những đường kim mũi chỉ đơn giản đến những tác phẩm nghệ thuật tinh xảo.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    category: "Văn Hóa Truyền Thống",
    date: "15 Tháng 3, 2024",
    readTime: "5 phút đọc",
  },
  {
    id: 2,
    title: "Câu Chuyện Sản Phẩm: Tranh Thêu Hoa Sen",
    excerpt: "Hành trình tạo nên tác phẩm thêu hoa sen tinh khiết từ bùn. Mỗi bông sen là cả một câu chuyện về sự kiên nhẫn và tâm huyết của người nghệ nhân.",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80",
    category: "Câu Chuyện Sản Phẩm",
    date: "10 Tháng 3, 2024",
    readTime: "4 phút đọc",
  },
  {
    id: 3,
    title: "Workshop Thêu Tay Của Chúng Tôi",
    excerpt: "Những khoảnh khắc đáng nhớ từ buổi workshop thêu tay tháng 2. Cùng xem các học viên đã tạo nên những tác phẩm đầu tay như thế nào.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    category: "Tin Tức & Sự Kiện",
    date: "5 Tháng 3, 2024",
    readTime: "3 phút đọc",
  },
  {
    id: 4,
    title: "Top 5 Loại Chỉ Thêu Phổ Biến Nhất",
    excerpt: "Tìm hiểu về các loại chỉ thêu từ cotton, lụa đến kim tuyến. Mỗi loại chỉ có đặc điểm và ứng dụng riêng trong nghệ thuật thêu tay.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    category: "Kiến Thức Thêu",
    date: "28 Tháng 2, 2024",
    readTime: "6 phút đọc",
  },
  {
    id: 5,
    title: "Ý Nghĩa Các Họa Tiết Trong Tranh Thêu",
    excerpt: "Hoa sen, chim hạc, tùng cúc trúc mai - mỗi họa tiết đều mang một ý nghĩa sâu sắc trong văn hóa Á Đông.",
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    category: "Văn Hóa Truyền Thống",
    date: "20 Tháng 2, 2024",
    readTime: "5 phút đọc",
  },
  {
    id: 6,
    title: "Video Hướng Dẫn: Cơ Bản Về Kỹ Thuật Thêu",
    excerpt: "Seri video hướng dẫn thêu tay từ cơ bản đến nâng cao. Bắt đầu với những đường kim đầu tiên.",
    image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80",
    category: "Video",
    date: "15 Tháng 2, 2024",
    readTime: "8 phút xem",
  },
];

const categories = [
  "Tất cả",
  "Văn Hóa Truyền Thống",
  "Câu Chuyện Sản Phẩm",
  "Tin Tức & Sự Kiện",
  "Kiến Thức Thêu",
  "Video",
];

export default function BlogPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for natural feel
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#fffbf5] pt-[100px] lg:pt-[120px] pb-16">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-serif text-[#1c1917] mb-4">
            Bài Viết
          </h1>
          <p className="text-[#57534e] max-w-2xl mx-auto">
            Khám phá câu chuyện, tin tức và kiến thức về nghệ thuật thêu tay truyền thống
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className={`px-4 py-2 text-sm transition-colors ${
                category === "Tất cả"
                  ? "bg-[#1c1917] text-white"
                  : "bg-[#f5f5f4] text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        {isLoading ? (
          <BlogSkeleton />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                    <span className="text-[#b45309] font-medium">{post.category}</span>
                    <span className="text-[#57534e]">•</span>
                    <span className="text-[#57534e]">{post.date}</span>
                    <span className="text-[#57534e]">•</span>
                    <span className="text-[#57534e]">{post.readTime}</span>
                  </div>
                  <h2 className="text-lg font-medium text-[#1c1917] group-hover:text-[#b45309] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#57534e] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
