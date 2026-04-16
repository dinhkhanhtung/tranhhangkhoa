/**
 * PRODUCT GRID LAYOUTS - Giai đoạn 4
 * Mỗi ngành có Product Grid layout khác nhau
 */

import { IndustryType } from "@/lib/industry-themes";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface ProductGridProps {
  products: Product[];
  theme: any;
  formatPrice: (price: number) => string;
}

// ============================================
// 1. ARTISAN GRID - Masonry, nghệ thuật
// Tranh thêu, Gốm sứ, Trang sức
// ============================================
export function ArtisanGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {products.map((product, idx) => (
        <div 
          key={product.id} 
          className="break-inside-avoid group relative overflow-hidden rounded-xl"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div className="relative aspect-[3/4]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <button 
                className="w-full py-2 rounded-lg font-medium text-white flex items-center justify-center gap-2"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <ShoppingCart size={18} /> Thêm vào giỏ
              </button>
            </div>
          </div>
          <div className="p-4">
            <h4 className="font-medium text-sm mb-1" style={{ color: theme.colors.text.primary }}>
              {product.name}
            </h4>
            <p className="font-bold" style={{ color: theme.colors.primary }}>
              {formatPrice(product.price)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 2. LUXURY GRID - Large images, elegant
// Đồ gỗ, Nội thất, Đèn trang trí
// ============================================
export function LuxuryGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group relative overflow-hidden rounded-2xl shadow-lg"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div className="relative aspect-[16/10]">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute top-4 right-4 flex gap-2">
              <button 
                className="p-2 rounded-full bg-white/90 shadow-md hover:bg-white transition-colors"
                style={{ color: theme.colors.primary }}
              >
                <Heart size={18} />
              </button>
            </div>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-lg mb-1" style={{ color: theme.colors.text.primary }}>
                {product.name}
              </h4>
              <div className="flex items-center gap-1 text-sm" style={{ color: theme.colors.text.muted }}>
                <Star size={14} fill="currentColor" /> 4.9 (128 đánh giá)
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                {formatPrice(product.price)}
              </p>
              <button 
                className="mt-2 px-4 py-2 rounded-lg text-sm font-medium text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 3. FASHION GRID - 2 cols, trendy
// Thời trang, Giày dép, Túi xách
// ============================================
export function FashionGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group"
        >
          <div 
            className="relative aspect-[3/4] rounded-lg overflow-hidden mb-3"
            style={{ backgroundColor: theme.colors.surface }}
          >
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button className="p-2 rounded-full bg-white text-black hover:bg-gray-100 transition-colors">
                <Eye size={18} />
              </button>
              <button className="p-2 rounded-full bg-white text-black hover:bg-gray-100 transition-colors">
                <Heart size={18} />
              </button>
            </div>
            {idx === 0 && (
              <span 
                className="absolute top-2 left-2 px-2 py-1 rounded text-xs font-bold text-white"
                style={{ backgroundColor: theme.colors.accent }}
              >
                NEW
              </span>
            )}
          </div>
          <h4 className="font-medium text-sm truncate" style={{ color: theme.colors.text.primary }}>
            {product.name}
          </h4>
          <p className="font-bold mt-1" style={{ color: theme.colors.primary }}>
            {formatPrice(product.price)}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 4. BEAUTY GRID - Cards with details
// Mỹ phẩm, Sức khỏe
// ============================================
export function BeautyGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div className="relative aspect-square p-4">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
            />
            <button 
              className="absolute bottom-2 right-2 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ backgroundColor: theme.colors.primary, color: 'white' }}
            >
              <ShoppingCart size={16} />
            </button>
          </div>
          <div className="p-3 border-t" style={{ borderColor: theme.colors.border }}>
            <h4 className="font-medium text-xs mb-1 line-clamp-2" style={{ color: theme.colors.text.primary }}>
              {product.name}
            </h4>
            <div className="flex items-center justify-between">
              <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>
                {formatPrice(product.price)}
              </p>
              <div className="flex text-xs" style={{ color: theme.colors.accent }}>
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} fill="currentColor" />
                <Star size={12} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 5. FOOD GRID - Horizontal cards
// Ẩm thực, Đồ uống, Nông sản
// ============================================
export function FoodGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="space-y-4">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="flex gap-4 p-4 rounded-xl items-center"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-lg mb-2" style={{ color: theme.colors.text.primary }}>
              {product.name}
            </h4>
            <p className="text-sm mb-3" style={{ color: theme.colors.text.secondary }}>
              Sản phẩm tươi ngon, chất lượng cao, giao hàng nhanh chóng
            </p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold" style={{ color: theme.colors.primary }}>
                {formatPrice(product.price)}
              </p>
              <button 
                className="px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <ShoppingCart size={18} className="inline mr-1" /> Thêm
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 6. TECH GRID - Clean list with specs
// Điện tử, Gia dụng, Phụ kiện công nghệ
// ============================================
export function TechGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group rounded-xl overflow-hidden border transition-all hover:shadow-lg"
          style={{ 
            backgroundColor: theme.colors.surface,
            borderColor: theme.colors.border 
          }}
        >
          <div className="relative aspect-[4/3] bg-gray-50 p-6">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <span 
              className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-bold text-white"
              style={{ backgroundColor: theme.colors.accent }}
            >
              -15%
            </span>
          </div>
          <div className="p-4">
            <h4 className="font-semibold mb-2" style={{ color: theme.colors.text.primary }}>
              {product.name}
            </h4>
            <div className="flex items-center gap-2 text-xs mb-3" style={{ color: theme.colors.text.muted }}>
              <span className="px-2 py-1 rounded bg-gray-100">Bảo hành 12 tháng</span>
              <span className="px-2 py-1 rounded bg-gray-100">Freeship</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs line-through" style={{ color: theme.colors.text.muted }}>
                  {formatPrice(product.price * 1.15)}
                </p>
                <p className="text-lg font-bold" style={{ color: theme.colors.primary }}>
                  {formatPrice(product.price)}
                </p>
              </div>
              <button 
                className="px-4 py-2 rounded-lg font-medium text-white"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Mua
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 7. BOOK GRID - Traditional book style
// Sách, Văn phòng phẩm
// ============================================
export function BookGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group text-center"
        >
          <div className="relative aspect-[2/3] mb-3 shadow-lg group-hover:shadow-xl transition-shadow rounded-r-md overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />
          </div>
          <h4 className="font-medium text-xs mb-1 line-clamp-2" style={{ color: theme.colors.text.primary }}>
            {product.name}
          </h4>
          <p className="font-bold text-sm" style={{ color: theme.colors.primary }}>
            {formatPrice(product.price)}
          </p>
        </div>
      ))}
    </div>
  );
}

// ============================================
// 8. TRAVEL GRID - Large cards with overlay
// Du lịch, homestay
// ============================================
export function TravelGrid({ products, theme, formatPrice }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product, idx) => (
        <div 
          key={product.id}
          className="group relative aspect-[16/9] rounded-2xl overflow-hidden"
        >
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h4 className="font-bold text-xl mb-2">{product.name}</h4>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
              <button className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors">
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// PRODUCT GRID SELECTOR
// ============================================
export function IndustryProductGrid({ industry, ...props }: ProductGridProps & { industry: IndustryType }) {
  switch (industry) {
    // Nghệ thuật - Masonry
    case "tranh-theu":
    case "gom-su":
    case "trang-suc":
      return <ArtisanGrid {...props} />;
    
    // Sang trọng - Large images
    case "do-go":
    case "noi-that":
    case "den-trang-tri":
      return <LuxuryGrid {...props} />;
    
    // Fashion - Trendy grid
    case "thoi-trang":
    case "giay-dep":
      return <FashionGrid {...props} />;
    
    // Beauty - Cards with ratings
    case "my-pham":
    case "suc-khoe":
    case "y-te":
      return <BeautyGrid {...props} />;
    
    // Food - Horizontal cards
    case "am-thuc":
    case "do-uong":
    case "nong-san":
    case "cay-canh":
      return <FoodGrid {...props} />;
    
    // Tech - Clean list
    case "do-dien-tu":
    case "phu-kien-cong-nghe":
    case "do-gia-dung":
      return <TechGrid {...props} />;
    
    // Books - Traditional
    case "sach-vpp":
    case "giao-duc":
      return <BookGrid {...props} />;
    
    // Travel - Large overlay
    case "du-lich":
    case "the-thao":
      return <TravelGrid {...props} />;
    
    default:
      return <TechGrid {...props} />;
  }
}
