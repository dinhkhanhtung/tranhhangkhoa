"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star, ChevronDown, Loader2, SearchX } from "lucide-react";
import QuickViewModal from "@/components/product/QuickViewModal";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";

// Sidebar filter component
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="border-b border-[#e7e5e4] py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-sm font-medium uppercase tracking-wider mb-3"
      >
        {title}
        <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && <div className="space-y-2">{children}</div>}
    </div>
  );
}

const categories = [
  { name: "Tranh thêu tay", count: 21 },
  { name: "Phụ kiện thêu", count: 15 },
  { name: "Khung thêu", count: 8 },
  { name: "Dụng cụ thêu", count: 12 },
];

const colors = [
  { name: "Đen", hex: "#1c1917" },
  { name: "Nâu", hex: "#57534e" },
  { name: "Cam", hex: "#b45309" },
  { name: "Be", hex: "#d6d3d1" },
  { name: "Xanh navy", hex: "#1e3a5f" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const searchCategory = searchParams.get("category");
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(searchCategory);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 10000000]);
  const [sortBy, setSortBy] = useState("featured");
  const [quickViewProduct, setQuickViewProduct] = useState<any | null>(null);

  useEffect(() => {
    setSelectedCategory(searchCategory);
  }, [searchCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        if (!db) {
          // Fallback to mock data if Firebase not configured
          const mockProducts = [
            { id: "1", name: "Tranh thêu hoa sen - Tinh khiết từ bùn", price: 2800000, image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80", category: "Tranh thêu tay" },
            { id: "2", name: "Tranh thêu chim hạc - Tùng hạc diên niên", price: 3500000, image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=600&q=80", category: "Tranh thêu tay" },
            { id: "3", name: "Tranh thêu cô gái Việt - Dịu dàng áo dài", price: 4200000, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80", category: "Tranh thêu tay" },
            { id: "4", name: "Tranh thêu phong cảnh - Làng quê yên bình", price: 3200000, image: "https://images.unsplash.com/photo-1582562124811-c8ed1b31bc3b?w=600&q=80", category: "Tranh thêu tay" },
            { id: "5", name: "Khung thêu gỗ sồi cao cấp 40x50cm", price: 450000, image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=600&q=80", category: "Phụ kiện thêu" },
            { id: "6", name: "Bộ chỉ thêu 100 màu cao cấp", price: 280000, image: "https://images.unsplash.com/photo-1606293926075-69a00febf281?w=600&q=80", category: "Phụ kiện thêu" },
          ];
          setProducts(mockProducts);
          return;
        }

        const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data.length > 0 ? data : []); // Use empty if no products in DB
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = !selectedCategory || product.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-serif text-[#1c1917] text-center">Tất Cả Sản Phẩm</h1>
            <p className="mt-2 text-[#57534e] text-center max-w-xl mx-auto">
              Khám phá bộ sưu tập tranh thêu tay và phụ kiện thêu tinh tế
            </p>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-64 shrink-0">
            {/* Category Filter */}
            <FilterSection title="Danh mục">
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                  className={`flex items-center justify-between w-full text-sm py-1 ${
                    selectedCategory === cat.name ? "text-[#b45309]" : "text-[#57534e] hover:text-[#b45309]"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs">({cat.count})</span>
                </button>
              ))}
            </FilterSection>

            {/* Price Filter */}
            <FilterSection title="Giá">
              <div className="space-y-3">
                <input
                  type="range"
                  min="0"
                  max="5000000"
                  step="100000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full accent-[#b45309]"
                />
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#57534e]">0đ -</span>
                  <span className="text-sm font-medium text-[#1c1917]">{formatPrice(priceRange[1])}</span>
                </div>
              </div>
            </FilterSection>

            {/* Color Filter */}
            <FilterSection title="Màu sắc">
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => {
                      setSelectedColors(prev => 
                        prev.includes(color.name) 
                          ? prev.filter(c => c !== color.name)
                          : [...prev, color.name]
                      );
                    }}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      selectedColors.includes(color.name) 
                        ? "border-[#b45309] ring-2 ring-[#b45309]/20" 
                        : "border-[#e7e5e4]"
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </FilterSection>

            {/* Availability */}
            <FilterSection title="Tình trạng">
              <label className="flex items-center gap-2 text-sm text-[#57534e] cursor-pointer">
                <input type="checkbox" className="accent-[#b45309]" />
                Còn hàng
              </label>
            </FilterSection>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex flex-col">
                <p className="text-sm text-[#57534e]">{filteredProducts.length} sản phẩm</p>
                {searchQuery && (
                  <p className="text-xs text-[#b45309] font-medium">Kết quả tìm kiếm cho: "{searchQuery}"</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#57534e]">Sắp xếp:</span>
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-[#e7e5e4] px-3 py-2 focus:border-[#b45309] focus:outline-none"
                >
                  <option value="featured">Nổi bật</option>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá: Thấp đến cao</option>
                  <option value="price-high">Giá: Cao đến thấp</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#57534e]">
                <Loader2 size={40} className="animate-spin mb-4 text-[#b45309]" />
                <p>Đang tải sản phẩm...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group"
                  >
                    <div className="relative aspect-square bg-[#f5f5f4] overflow-hidden mb-3">
                      <Link href={`/san-pham/${product.id}`}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      {/* Quick View */}
                      <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button 
                          onClick={() => setQuickViewProduct(product)}
                          className="w-full bg-[#b45309] text-white py-2.5 text-xs font-medium tracking-wide hover:bg-[#1c1917] transition-colors"
                        >
                          Xem nhanh
                        </button>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="flex justify-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className="fill-[#b45309] text-[#b45309]" />
                        ))}
                      </div>
                      <h3 className="text-sm text-[#1c1917] mb-1 line-clamp-2">{product.name}</h3>
                      <p className="text-sm font-medium text-[#b45309]">{formatPrice(product.price)}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-[#fffbf5] rounded-full flex items-center justify-center mb-6">
                  <SearchX size={40} className="text-[#b45309]" />
                </div>
                <h3 className="text-xl font-bold text-[#1c1917] mb-2">Không tìm thấy sản phẩm nào</h3>
                <p className="text-[#57534e] max-w-xs mx-auto mb-8">
                  Thử thay đổi bộ lọc hoặc tìm kiếm bằng từ khóa khác.
                </p>
                <button 
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 10000000]);
                    window.history.pushState({}, '', '/san-pham');
                  }}
                  className="px-6 py-3 bg-[#1c1917] text-white font-bold rounded-xl hover:bg-[#b45309] transition-all"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct ? {
          ...quickViewProduct,
          rating: 5,
          reviewCount: 12,
          description: "Tác phẩm thêu tay tinh xảo được thực hiện bởi các nghệ nhân lành nghề.",
          inStock: true,
          category: quickViewProduct.category,
          gallery: [quickViewProduct.image],
        } : null}
      />
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-screen py-20 text-[#57534e]">
        <Loader2 size={40} className="animate-spin mb-4 text-[#b45309]" />
        <p>Đang chuẩn bị sản phẩm...</p>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}
