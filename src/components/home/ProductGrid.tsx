"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye } from "lucide-react";
import QuickViewModal from "@/components/product/QuickViewModal";

type TabType = "new" | "bestsellers";

const newArrivals = [
  {
    id: "1",
    name: "Túi thêu tay hoa sen - Thủ công cao cấp",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1549298916-f52e28b5f7b9?w=600&q=80",
    badge: "Mới",
    rating: 5,
    reviews: 12,
    colors: ["#b45309", "#1c1917", "#78716c"],
  },
  {
    id: "2",
    name: "Túi xách thêu chim hạc - Phong cách Trung Hoa",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    rating: 5,
    reviews: 8,
    colors: ["#1c1917", "#78716c"],
  },
  {
    id: "3",
    name: "Cặp tóc thêu hoa mẫu đơn - Truyền thống",
    price: 850000,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    rating: 4,
    reviews: 15,
    colors: ["#b45309", "#dc2626"],
  },
  {
    id: "4",
    name: "Ví cầm tay thêu hoa lan - Tinh xảo",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1549298916-f52e28b5f7b9?w=600&q=80",
    rating: 5,
    reviews: 6,
    colors: ["#1c1917", "#b45309"],
  },
];

const bestSellers = [
  {
    id: "5",
    name: "Túi đeo chéo thêu rồng phượng - Cổ điển",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1549298916-f52e28b5f7b9?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&q=80",
    badge: "Bán chạy",
    rating: 5,
    reviews: 45,
    colors: ["#dc2626", "#fbbf24", "#1c1917"],
  },
  {
    id: "6",
    name: "Cặp tóc thêu hoa cúc - Nhật Bản",
    price: 650000,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&q=80",
    rating: 5,
    reviews: 32,
    colors: ["#fbbf24", "#f59e0b"],
  },
  {
    id: "7",
    name: "Túi clutch thêu hoa đào - Xuân sang",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=600&q=80",
    rating: 4,
    reviews: 28,
    colors: ["#f472b6", "#fbcfe8"],
  },
  {
    id: "8",
    name: "Balo thêu hoa sen - Thanh lịch",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80",
    badge: "Có sẵn",
    rating: 5,
    reviews: 18,
    colors: ["#b45309", "#dc2626", "#1c1917"],
  },
];

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  rating: number;
  reviews: number;
  colors: string[];
}

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setIsWishlisted(wishlist.includes(product.id));
  }, [product.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const newWishlist = isWishlisted
      ? wishlist.filter((id: string) => id !== product.id)
      : [...wishlist, product.id];
    localStorage.setItem("wishlist", JSON.stringify(newWishlist));
    setIsWishlisted(!isWishlisted);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f4] mb-4 rounded-lg shadow-sm hover:shadow-xl transition-shadow duration-500">
        {/* Main Link - covers entire image area */}
        <Link 
          href={`/san-pham/${product.id}`} 
          className="absolute inset-0 z-0"
          aria-label={`Xem chi tiết ${product.name}`}
        >
          {/* Main Image */}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Hover Image */}
          {product.hoverImage && (
            <Image
              src={product.hoverImage}
              alt={product.name}
              fill
              className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            />
          )}
        </Link>

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b45309] to-[#d97706] text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg z-20 pointer-events-none">
            {product.badge}
          </div>
        )}

        {/* Quick View Button - Floating */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-[#1c1917] py-3 text-xs font-semibold tracking-wide hover:bg-[#b45309] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-lg shadow-lg"
          >
            <Eye size={16} />
            Xem nhanh
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#b45309] hover:text-white shadow-md z-20 press-feedback ${isWishlisted ? "bg-[#b45309] text-white opacity-100" : ""}`}
          aria-label={isWishlisted ? "Xóa khỏi yêu thích" : "Thêm vào yêu thích"}
        >
          <svg className="w-4 h-4" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Product Info - Outside image container */}
      <Link href={`/san-pham/${product.id}`} className="block text-center px-2">
        {/* Color Swatches */}
        <div className="flex justify-center gap-2 mb-3">
          {product.colors.map((color, idx) => (
            <div
              key={idx}
              className="w-5 h-5 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-125 transition-transform duration-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        
        {/* Rating */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < product.rating ? "fill-[#fbbf24] text-[#fbbf24]" : "text-[#e7e5e4]"}
              />
            ))}
          </div>
          <span className="text-xs text-[#57534e]">({product.reviews})</span>
        </div>
        
        <h3 className="text-[15px] text-[#1c1917] mb-2 line-clamp-2 min-h-[44px] font-medium hover:text-[#b45309] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-lg font-bold text-[#b45309]">
          {formatPrice(product.price)}
        </p>
      </Link>
    </div>
  );
}

export default function ProductGrid() {
  const [activeTab, setActiveTab] = useState<TabType>("new");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const products = activeTab === "new" ? newArrivals : bestSellers;

  // Convert Product to QuickView format
  const quickViewData = quickViewProduct ? {
    ...quickViewProduct,
    reviewCount: quickViewProduct.reviews,
    description: "Tác phẩm thêu tay tinh xảo được thực hiện bởi các nghệ nhân lành nghề với hơn 20 năm kinh nghiệm.",
    inStock: true,
    category: "Tranh thêu tay",
    gallery: [quickViewProduct.image, quickViewProduct.hoverImage || quickViewProduct.image],
  } : null;

  return (
    <>
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm tracking-[0.2em] text-[#b45309] uppercase mb-3 font-medium">Sản Phẩm Của Chúng Tôi</p>
          <h2 className="text-3xl md:text-4xl font-serif text-[#1c1917] mb-4">Bộ Sưu Tập Thêu Tay</h2>
          <p className="text-[#57534e] max-w-lg mx-auto">Khám phá những tác phẩm thêu tay tinh xảo, mang đậm giá trị văn hóa Việt Nam</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center gap-12 mb-12">
          <button
            onClick={() => setActiveTab("new")}
            className={`text-lg pb-3 transition-all duration-300 relative font-medium ${
              activeTab === "new"
                ? "text-[#1c1917]"
                : "text-[#a8a29e] hover:text-[#1c1917]"
            }`}
          >
            Sản Phẩm Mới
            {activeTab === "new" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b45309]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("bestsellers")}
            className={`text-lg pb-3 transition-all duration-300 relative font-medium ${
              activeTab === "bestsellers"
                ? "text-[#1c1917]"
                : "text-[#a8a29e] hover:text-[#1c1917]"
            }`}
          >
            Bán Chạy
            {activeTab === "bestsellers" && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#b45309]" />
            )}
          </button>
        </div>

        {/* 4 columns grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} onQuickView={setQuickViewProduct} />
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link
            href="/san-pham"
            className="group inline-flex items-center gap-3 bg-[#b45309] text-white px-12 py-4 text-sm font-semibold tracking-wider hover:bg-[#1c1917] transition-all duration-500 rounded-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Xem tất cả sản phẩm
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
      </div>
    </section>

    <QuickViewModal
      isOpen={!!quickViewProduct}
      onClose={() => setQuickViewProduct(null)}
      product={quickViewData}
    />
    </>
  );
}
