import HeroBanner from "@/components/home/HeroBanner";
import Features from "@/components/home/Features";
import ProductGrid from "@/components/home/ProductGrid";
import FeaturedCategories from "@/components/home/FeaturedCategories";
import OurValues from "@/components/home/OurValues";
import FullWidthBanner from "@/components/home/FullWidthBanner";
import ReviewsCarousel from "@/components/home/ReviewsCarousel";
import BlogSection from "@/components/home/BlogSection";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Features />
      <ProductGrid />
      <FeaturedCategories />
      <OurValues />
      <FullWidthBanner />
      <ReviewsCarousel />
      <BlogSection />
    </>
  );
}


