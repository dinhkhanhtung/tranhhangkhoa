"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const values = [
  {
    id: 1,
    title: "Thiết Kế Ý Nghĩa",
    subtitle: "Meaningful Designs",
    description: "Phía sau mỗi sản phẩm là một câu chuyện đầy cảm hứng đang chờ được kể. Chúng tôi tin rằng nghệ thuật thêu tay không chỉ là trang trí, mà còn là ngôn ngữ truyền tải giá trị văn hóa và tâm hồn.",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80",
    reverse: false,
  },
  {
    id: 2,
    title: "Cảm Hứng Thiêng Liêng",
    subtitle: "Divinely-Inspired",
    description: "Lấy cảm hứng từ vẻ đẹp của thiên nhiên và nghệ thuật truyền thống, mọi thiết kế của chúng tôi đều bắt nguồn từ di sản văn hóa phong phú. Mỗi đường kim mũi chỉ đều mang theo sự tôn kính đối với nghệ thuật cổ truyền.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&q=80",
    reverse: true,
  },
  {
    id: 3,
    title: "Chất Lượng Thủ Công",
    subtitle: "Quality Craftsmanship",
    description: "Làm việc với các nghệ nhân địa phương tài hoa, vẻ đẹp của những sản phẩm thủ công cao cấp của chúng tôi sẽ vượt qua thử thách của thời gian. Mỗi tác phẩm đều là kết tinh của sự kiên nhẫn và tâm huyết.",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    reverse: false,
  },
];

export default function OurValues() {
  return (
    <section className="py-20 bg-[#fffbf5]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-serif text-[var(--color-dark)]">
            Giá Trị Của Chúng Tôi
          </h2>
        </motion.div>

        {/* Values Grid */}
        <div className="space-y-20">
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
                value.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image */}
              <div className={`relative aspect-[4/3] overflow-hidden ${value.reverse ? "lg:order-2" : ""}`}>
                <Image
                  src={value.image}
                  alt={value.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className={`text-center lg:text-left ${value.reverse ? "lg:order-1" : ""}`}>
                <p className="text-sm text-[var(--color-primary)] uppercase tracking-wider mb-2">
                  {value.subtitle}
                </p>
                <h3 className="text-2xl md:text-3xl font-serif text-[var(--color-dark)] mb-4">
                  {value.title}
                </h3>
                <p className="text-[#57534e] leading-relaxed max-w-md mx-auto lg:mx-0">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

