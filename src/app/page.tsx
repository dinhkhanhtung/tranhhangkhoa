"use client";

import { useWebsite } from "@/context/WebsiteContext";
import { getIndustryTheme } from "@/lib/industry-themes";
import { IndustryHero } from "@/components/industry-layouts/HeroLayouts";
import { IndustryProductGrid } from "@/components/industry-layouts/ProductGridLayouts";
import Features from "@/components/home/Features";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import OurValues from "@/components/home/OurValues";
import FullWidthBanner from "@/components/home/FullWidthBanner";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import BlogSection from "@/components/home/BlogSection";
import { industryContent } from "@/app/demo/demoData";

export default function Home() {
  const { settings } = useWebsite();
  const industry = settings.industry;
  const theme = getIndustryTheme(industry);
  const content = industryContent[industry] || industryContent["thoi-trang"];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Dynamic Hero - Thay đổi theo ngành admin chọn */}
      <IndustryHero 
        industry={industry}
        brandName={settings.brand.name}
        slogan={settings.brand.slogan}
        theme={theme}
        onCtaClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
      />

      <Features />

      {/* Dynamic Products - Thay đổi theo ngành */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <p className="text-sm tracking-[0.2em] uppercase mb-3 font-medium" style={{ color: theme.colors.primary }}>
              Sản Phẩm {theme.name}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: theme.colors.text.primary }}>
              Bộ Sưu Tập Nổi Bật
            </h2>
            <p className="max-w-lg mx-auto" style={{ color: theme.colors.text.secondary }}>
              Khám phá những sản phẩm {theme.name.toLowerCase()} chất lượng cao
            </p>
          </div>
          <IndustryProductGrid 
            industry={industry}
            products={content.products}
            theme={theme}
            formatPrice={formatPrice}
          />
        </div>
      </section>

      <FeaturedCategories />
      <OurValues />
      <FullWidthBanner />
      <ReviewsCarousel />
      <BlogSection />
    </>
  );
}
