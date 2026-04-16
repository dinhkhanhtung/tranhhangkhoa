"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Phone } from "lucide-react";
import { useMemo } from "react";
import { IndustryType, getIndustryTheme, IndustryTheme } from "@/lib/industry-themes";
import { WebsiteSettings } from "@/context/WebsiteContext";
import { IndustryHero } from "@/components/industry-layouts/HeroLayouts";
import { IndustryProductGrid } from "@/components/industry-layouts/ProductGridLayouts";

// Demo data cho từng ngành
const demoData: Record<IndustryType, { brandName: string; slogan: string; products: any[] }> = {
  "tranh-theu": {
    brandName: "Tranh Thêu Tâm Linh",
    slogan: "Tinh hoa thêu thùa - Di sản bản địa",
    products: [
      { id: 1, name: "Tranh thêu hoa sen", price: 2800000, image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400" },
      { id: 2, name: "Tranh thêu chim hạc", price: 3500000, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
    ]
  },
  "do-go": {
    brandName: "Đồ Gỗ Hoàng Gia",
    slogan: "Bền vững theo thời gian - Tinh xảo từng chi tiết",
    products: [
      { id: 1, name: "Bàn ăn gỗ sồi", price: 8500000, image: "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=400" },
      { id: 2, name: "Tủ quần áo gỗ óc chó", price: 12000000, image: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?w=400" },
    ]
  },
  "thoi-trang": {
    brandName: "Fashionista",
    slogan: "Phong cách của bạn - Xu hướng mới nhất",
    products: [
      { id: 1, name: "Váy maxi hoa", price: 850000, image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400" },
      { id: 2, name: "Áo blazer nữ", price: 1200000, image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400" },
    ]
  },
  "my-pham": {
    brandName: "Beauty Glow",
    slogan: "Vẻ đẹp tự nhiên - Chăm sóc từ thiên nhiên",
    products: [
      { id: 1, name: "Serum vitamin C", price: 450000, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400" },
      { id: 2, name: "Kem dưỡng da", price: 680000, image: "https://images.unsplash.com/photo-1570194065650-d99fb4a8ccb0?w=400" },
    ]
  },
  "do-gia-dung": {
    brandName: "Gia Dụng Plus",
    slogan: "Tiện nghi cho ngôi nhà của bạn",
    products: [
      { id: 1, name: "Nồi chiên không dầu", price: 1200000, image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400" },
      { id: 2, name: "Máy xay sinh tố", price: 850000, image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400" },
    ]
  },
  "do-dien-tu": {
    brandName: "Tech Store",
    slogan: "Công nghệ hiện đại - Giá tốt nhất",
    products: [
      { id: 1, name: "Tai nghe Bluetooth", price: 850000, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
      { id: 2, name: "Loa thông minh", price: 1200000, image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400" },
    ]
  },
  "am-thuc": {
    brandName: "Đặc Sản Quê Hương",
    slogan: "Hương vị truyền thống - Tươi ngon mỗi ngày",
    products: [
      { id: 1, name: "Mắm tôm Thanh Hóa", price: 120000, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=400" },
      { id: 2, name: "Nước mắm Phú Quốc", price: 85000, image: "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?w=400" },
    ]
  },
  "do-uong": {
    brandName: "Coffee House",
    slogan: "Hương vị cafe đích thực",
    products: [
      { id: 1, name: "Cà phê Arabica", price: 180000, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400" },
      { id: 2, name: "Trà ô long Đài Loan", price: 220000, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
    ]
  },
  "suc-khoe": {
    brandName: "Wellness Shop",
    slogan: "Sức khỏe là vàng - Chăm sóc từ thiên nhiên",
    products: [
      { id: 1, name: "Nhân sâm Hàn Quốc", price: 2500000, image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
      { id: 2, name: "Đông trùng hạ thảo", price: 1800000, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400" },
    ]
  },
  "y-te": {
    brandName: "MediCare Plus",
    slogan: "Chăm sóc sức khỏe tại nhà",
    products: [
      { id: 1, name: "Máy đo huyết áp", price: 850000, image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400" },
      { id: 2, name: "Máy đo đường huyết", price: 1200000, image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=400" },
    ]
  },
  "giao-duc": {
    brandName: "EduPro Academy",
    slogan: "Tri thức mở ra tương lai",
    products: [
      { id: 1, name: "Khóa học Web Development", price: 2500000, image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400" },
      { id: 2, name: "Khóa học Marketing", price: 1800000, image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400" },
    ]
  },
  "sach-vpp": {
    brandName: "Bookworm Store",
    slogan: "Sách hay mỗi ngày - Tri thức mỗi giờ",
    products: [
      { id: 1, name: "Sách Đắc nhân tâm", price: 85000, image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400" },
      { id: 2, name: "Bộ bút cao cấp", price: 120000, image: "https://images.unsplash.com/photo-1585336261022-680e295ce3fe?w=400" },
    ]
  },
  "du-lich": {
    brandName: "Travel Buddy",
    slogan: "Khám phá thế giới - Trải nghiệm cuộc sống",
    products: [
      { id: 1, name: "Tour Hạ Long 3N2Đ", price: 3500000, image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400" },
      { id: 2, name: "Tour Sapa 2N1Đ", price: 2800000, image: "https://images.unsplash.com/photo-1528181304800-259b08848561?w=400" },
    ]
  },
  "the-thao": {
    brandName: "Sporty Life",
    slogan: "Khỏe mạnh mỗi ngày - Thể thao mọi lúc",
    products: [
      { id: 1, name: "Thảm yoga", price: 450000, image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400" },
      { id: 2, name: "Tạ tay 5kg", price: 280000, image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400" },
    ]
  },
  "nong-san": {
    brandName: "Nông Sản Sạch",
    slogan: "Từ nông trại đến bàn ăn - Tươi ngon mỗi ngày",
    products: [
      { id: 1, name: "Rau organic gói", price: 85000, image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400" },
      { id: 2, name: "Trái cây nhập khẩu", price: 120000, image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400" },
    ]
  },
  "cay-canh": {
    brandName: "Green Life",
    slogan: "Xanh mát không gian sống",
    products: [
      { id: 1, name: "Sen đá mix", price: 150000, image: "https://images.unsplash.com/photo-1459411552884-841db9b9966c?w=400" },
      { id: 2, name: "Cây lưỡi hổ", price: 280000, image: "https://images.unsplash.com/photo-1599598425947-d35110b4a1a1?w=400" },
    ]
  },
  "gom-su": {
    brandName: "Gốm Bát Tràng",
    slogan: "Tinh hoa gốm Việt - Bền vững theo năm tháng",
    products: [
      { id: 1, name: "Bát đĩa gốm sứ", price: 85000, image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400" },
      { id: 2, name: "Lọ hoa trang trí", price: 280000, image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400" },
    ]
  },
  "trang-suc": {
    brandName: "Jewelry Craft",
    slogan: "Tinh xảo từng chi tiết - Độc bản cho bạn",
    products: [
      { id: 1, name: "Vòng tay bạc", price: 450000, image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400" },
      { id: 2, name: "Dây chuyền handmade", price: 680000, image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400" },
    ]
  },
  "giay-dep": {
    brandName: "Shoe Style",
    slogan: "Bước đi tự tin - Phong cách riêng",
    products: [
      { id: 1, name: "Giày thể thao", price: 850000, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
      { id: 2, name: "Giày cao gót", price: 1200000, image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400" },
    ]
  },
  "noi-that": {
    brandName: "Home Decor",
    slogan: "Không gian sống đẳng cấp",
    products: [
      { id: 1, name: "Sofa bọc da", price: 15000000, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400" },
      { id: 2, name: "Đèn trang trí", price: 2800000, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400" },
    ]
  },
  "den-trang-tri": {
    brandName: "Light & Art",
    slogan: "Ánh sáng nghệ thuật - Không gian lung linh",
    products: [
      { id: 1, name: "Đèn thả trang trí", price: 1800000, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400" },
      { id: 2, name: "Đèn bàn vintage", price: 1200000, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400" },
    ]
  },
  "phu-kien-cong-nghe": {
    brandName: "Tech Accessory",
    slogan: "Phụ kiện công nghệ - Tiện ích mỗi ngày",
    products: [
      { id: 1, name: "Ốp lưng iPhone", price: 280000, image: "https://images.unsplash.com/photo-1603313011101-320f26a4f6f6?w=400" },
      { id: 2, name: "Cáp sạc nhanh", price: 150000, image: "https://images.unsplash.com/photo-1601703554136-4dcde47d0d82?w=400" },
    ]
  },
  "custom": {
    brandName: "Tùy Chỉnh Shop",
    slogan: "Thiết kế theo phong cách của bạn",
    products: [
      { id: 1, name: "Sản phẩm mẫu A", price: 500000, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
      { id: 2, name: "Sản phẩm mẫu B", price: 750000, image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400" },
    ]
  }
};

export default function DemoContent() {
  const searchParams = useSearchParams();
  const industry = (searchParams.get("industry") as IndustryType) || "tranh-theu";
  
  // Validate industry
  const validIndustry = Object.keys(demoData).includes(industry) ? industry : "tranh-theu";
  
  // Get theme
  const theme = useMemo(() => getIndustryTheme(validIndustry), [validIndustry]);
  const data = demoData[validIndustry];

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Demo Banner */}
      <div 
        className="sticky top-0 z-50 text-white px-4 py-3 text-center"
        style={{ backgroundColor: theme.colors.primary }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">🎯 ĐÂY LÀ DEMO</span>
            <span className="hidden sm:inline">- Xem giao diện cho ngành: <strong>{theme.name}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <a 
              href={`tel:0982581222`}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              <Phone size={16} />
              <span className="hidden sm:inline">0982.581.222</span>
            </a>
            <Link 
              href="/demo"
              className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Xem tất cả</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-2xl font-bold"
                style={{ 
                  fontFamily: theme.typography.headingFont,
                  color: theme.colors.text.primary 
                }}
              >
                {data.brandName}
              </h1>
              <p 
                className="text-sm mt-1"
                style={{ color: theme.colors.text.secondary }}
              >
                {data.slogan}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="p-2 rounded-lg transition-colors"
                style={{ 
                  backgroundColor: theme.colors.background,
                  color: theme.colors.text.primary 
                }}
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dynamic Hero - Thay đổi theo ngành */}
      <IndustryHero 
        industry={validIndustry}
        brandName={data.brandName}
        slogan={data.slogan}
        theme={theme}
        onCtaClick={() => window.scrollTo({ top: 600, behavior: 'smooth' })}
      />

      {/* Dynamic Product Grid - Thay đổi theo ngành */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <h3 
          className="text-xl font-bold mb-6 text-center"
          style={{ color: theme.colors.text.primary }}
        >
          Sản phẩm mẫu - {theme.name}
        </h3>
        <IndustryProductGrid 
          industry={validIndustry}
          products={data.products}
          theme={theme}
          formatPrice={formatPrice}
        />
      </section>

      {/* CTA */}
      <section 
        className="py-12 mt-12"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ color: theme.colors.text.primary }}
          >
            Muốn có website như thế này?
          </h3>
          <p 
            className="mb-6 max-w-xl mx-auto"
            style={{ color: theme.colors.text.secondary }}
          >
            Liên hệ ngay để được tư vấn và setup website cho ngành {theme.name.toLowerCase()} của bạn
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a 
              href="tel:0982581222"
              className="px-6 py-3 rounded-lg text-white font-bold transition-opacity hover:opacity-90"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Gọi ngay: 0982.581.222
            </a>
            <Link 
              href="/demo"
              className="px-6 py-3 rounded-lg font-bold border-2 transition-colors"
              style={{ 
                borderColor: theme.colors.primary,
                color: theme.colors.primary 
              }}
            >
              Xem thêm ngành khác
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p>© 2024 {data.brandName} - Demo Website</p>
          <p className="mt-1">Powered by Industry Theme System</p>
        </div>
      </footer>
    </div>
  );
}
