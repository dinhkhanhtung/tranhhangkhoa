"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Eye, ShoppingBag, Heart, Search, Filter } from "lucide-react";
import { useState } from "react";
import { Toast, useToast } from "@/components/ui/Toast";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const sessionData = useSession();
  const session = sessionData?.data;
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      showToast("Vui lòng đăng nhập để thêm vào yêu thích", "warning");
      setTimeout(() => {
        router.push("/dang-nhap");
      }, 1500);
      return;
    }

    setIsWishlisted(!isWishlisted);
    showToast(
      isWishlisted ? "Đã xóa khỏi yêu thích" : "Đã thêm vào yêu thích",
      "success"
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative"
    >
      <Toast toast={toast} onClose={hideToast} />
      
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden rounded-lg bg-[#f5f5f4] mb-3">
        <Link href={`/san-pham/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Wishlist Button - Top Right */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white transition-colors shadow-sm"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-red-500 text-red-500" : "text-[#57534e]"}
          />
        </button>

        {/* Hover Overlay with Quick View & Add to Cart */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/0 opacity-0 transition-all duration-300 group-hover:bg-black/40 group-hover:opacity-100">
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[var(--color-dark)] shadow-lg hover:bg-[var(--color-primary)] hover:text-white transition-colors"
          >
            <Eye size={16} />
            Xem nhanh
          </motion.button>
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-medium text-white shadow-lg hover:bg-[var(--color-secondary)] transition-colors"
          >
            <ShoppingBag size={16} />
            Thêm vào giỏ
          </motion.button>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center">
        <p className="text-xs text-[#57534e] uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <Link href={`/san-pham/${product.id}`}>
          <h3 className="text-sm font-medium text-[var(--color-dark)] line-clamp-2 min-h-[40px] hover:text-[var(--color-primary)] transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-semibold text-[var(--color-primary)] mt-1">
          {formatPrice(product.price)}
        </p>
      </div>
    </motion.div>
  );
}

const accessories = [
  {
    id: "1",
    name: "Khung thêu gỗ sồi cao cấp 40x50cm",
    price: 450000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    category: "Khung tranh",
  },
  {
    id: "2",
    name: "Khung thêu nhôm điều chỉnh 30x40cm",
    price: 280000,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    category: "Khung tranh",
  },
  {
    id: "3",
    name: "Bộ chỉ thêu 100 màu cao cấp",
    price: 280000,
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
    category: "Chỉ thêu",
  },
  {
    id: "4",
    name: "Kim thêu vàng Nhật Bản (set 12 cây)",
    price: 180000,
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    category: "Kim thêu",
  },
  {
    id: "5",
    name: "Vải canvas Aida 14ct - 50x70cm",
    price: 85000,
    image: "https://images.unsplash.com/photo-1623947038525-8c973b2c0616?w=600&q=80",
    category: "Vải thêu",
  },
  {
    id: "6",
    name: "Hộp đựng kim chỉ 3 tầng",
    price: 150000,
    image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80",
    category: "Dụng cụ",
  },
];

export default function AccessoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  const categories = ["Tất cả", "Khung tranh", "Chỉ thêu", "Kim thêu", "Vải thêu", "Dụng cụ"];

  const filteredAccessories = accessories.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Tất cả" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-[#fffbf5] pt-[100px] lg:pt-[120px] pb-12">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-[var(--color-dark)] mb-4">
              Phụ Kiện Thêu Tay
            </h1>
            <p className="text-[#57534e] max-w-2xl mx-auto">
              Khung tranh, kim chỉ, vải canvas và các dụng cụ thêu tay cao cấp để bạn thỏa sức sáng tạo
            </p>
          </div>

          {/* Search & Filter */}
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#57534e]" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm phụ kiện..."
                className="w-full pl-12 pr-4 py-3 border border-[#e7e5e4] rounded-lg focus:border-[var(--color-primary)] focus:outline-none"
              />
            </div>

            <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[#f5f5f4] text-[#57534e] hover:bg-[#e7e5e4]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        {filteredAccessories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAccessories.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#57534e]">Không tìm thấy phụ kiện nào phù hợp.</p>
          </div>
        )}
      </div>
    </div>
  );
}


