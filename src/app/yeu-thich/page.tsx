"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

// Mock product data for wishlist items
const productData: Record<string, { name: string; price: number; image: string; category: string }> = {
  "1": {
    name: "Túi thêu tay hoa sen - Thủ công cao cấp",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80",
    category: "Túi thêu tay",
  },
  "2": {
    name: "Túi xách thêu chim hạc - Phong cách Trung Hoa",
    price: 3500000,
    image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80",
    category: "Túi thêu tay",
  },
  "3": {
    name: "Cặp tóc thêu hoa mẫu đơn - Truyền thống",
    price: 850000,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&q=80",
    category: "Phụ kiện",
  },
  "4": {
    name: "Ví cầm tay thêu hoa lan - Tinh xảo",
    price: 1200000,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    category: "Ví",
  },
  "5": {
    name: "Túi đeo chéo thêu rồng phượng - Cổ điển",
    price: 3200000,
    image: "https://images.unsplash.com/photo-1549298916-f52e28b5f7b9?w=400&q=80",
    category: "Túi thêu tay",
  },
  "6": {
    name: "Cặp tóc thêu hoa cúc - Nhật Bản",
    price: 650000,
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=400&q=80",
    category: "Phụ kiện",
  },
  "7": {
    name: "Túi clutch thêu hoa đào - Xuân sang",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80",
    category: "Túi thêu tay",
  },
  "8": {
    name: "Balo thêu hoa sen - Thanh lịch",
    price: 2800000,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80",
    category: "Balo",
  },
};

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function WishlistPage() {
  const sessionData = useSession();
  const session = sessionData?.data;
  const status = sessionData?.status;
  const router = useRouter();
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(savedWishlist);

    // Map wishlist IDs to product data
    const items = savedWishlist
      .map((id: string) => {
        const product = productData[id];
        return product ? { ...product, id } : null;
      })
      .filter(Boolean) as WishlistItem[];
    setWishlistItems(items);
  }, []);

  // Loading state
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-[100px] lg:pt-[120px] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-[#b45309] border-t-transparent rounded-full"></div>
      </div>
    );
  }

  // Not logged in - show login prompt
  if (!session) {
    return (
      <div className="min-h-screen bg-[#fffbf5] pt-[100px] lg:pt-[120px] pb-12">
        <div className="mx-auto max-w-md px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 rounded-lg shadow-sm border border-[#e7e5e4] text-center"
          >
            <div className="w-16 h-16 bg-[#b45309]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart size={32} className="text-[#b45309]" />
            </div>
            <h1 className="text-xl font-serif text-[#1c1917] mb-2">
              Danh sách yêu thích
            </h1>
            <p className="text-sm text-[#57534e] mb-6">
              Vui lòng đăng nhập để xem và quản lý danh sách sản phẩm yêu thích của bạn
            </p>
            <div className="space-y-3">
              <button
                onClick={() => router.push("/dang-nhap")}
                className="w-full py-3 bg-[#b45309] text-white font-medium rounded-lg hover:bg-[#92400e] transition-colors"
              >
                Đăng nhập
              </button>
              <button
                onClick={() => router.push("/dang-ky")}
                className="w-full py-3 border border-[#e7e5e4] text-[#1c1917] font-medium rounded-lg hover:bg-[#f5f5f4] transition-colors"
              >
                Tạo tài khoản
              </button>
            </div>
            <Link
              href="/san-pham"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[#b45309] hover:underline"
            >
              <ArrowRight size={16} />
              Tiếp tục mua sắm
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // Logged in - show wishlist
  return (
    <div className="min-h-screen bg-[#fffbf5] pt-[140px] lg:pt-[160px] pb-12">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl font-serif text-[#1c1917]">Danh sách yêu thích</h1>
          <p className="text-sm text-[#57534e] mt-1">
            {wishlistItems.length} sản phẩm đã lưu
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="mx-auto text-[#e7e5e4] mb-4" />
            <h3 className="text-lg font-medium text-[#1c1917] mb-2">
              Chưa có sản phẩm yêu thích
            </h3>
            <p className="text-sm text-[#57534e] mb-4">
              Lưu sản phẩm yêu thích để mua sắm sau
            </p>
            <Link
              href="/san-pham"
              className="inline-block px-6 py-2.5 bg-[#b45309] text-white rounded-lg text-sm hover:bg-[#92400e] transition-colors"
            >
              Khám phá sản phẩm
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((product: WishlistItem) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden group"
              >
                <Link href={`/san-pham/${product.id}`}>
                  <div className="relative aspect-square overflow-hidden bg-[#f5f5f4]">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-[#57534e] uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <Link href={`/san-pham/${product.id}`}>
                    <h3 className="text-sm font-medium text-[#1c1917] line-clamp-2 min-h-[40px] hover:text-[#b45309] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-semibold text-[#b45309] mt-1">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 py-2 bg-[#b45309] text-white text-sm rounded-lg hover:bg-[#92400e] transition-colors flex items-center justify-center gap-1">
                      <ShoppingBag size={14} />
                      Thêm giỏ
                    </button>
                    <button className="p-2 border border-red-200 text-red-500 rounded-lg hover:bg-red-50 transition-colors">
                      <Heart size={16} className="fill-current" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
