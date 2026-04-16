"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Clock, Users, Award, CheckCircle, Play } from "lucide-react";
import Link from "next/link";

const courses = [
  {
    id: "1",
    title: "Thêu tay cơ bản - Bắt đầu từ con số 0",
    description: "Khóa học dành cho người mới bắt đầu, học các kỹ thuật thêu cơ bản và hoàn thành tranh thêu đầu tiên.",
    duration: "8 tuần",
    students: 120,
    lessons: 24,
    price: 1200000,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    features: [
      "24 bài giảng video chi tiết",
      "Tài liệu thực hành đầy đủ",
      "Hỗ trợ giảng viên trực tiếp",
      "Chứng chỉ hoàn thành",
    ],
  },
  {
    id: "2",
    title: "Thêu tranh phong cảnh nâng cao",
    description: "Học kỹ thuật thêu phong cảnh, tạo chiều sâu và hiệu ứng ánh sáng trong tranh.",
    duration: "12 tuần",
    students: 85,
    lessons: 36,
    price: 2000000,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    features: [
      "36 bài giảng chuyên sâu",
      "Kỹ thuật tạo chiều sâu",
      "Phối màu nâng cao",
      "Dự án thực tế",
    ],
  },
  {
    id: "3",
    title: "Thêu chân dung và figure",
    description: "Kỹ thuật thêu chân dung, từ cơ bản đến nâng cao, tạo nên những tác phẩm sống động.",
    duration: "16 tuần",
    students: 60,
    lessons: 48,
    price: 3500000,
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=600&q=80",
    features: [
      "48 bài giảng chuyên sâu",
      "Kỹ thuật thêu chân dung",
      "Tạo biểu cảm khuôn mặt",
      "Hướng dẫn 1-1",
    ],
  },
];

export default function CoursesPage() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-[30vh] sm:h-[40vh] min-h-[200px] sm:min-h-[300px] w-full overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1544816155-12df9643f363?w=1920&q=80"
          alt="Khóa học thêu tay"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-stone-900/70" />
        <div className="relative mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Khóa học thêu tay
            </h1>
            <p className="mt-2 sm:mt-4 max-w-2xl text-sm sm:text-lg text-stone-300">
              Học nghệ thuật thêu tay từ cơ bản đến nâng cao
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            <div className="flex items-center justify-center gap-4">
              <Users className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Học viên</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Play className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-muted-foreground">Bài giảng</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Award className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">98%</p>
                <p className="text-sm text-muted-foreground">Hài lòng</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Courses */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-foreground">Khóa học của chúng tôi</h2>
          <p className="mt-2 text-muted-foreground">
            Chọn khóa học phù hợp với trình độ và mục tiêu của bạn
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-white shadow-sm"
            >
              <div className="relative aspect-video">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-semibold text-foreground">
                  {course.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {course.description}
                </p>
                
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Play className="h-4 w-4" />
                    {course.lessons} bài
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {course.students} học viên
                  </div>
                </div>

                <ul className="mt-4 space-y-2">
                  {course.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-primary">
                      {formatPrice(course.price)}
                    </p>
                    <Link
                      href={`/khoa-hoc/${course.id}`}
                      className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}


