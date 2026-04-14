"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, ChevronRight, Star, 
  ChevronDown, Minus, Plus, CheckCircle2
} from "lucide-react";

interface ProductPageProps {
  params: { id: string };
}

const products = [
  {
    id: "1",
    name: "Túi Xách Da Thật Cao Cấp",
    price: 11500000,
    originalPrice: 13500000,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
      "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=800&q=80",
    ],
    category: "Phụ kiện thời trang",
    rating: 5,
    reviewCount: 15,
    colors: ["#1c1917", "#b45309", "#78716c"],
    sizes: ["Nhỏ", "Trung bình", "Lớn"],
    description: "Túi xách được làm từ da bò thật 100%, thiết kế tinh tế với đường may tỉ mỉ. Kiểu dáng sang trọng phù hợp cho mọi dịp, từ công sở đến tiệc tối.",
    details: [
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Chất liệu", value: "Da bò thật 100%" },
      { label: "Kích thước", value: "30 x 42 x 15.5 cm" },
      { label: "Quai xách", value: "24 cm" },
      { label: "Lót trong", value: "Vải canvas cao cấp" },
      { label: "Phần cứng", value: "Kim loại mạ vàng" },
      { label: "Logo", value: "Khắc laser tinh xảo" },
      { label: "Ngăn chính", value: "Khóa kéo + 1 ngăn phụ" },
      { label: "Ngăn phụ", value: "2 ngăn trước + 1 ngăn sau" },
      { label: "Phụ kiện", value: "Túi đựng dust bag" },
    ],
    badge: "Bán chạy",
    inStock: true,
  },
  {
    id: "2",
    name: "Tranh Thêu Quạt Giấy",
    price: 650000,
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
      "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80",
    ],
    category: "Tranh thêu tay",
    rating: 5,
    reviewCount: 33,
    colors: ["#1c1917", "#b45309"],
    sizes: ["Standard"],
    description: "Quạt giấy truyền thống với họa tiết thêu tay tinh xảo. Mang đến sự thanh mát và nghệ thuật cho không gian sống.",
    details: [
      { label: "Xuất xứ", value: "Trung Quốc" },
      { label: "Chất liệu", value: "Giấy truyền thống, tre tự nhiên" },
      { label: "Kích thước", value: "20 x 35 cm" },
    ],
    badge: "Mới",
    inStock: true,
  },
];

const reviews = [
  { id: 1, name: "Nguyễn Thị Minh", rating: 5, date: "04/05/2025", text: "Sản phẩm rất đẹp, chất lượng da tuyệt vời! Mình rất hài lòng với đơn hàng này.", verified: true },
  { id: 2, name: "Trần Văn Hùng", rating: 5, date: "03/28/2025", text: "Đóng gói cẩn thận, giao hàng nhanh. Túi đúng như hình, sẽ ủng hộ shop thêm!", verified: true },
  { id: 3, name: "Lê Thị Hương", rating: 4, date: "03/15/2025", text: "Chất lượng tốt, thiết kế đẹp. Chỉ tiếc là màu hơi khác so với hình một chút.", verified: true },
];

const relatedProducts = [
  { id: "3", name: "Túi Xách Da Mini", price: 7500000, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400&q=80", rating: 5, reviews: 8 },
  { id: "4", name: "Ví Da Cầm Tay", price: 3200000, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&q=80", rating: 5, reviews: 12 },
  { id: "5", name: "Thắt Lưng Da", price: 2800000, image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80", rating: 4, reviews: 6 },
  { id: "6", name: "Túi Đeo Chéo", price: 5800000, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&q=80", rating: 5, reviews: 15 },
];

// export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
//   const product = products.find(p => p.id === params.id);
//   return {
//     title: product ? `${product.name} - Tranh Thêu Tay Hằng Khoa` : "Sản Phẩm",
//     description: product?.description || "Chi tiết sản phẩm",
//   };
// }

import { useCart } from "@/context/CartContext";

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = products.find(p => p.id === params.id) || products[0];
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>("details");
  const [activeReviewTab, setActiveReviewTab] = useState("reviews");
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      category: product.category
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#57534e] hover:text-[#b45309]">Trang chủ</Link>
            <ChevronRight size={16} className="text-[#57534e]" />
            <Link href="/san-pham" className="text-[#57534e] hover:text-[#b45309]">Sản phẩm</Link>
            <ChevronRight size={16} className="text-[#57534e]" />
            <span className="text-[#1c1917]">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery - Vertical Thumbnails */}
          <div className="flex gap-4">
            {/* Vertical Thumbnails */}
            <div className="flex flex-col gap-3 w-20 shrink-0">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative aspect-square bg-[#f5f5f4] overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? "border-[#b45309]" : "border-transparent hover:border-[#b45309]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} - ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Main Image */}
            <div className="relative flex-1 aspect-[4/5] bg-[#f5f5f4] overflow-hidden">
              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#b45309] text-white text-xs tracking-wider uppercase px-3 py-1.5 z-10">
                  {product.badge}
                </div>
              )}
              <Image
                src={product.gallery[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-[#b45309] mb-2">{product.category}</p>
              <h1 className="text-3xl font-serif text-[#1c1917] mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < product.rating ? "fill-[#b45309] text-[#b45309]" : "text-[#e7e5e4]"}
                    />
                  ))}
                </div>
                <span className="text-sm text-[#57534e]">({product.reviewCount} đánh giá)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-medium text-[#b45309]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-[#57534e] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[#57534e] leading-relaxed">{product.description}</p>

            {/* Color Selection */}
            {product.colors && (
              <div>
                <p className="text-sm font-medium text-[#1c1917] mb-3">Màu sắc</p>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color ? "border-[#b45309] ring-2 ring-[#b45309]/20" : "border-[#e7e5e4]"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <p className="text-sm font-medium text-[#1c1917] mb-3">Kích thước</p>
                <div className="flex gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border text-sm transition-all ${
                        selectedSize === size 
                          ? "border-[#b45309] bg-[#b45309] text-white" 
                          : "border-[#e7e5e4] text-[#57534e] hover:border-[#b45309]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex gap-4">
              <div className="flex items-center border border-[#e7e5e4]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[#f5f5f4]"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-sm">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-[#f5f5f4]"
                >
                  <Plus size={16} />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 font-medium tracking-wide transition-all uppercase text-sm ${
                  isAdded ? "bg-green-600 text-white" : "bg-[#1c1917] text-white hover:bg-[#b45309]"
                }`}
              >
                {isAdded ? "Đã thêm vào giỏ" : "Thêm vào giỏ hàng"}
              </button>
              <button className="p-4 border border-[#e7e5e4] hover:border-[#b45309] hover:text-[#b45309] transition-colors">
                <Heart size={20} />
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="text-green-500" size={16} />
              <span className="text-green-600">Còn hàng - Giao hàng trong 2-3 ngày</span>
            </div>

            {/* Collapsible Sections */}
            <div className="border-t border-[#e7e5e4] pt-6 space-y-4">
              {/* Details */}
              <div>
                <button 
                  onClick={() => toggleSection("details")}
                  className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-wider"
                >
                  <span>Chi tiết sản phẩm</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${openSection === "details" ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {openSection === "details" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <ul className="pb-4 space-y-2 text-sm text-[#57534e]">
                        {product.details.map((detail) => (
                          <li key={detail.label} className="flex gap-2">
                            <span className="text-[#1c1917] font-medium">{detail.label}:</span>
                            <span>{detail.value}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="border-t border-[#e7e5e4]">
                <button 
                  onClick={() => toggleSection("shipping")}
                  className="w-full flex items-center justify-between py-3 text-sm font-medium uppercase tracking-wider"
                >
                  <span>Vận chuyển & Đổi trả</span>
                  <ChevronDown 
                    size={20} 
                    className={`transition-transform ${openSection === "shipping" ? "rotate-180" : ""}`} 
                  />
                </button>
                <AnimatePresence>
                  {openSection === "shipping" && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pb-4 space-y-3 text-sm text-[#57534e]">
                        <p>• Miễn phí vận chuyển cho đơn hàng từ 500K</p>
                        <p>• Giao hàng toàn quốc 2-5 ngày</p>
                        <p>• Đổi trả trong 30 ngày nếu lỗi sản xuất</p>
                        <p>• Hoàn tiền 100% nếu không hài lòng</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-20 border-t border-[#e7e5e4] pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Rating Summary */}
            <div className="lg:col-span-4">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-medium text-[#1c1917]">{product.rating}.0</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < product.rating ? "fill-[#b45309] text-[#b45309]" : "text-[#e7e5e4]"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-[#57534e] mb-6">Dựa trên {product.reviewCount} đánh giá</p>

              {/* Star Breakdown */}
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-3">
                    <div className="flex">
                      {[...Array(stars)].map((_, i) => (
                        <Star key={i} size={12} className="fill-[#b45309] text-[#b45309]" />
                      ))}
                    </div>
                    <div className="flex-1 h-2 bg-[#e7e5e4] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#b45309] rounded-full"
                        style={{ width: stars === 5 ? "80%" : stars === 4 ? "15%" : "5%" }}
                      />
                    </div>
                    <span className="text-xs text-[#57534e] w-6">({stars === 5 ? "12" : stars === 4 ? "2" : "1"})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Reviews List */}
            <div className="lg:col-span-8">
              {/* Tabs */}
              <div className="flex gap-6 border-b border-[#e7e5e4] mb-6">
                <button 
                  onClick={() => setActiveReviewTab("reviews")}
                  className={`pb-3 text-sm font-medium ${activeReviewTab === "reviews" ? "text-[#1c1917] border-b-2 border-[#b45309]" : "text-[#57534e]"}`}
                >
                  Đánh giá ({reviews.length})
                </button>
                <button 
                  onClick={() => setActiveReviewTab("questions")}
                  className={`pb-3 text-sm font-medium ${activeReviewTab === "questions" ? "text-[#1c1917] border-b-2 border-[#b45309]" : "text-[#57534e]"}`}
                >
                  Hỏi đáp (0)
                </button>
              </div>

              {/* Reviews */}
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b border-[#e7e5e4] pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} size={14} className="fill-[#b45309] text-[#b45309]" />
                        ))}
                      </div>
                      <span className="text-xs text-[#57534e]">{review.date}</span>
                    </div>
                    <p className="text-[#1c1917] mb-2">{review.text}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-[#1c1917]">— {review.name}</span>
                      {review.verified && (
                        <span className="text-xs text-green-600 flex items-center gap-1">
                          <CheckCircle2 size={12} /> Đã mua hàng
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="mt-20">
          <h2 className="text-2xl font-serif text-[#1c1917] text-center mb-10">Có thể bạn cũng thích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/san-pham/${item.id}`} className="group">
                <div className="relative aspect-square bg-[#f5f5f4] overflow-hidden mb-3">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex justify-center gap-1 mb-2">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#b45309] text-[#b45309]" />
                  ))}
                  <span className="text-xs text-[#57534e]">{item.reviews} đánh giá</span>
                </div>
                <h3 className="text-sm text-[#1c1917] text-center mb-1">{item.name}</h3>
                <p className="text-sm text-[#b45309] text-center font-medium">{formatPrice(item.price)}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
