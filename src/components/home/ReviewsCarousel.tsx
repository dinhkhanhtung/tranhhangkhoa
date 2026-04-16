"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    id: "1",
    name: "Nguyễn Thị Minh",
    location: "Hà Nội",
    rating: 5,
    text: "Chồng mua tặng mình bức tranh thêu hoa sen và mình rất thích! Thiết kế đẹp tuyệt vời, chi tiết tinh xảo, treo trong nhà làm nâng tầm không gian ngay. Dù nhà theo phong cách truyền thống hay hiện đại đều hợp cả!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
  },
  {
    id: "2",
    name: "Trần Văn Hùng",
    location: "TP. Hồ Chí Minh",
    rating: 5,
    text: "Mình đã mua rất nhiều tranh thêu từ shop qua các năm. Vợ mình rất thích và thường xuyên trưng bày. Cô ấy nói thích cả thiết kế độc đáo lẫn chất lượng thêu tinh xảo của từng bức tranh.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
  },
  {
    id: "3",
    name: "Lê Thị Hương",
    location: "Đà Nẵng",
    rating: 5,
    text: "Mình mua khung tranh thêu từ bộ sưu tập cao cấp. Rất hài lòng! Nhìn sang trọng, thiết kế tiện lợi cho người làm nghề bận rộn, gỗ mịn và êm tay tuyệt vời!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
  },
];

export default function ReviewsCarousel() {
  return (
    <section className="bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-dark)]">
            Khách Hàng Nói Gì
          </h2>
        </motion.div>

        {/* 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-8 rounded-lg shadow-sm relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-4 left-4">
                <div className="w-10 h-10 bg-[var(--color-primary)]/10 rounded-full flex items-center justify-center">
                  <Quote className="h-5 w-5 text-[var(--color-primary)]" />
                </div>
              </div>

              <div className="pt-8">
                {/* Review Text */}
                <p className="text-[var(--color-dark)] mb-6 leading-relaxed">
                  {review.text}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-[var(--color-dark)]">—{review.name}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Dots */}
        <div className="mt-8 flex items-center justify-center gap-2">
          <button className="p-2 text-[#57534e] hover:text-[var(--color-primary)] transition-colors">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            <button className="w-2 h-2 rounded-full bg-[var(--color-dark)]" />
            <button className="w-2 h-2 rounded-full bg-[#e7e5e4] hover:bg-[var(--color-primary)]/50" />
          </div>
          <button className="p-2 text-[#57534e] hover:text-[var(--color-primary)] transition-colors">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

