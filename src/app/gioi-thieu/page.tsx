"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Heart, Users, Leaf } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Tâm huyết",
    description: "Mỗi sản phẩm đều được tạo ra với tất cả tâm huyết và tình yêu nghệ thuật.",
  },
  {
    icon: Award,
    title: "Chất lượng",
    description: "Cam kết chất lượng tuyệt hảo trong từng đường kim mũi chỉ.",
  },
  {
    icon: Leaf,
    title: "Bền vững",
    description: "Sử dụng nguyên liệu thân thiện với môi trường và quy trình sản xuất bền vững.",
  },
  {
    icon: Users,
    title: "Cộng đồng",
    description: "Xây dựng cộng đồng yêu nghệ thuật thêu, truyền lửa đam mê cho thế hệ trẻ.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&q=80"
          alt="Về chúng tôi"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/60" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold text-white sm:text-5xl">Về chúng tôi</h1>
            <p className="mt-4 text-lg text-stone-300">
              Tên Thương Hiệu - Nơi nghệ thuật truyền thống gặp gỡ đam mê hiện đại
            </p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-foreground">Câu chuyện của chúng tôi</h2>
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                [Tên Thương Hiệu] được thành lập với mong muốn gìn giữ và phát huy
                nghệ thuật thêu tay truyền thống của Việt Nam. Từ một xưởng thêu nhỏ,
                chúng tôi đã phát triển thành một thương hiệu được
                nhiều người yêu nghệ thuật tin tưởng.
              </p>
              <p>
                Mỗi tác phẩm của chúng tôi đều được hoàn thiện bởi đôi bàn tay tài hoa
                của các nghệ nhân lành nghề, những người đã dành cả đời để theo đuổi
                nghệ thuật thêu. Chúng tôi tin rằng, mỗi đường kim mũi chỉ không chỉ
                là kỹ thuật, mà còn là tâm hồn của người nghệ nhân.
              </p>
              <p>
                Ngoài việc tạo ra những tác phẩm nghệ thuật, chúng tôi còn tổ chức các
                khóa học thêu tay để truyền lại kiến thức và đam mê cho thế hệ trẻ,
                giúp nghệ thuật thêu truyền thống được gìn giữ và phát triển.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80"
              alt="Nghệ nhân thêu tay"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl font-bold text-foreground">Giá trị cốt lõi</h2>
            <p className="mt-2 text-muted-foreground">
              Những nguyên tắc định hướng mọi hoạt động của chúng tôi
            </p>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground">Đội ngũ của chúng tôi</h2>
          <p className="mt-2 text-muted-foreground">
            Những người thổi hồn vào từng tác phẩm
          </p>
        </motion.div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { name: "Nguyễn Thị Hoa", role: "Nghệ nhân trưởng", exp: "30 năm kinh nghiệm" },
            { name: "Trần Văn Minh", role: "Nghệ nhân cao cấp", exp: "20 năm kinh nghiệm" },
            { name: "Lê Thị Thượng", role: "Giảng viên", exp: "15 năm kinh nghiệm" },
          ].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="overflow-hidden rounded-lg border border-border bg-white"
            >
              <div className="relative aspect-square bg-secondary">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/20">{member.name[0]}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary">{member.role}</p>
                <p className="mt-1 text-sm text-muted-foreground">{member.exp}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}


