"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ChevronDown, Heart, User } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWebsite } from "@/context/WebsiteContext";

// Danh mục sản phẩm - sẽ được lọc dựa trên settings trong component
const getNavLinks = (settings: any) => {
  return [
    {
      href: "/san-pham?category=tranh-theu-hoa",
      label: "Tranh Thêu Hoa",
      megaMenu: {
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
        imageTitle: "Bộ Sưu Tập Hoa Sen",
        columns: [
          {
            title: "Hoa Sen",
            items: ["Hoa Sen Trắng", "Hoa Sen Hồng", "Hoa Sen Vàng"]
          },
          {
            title: "Hoa Đào",
            items: ["Hoa Đào Nhí", "Hoa Đào Cánh Đôi", "Hoa Đào Đầy"]
          },
          {
            title: "Hoa Mẫu Đơn",
            items: ["Mẫu Đơn Đỏ", "Mẫu Đơn Trắng", "Mẫu Đơn Hồng"]
          }
        ]
      }
    },
    {
      href: "/san-pham?category=tranh-theu-chim",
      label: "Tranh Thêu Chim",
      megaMenu: {
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
        imageTitle: "Bộ Sưu Tập Chim",
        columns: [
          {
            title: "Chim Hạc",
            items: ["Hạc Đơn", "Hạc Đôi", "Hạc Bay"]
          },
          {
            title: "Chim Sẻ",
            items: ["Sẻ Đôi", "Sẻ Bầy", "Sẻ Lá"]
          },
          {
            title: "Tùng Hạc",
            items: ["Tùng Hạc Vàng", "Tùng Hạc Bạc", "Tùng Hạc Đỏ"]
          }
        ]
      }
    },
    {
      href: "/san-pham?category=tranh-phong-canh",
      label: "Phong Cảnh",
      megaMenu: {
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
        imageTitle: "Bộ Sưu Tập Phong Cảnh",
        columns: [
          {
            title: "Sơn Thủy",
            items: ["Thác Nước", "Dòng Sông", "Hồ Tịnh"]
          },
          {
            title: "Làng Quê",
            items: ["Nhà Làng", "Cánh Đồng", "Cây Cổ Thụ"]
          },
          {
            title: "Phố Cổ",
            items: ["Phố Hội An", "Phố Cổ Hà Nội", "Phố Sài Gòn"]
          }
        ]
      }
    },
    {
      href: "/san-pham?category=tranh-bieu-tuong",
      label: "Biểu Tượng",
      megaMenu: {
        image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
        imageTitle: "Bộ Sưu Tập Biểu Tượng",
        columns: [
          {
            title: "Phật",
            items: ["Phật A Di Đà", "Phật Quan Âm", "Phật Thích Ca"]
          },
          {
            title: "Thần Tài",
            items: ["Thần Tài Đất", "Thần Tài Nước", "Thần Tài Lửa"]
          },
          {
            title: "Long Phụng",
            items: ["Rồng Vàng", "Phượng Hoàng", "Long Phụng"]
          }
        ]
      }
    },
    { href: "/gioi-thieu", label: "Giới thiệu" },
    ...(settings.modules?.courses !== false ? [{ href: "/khoa-hoc", label: "Khóa học" }] : []),
    ...(settings.modules?.resources !== false ? [{ href: "/tai-nguyen", label: "Tài nguyên" }] : []),
    { href: "/lien-he", label: "Liên hệ" },
  ];
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { cartCount } = useCart();
  const { settings } = useWebsite();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/san-pham?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };


  return (
    <>
      <header className="fixed top-[40px] left-0 right-0 z-40 bg-[#fffbf5]/80 backdrop-blur-md border-b border-[#e7e5e4] transition-all duration-300">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Row 1: Logo & Icons */}
          <div className="flex items-center justify-between h-[64px] lg:h-[80px]">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-3 -ml-2 text-[#1c1917] hover:text-[#b45309] transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 hover:opacity-80 transition-opacity">
              <div className="text-center">
                {settings.brand.logo ? (
                  <img src={settings.brand.logo} alt={settings.brand.name} className="h-8 lg:h-10 w-auto object-contain" />
                ) : (
                  <div className="flex flex-col items-center max-w-[140px] sm:max-w-[180px] lg:max-w-none">
                    <div className="text-sm sm:text-lg lg:text-2xl font-bold text-[#1c1917] tracking-wider uppercase leading-tight whitespace-nowrap">
                      {settings.brand.name}
                    </div>
                    <div className="text-[7px] sm:text-[8px] lg:text-xs tracking-[0.1em] sm:tracking-[0.15em] lg:tracking-[0.4em] text-[#57534e] uppercase font-medium mt-0.5 whitespace-nowrap">
                      {settings.brand.slogan}
                    </div>
                  </div>
                )}
              </div>
            </Link>

            {/* Right Icons - Mobile: Search + User (close together, right aligned) */}
            <div className="flex items-center space-x-0 lg:space-x-2 ml-auto">
              <button 
                className="p-2 lg:p-3 text-[#1c1917] hover:text-[#b45309] transition-colors min-w-[40px] min-h-[44px] flex items-center justify-center -mr-1"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              {/* Mobile & Desktop: Account */}
              <Link
                href="/tai-khoan"
                className="p-2 lg:p-3 text-[#1c1917] hover:text-[#b45309] transition-colors relative min-w-[40px] min-h-[44px] flex items-center justify-center"
              >
                <User size={20} />
              </Link>
              {/* Desktop only: Wishlist & Cart */}
              <Link
                href="/yeu-thich"
                className="hidden lg:flex p-3 text-[#1c1917] hover:text-[#b45309] transition-colors relative min-w-[44px] min-h-[44px] items-center justify-center"
              >
                <Heart size={20} />
              </Link>
              <Link
                href="/gio-hang"
                className="hidden lg:flex p-3 text-[#1c1917] hover:text-[#b45309] transition-colors relative min-w-[44px] min-h-[44px] items-center justify-center"
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute top-2 right-2 w-4 h-4 bg-[#b45309] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Row 2: Desktop Navigation Menu (Below Logo) */}
          <nav className="hidden lg:flex items-center justify-center space-x-8 py-3 border-t border-[#e7e5e4]/50">
            {getNavLinks(settings).map((link: any) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.megaMenu && setActiveMegaMenu(link.label)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center space-x-1.5 text-[13px] font-semibold text-[#1c1917] hover:text-[#b45309] transition-colors uppercase tracking-wide press-feedback"
                >
                  <span>{link.label}</span>
                  {link.megaMenu && <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />}
                </Link>
                
                {/* Mega Menu */}
                {link.megaMenu && (
                  <AnimatePresence>
                    {activeMegaMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-2xl border border-[#e7e5e4] z-50 rounded-b-lg overflow-hidden"
                      >
                        <div className="flex">
                          {/* Left Image */}
                          <div className="w-[240px] relative overflow-hidden group/img">
                            <Link href={link.href} className="block relative h-full">
                              <div className="relative h-full min-h-[320px]">
                                <img
                                  src={link.megaMenu.image}
                                  alt={link.megaMenu.imageTitle}
                                  className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                                  <p className="text-xs font-bold uppercase tracking-[0.2em] mb-2 text-white/90">
                                    {link.megaMenu.imageTitle}
                                  </p>
                                  <span className="text-[11px] font-semibold uppercase tracking-widest border-b border-white/40 pb-1 hover:text-[#b45309] hover:border-[#b45309] transition-all">
                                    Khám phá ngay
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                          {/* Right Columns */}
                          <div className="p-10 grid grid-cols-3 gap-12 min-w-[600px] bg-white">
                            {link.megaMenu?.columns?.map((column: {title: string, items: string[]}) => (
                              <div key={column.title}>
                                <h4 className="text-[#1c1917] text-[11px] font-bold tracking-[0.2em] uppercase mb-6 border-l-2 border-[#b45309] pl-3">
                                  {column.title}
                                </h4>
                                <ul className="space-y-4">
                                  {column.items.map((item: string) => (
                                    <li key={item}>
                                      <Link 
                                        href={`${link.href}?filter=${encodeURIComponent(item)}`} 
                                        className="text-[13px] text-[#57534e] hover:text-[#b45309] hover:translate-x-1 transition-all block"
                                      >
                                        {item}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar */}
          <AnimatePresence>
            {isSearchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="border-t border-[#e7e5e4] overflow-hidden"
              >
                <div className="py-4">
                  <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Tìm kiếm sản phẩm..."
                      className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[#b45309] focus:outline-none rounded-lg text-[#1c1917] placeholder:text-[#57534e]"
                      autoFocus
                    />
                    <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b45309]">
                      <Search size={20} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            />
            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-[300px] bg-white z-50 lg:hidden shadow-xl"
            >
              {/* Sidebar Header */}
              <div className="flex items-center justify-between p-4 border-b border-[#e7e5e4]">
                <span className="font-serif text-lg">Menu</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 hover:text-[#b45309] transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              {/* Sidebar Navigation */}
              <nav className="flex flex-col">
                {getNavLinks(settings).map((link: any) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-4 text-sm font-medium text-[#1c1917] hover:bg-[#fffbf5] hover:text-[#b45309] transition-colors border-b border-[#f5f5f4] flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                    <ChevronDown size={16} className="rotate-[-90deg]" />
                  </Link>
                ))}
              </nav>

              {/* Sidebar Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#e7e5e4] bg-[#fffbf5]">
                <p className="text-xs text-[#57534e] mb-2">Liên hệ hỗ trợ</p>
                <p className="text-sm font-medium text-[#1c1917]">0982 581 222</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
