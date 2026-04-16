"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1920&q=80",
    title: "Nghệ Thuật Thêu Tay",
    subtitle: "Truyền thống Việt Nam",
    description: "Mỗi đường kim mũi chỉ đều mang theo tâm huyết và kỹ nghệ được truyền lại qua nhiều thế hệ.",
    cta: "Khám phá bộ sưu tập",
    href: "/san-pham",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1920&q=80",
    title: "Khóa Học Thêu Online",
    subtitle: "Học từ cơ bản đến nâng cao",
    description: "Trải nghiệm nghệ thuật thêu tay với các khóa học được thiết kế bài bản.",
    cta: "Đăng ký ngay",
    href: "/khoa-hoc",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=1920&q=80",
    title: "Phụ Kiện Thêu Cao Cấp",
    subtitle: "Khung, chỉ, kim chất lượng",
    description: "Tất cả dụng cụ bạn cần để bắt đầu hành trình thêu tay.",
    cta: "Mua ngay",
    href: "/phu-kien",
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            fill
            className="object-cover"
            priority
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-4xl"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base tracking-[0.4em] text-white/70 uppercase mb-6 font-light"
            >
              {slides[currentSlide].subtitle}
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-white mb-8 leading-tight drop-shadow-2xl"
            >
              {slides[currentSlide].title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-base md:text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            >
              {slides[currentSlide].description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Link
                href={slides[currentSlide].href}
                className="group inline-flex items-center gap-3 bg-white text-[var(--color-dark)] px-10 py-4 text-sm font-semibold tracking-wider hover:bg-[var(--color-primary)] hover:text-white transition-all duration-500 rounded-sm shadow-2xl hover:shadow-[var(--color-primary)]/30 hover:-translate-y-1"
              >
                {slides[currentSlide].cta}
                <svg 
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-8 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300 border border-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="md:w-7 md:h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-8 bottom-20 md:bottom-auto md:top-1/2 md:-translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white/80 hover:bg-white/20 hover:text-white hover:scale-110 transition-all duration-300 border border-white/20"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="md:w-7 md:h-7" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentSlide ? "bg-white w-10" : "bg-white/40 w-1.5 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
