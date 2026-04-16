"use client";

import { motion } from "framer-motion";
import { Leaf, Heart, Award } from "lucide-react";

const features = [
  {
    icon: Leaf,
    title: "Thiết Kế Ý Nghĩa",
    description: "Mỗi tác phẩm đều mang một câu chuyện và thông điệp sâu sắc, được chăm chút từng chi tiết.",
  },
  {
    icon: Heart,
    title: "Cảm Hứng Truyền Thống",
    description: "Kế thừa tinh hoa văn hóa dân tộc, kết hợp hài hòa giữa nghệ thuật cổ điển và hiện đại.",
  },
  {
    icon: Award,
    title: "Thủ Công Tinh Xảo",
    description: "Hoàn toàn làm thủ công bởi các nghệ nhân lành nghề, đảm bảo chất lượng tuyệt hảo.",
  },
];

export default function Features() {
  return (
    <section className="bg-[#fffbf5] py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="mb-5 relative">
                <div className="w-20 h-20 border border-[#e7e5e4] rounded-full flex items-center justify-center group-hover:border-[var(--color-primary)] transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-[var(--color-primary)]" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="text-base font-medium tracking-wide text-[var(--color-dark)] uppercase mb-3">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#57534e] max-w-xs">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

