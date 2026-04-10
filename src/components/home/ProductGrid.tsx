"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye } from "lucide-react";
import QuickViewModal from "@/components/product/QuickViewModal";

type TabType = "new" | "bestsellers";

const newArrivals = [
  {
    id: "1",
    name: "Tranh thêu hoa sen - Tinh khiết từ bùn",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80",
    badge: "Mới",
    rating: 5,
    reviews: 12,
    colors: ["#b45309", "#1c1917", "#78716c"],
  },
  {
    id: "2",
    name: "Tranh thêu chim hạc - Tùng hạc diên niên",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=600&q=80",
    rating: 5,
    reviews: 8,
    colors: ["#1c1917", "#78716c"],
  },
  {
    id: "3",
    name: "Tranh thêu cô gái Việt - Dịu dàng áo dài",
    price: 4200000,
    image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=80",
    rating: 4,
    reviews: 15,
    colors: ["#b45309", "#1c1917"],
  },
  {
    id: "4",
    name: "Tranh thêu phong cảnh - Làng quê yên bình",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1459749411177-047381bb3ece?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=600&q=80",
    rating: 5,
    reviews: 6,
    colors: ["#1c1917"],
  },
];

const bestSellers = [
  {
    id: "5",
    name: "Khung thêu gỗ sồi cao cấp 40x50cm",
    price: 450000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
    badge: "Bán chạy",
    rating: 5,
    reviews: 45,
    colors: ["#a8a29e", "#78350f", "#1c1917"],
  },
  {
    id: "6",
    name: "Bộ chỉ thêu 100 màu cao cấp",
    price: 280000,
    image: "https://images.unsplash.com/photo-1582562124811-c8ed1b31bc3b?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    rating: 5,
    reviews: 32,
    colors: ["#f59e0b"],
  },
  {
    id: "7",
    name: "Kim thêu vàng Nhật Bản (set 12 cây)",
    price: 180000,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1582562124811-c8ed1b31bc3b?w=600&q=80",
    rating: 4,
    reviews: 28,
    colors: ["#fbbf24"],
  },
  {
    id: "8",
    name: "Tranh thêu hoa mẫu đơn - Phú quý cát tường",
    price: 3800000,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80",
    hoverImage: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
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
        <Link href={`/san-pham/${product.id}`} className="block w-full h-full">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-[#b45309] to-[#d97706] text-white text-[10px] font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full shadow-lg z-10">
            {product.badge}
          </div>
        )}

        {/* Quick View Button - Floating */}
        <div className="absolute bottom-4 left-4 right-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onQuickView(product);
            }}
            className="w-full bg-white/95 backdrop-blur-sm text-[#1c1917] py-3 text-xs font-semibold tracking-wide hover:bg-[#b45309] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 rounded-lg shadow-lg"
          >
            <Eye size={16} />
            Xem nhanh
          </button>
        </div>

        {/* Wishlist Button */}
        <button className="absolute top-4 right-4 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#b45309] hover:text-white shadow-md z-10">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
