"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";

// Danh mục từ tranhtheuhangkhoa.blogspot.com
const navLinks = [
  { 
    href: "/san-pham?category=tranh-theu-hoa", 
    label: "Tranh Thêu Hoa",
    megaMenu: {
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&q=80",
      imageTitle: "Bộ Sưu Tập Hoa",
      columns: [
        { title: "HOA QUÝ", items: ["Hoa sen", "Hoa lan", "Hoa cúc", "Hoa mẫu đơn", "Hoa cẩm chướng", "Hoa mai"] },
        { title: "HOA KHÁC", items: ["Hoa hồng", "Hoa tulip", "Hoa lan nghệ", "Hoa anh đào", "Xem tất cả"] },
        { title: "THEO MÙA", items: ["Xuân", "Hạ", "Thu", "Đông"] },
      ]
    }
  },
  { 
    href: "/san-pham?category=tranh-theu-chim", 
    label: "Tranh Thêu Chim",
    megaMenu: {
      image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400&q=80",
      imageTitle: "Bộ Sưu Tập Chim",
      columns: [
        { title: "CHIM QUÝ", items: ["Chim hạc", "Chim công", "Chim én", "Họa mi", "Chim sơn ca"] },
        { title: "CHIM PHONG THỦY", items: ["Phượng hoàng", "Chim uyên ương", "Chim sẻ", "Xem tất cả"] },
      ]
    }
  },
  { 
    href: "/san-pham?category=phong-thuy", 
    label: "Phong Thủy",
    megaMenu: {
      image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=400&q=80",
      imageTitle: "Tranh Phong Thủy",
      columns: [
        { title: "LINH VẬT", items: ["Rồng", "Hổ", "Kỳ lân", "Tỳ hưu", "Cá chép"] },
        { title: "PHONG CẢNH", items: ["Thuận buồm xuôi gió", "Mã đáo thành công", "Tùng hạc diên niên", "Xem tất cả"] },
      ]
    }
  },
  { 
    href: "/san-pham?category=tranh-theu-ca", 
    label: "Tranh Thêu Cá",
  },
  { 
    href: "/san-pham?category=tranh-bieu-tuong", 
    label: "Biểu Tượng",
  },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/khoa-hoc", label: "Khóa học" },
  { href: "/bai-viet", label: "Blog" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="fixed top-[32px] left-0 right-0 z-40 bg-[#fffbf5] border-b border-[#e7e5e4]">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Row 1: Logo & Icons */}
          <div className="flex items-center justify-between h-[60px] lg:h-[70px]">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#1c1917] hover:text-[#b45309] transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <div className="text-center">
                <div className="text-lg lg:text-2xl font-serif text-[#1c1917] tracking-wide">
                  TRANH THÊU TAY
                </div>
                <div className="text-[10px] lg:text-xs tracking-[0.3em] text-[#57534e] uppercase">
                  Hằng Khoa
                </div>
              </div>
            </Link>

            {/* Right Icons */}
            <div className="flex items-center space-x-1 lg:space-x-4 ml-auto">
              <button 
                className="p-2 text-[#1c1917] hover:text-[#b45309] transition-colors"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <Search size={20} />
              </button>
              <Link
                href="/gio-hang"
                className="p-2 text-[#1c1917] hover:text-[#b45309] transition-colors relative"
              >
                <ShoppingBag size={20} />
              </Link>
            </div>
          </div>

          {/* Row 2: Desktop Navigation Menu (Below Logo) */}
          <nav className="hidden lg:flex items-center justify-center space-x-10 py-3 border-t border-[#e7e5e4]">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative group"
                onMouseEnter={() => link.megaMenu && setActiveMegaMenu(link.label)}
                onMouseLeave={() => setActiveMegaMenu(null)}
              >
                <Link
                  href={link.href}
                  className="flex items-center space-x-1 text-sm font-medium text-[#1c1917] hover:text-[#b45309] transition-colors"
                >
                  <span>{link.label}</span>
                  {link.megaMenu && <ChevronDown size={14} />}
                </Link>
                
                {/* Mega Menu */}
                {link.megaMenu && (
                  <AnimatePresence>
                    {activeMegaMenu === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 bg-white shadow-xl border border-[#e7e5e4] z-50"
                      >
                        <div className="flex">
                          {/* Left Image */}
                          <div className="w-[220px] relative">
                            <Link href={link.href} className="block relative h-full">
                              <div className="relative h-full min-h-[280px]">
                                <img
                                  src={link.megaMenu.image}
                                  alt={link.megaMenu.imageTitle}
                                  className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                  <p className="text-xs font-medium uppercase tracking-wider mb-1">
                                    {link.megaMenu.imageTitle}
                                  </p>
                                  <span className="text-xs underline underline-offset-2 hover:text-[#b45309] transition-colors">
                                    Xem tất cả
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                          {/* Right Columns */}
                          <div className="p-8 grid grid-cols-3 gap-8 min-w-[540px]">
                            {link.megaMenu.columns.map((column: {title: string, items: string[]}) => (
                              <div key={column.title}>
                                <h4 className="text-[#1c1917] text-xs font-semibold tracking-[0.15em] uppercase mb-5">
                                  {column.title}
                                </h4>
                                <ul className="space-y-3">
                                  {column.items.map((item: string) => (
                                    <li key={item}>
                                      <Link 
                                        href={`${link.href}?filter=${encodeURIComponent(item)}`} 
                                        className="text-sm text-[#57534e] hover:text-[#b45309] transition-colors block py-1"
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
                  <div className="relative max-w-2xl mx-auto">
                    <input
                      type="text"
                      placeholder="Tìm kiếm sản phẩm..."
                      className="w-full px-4 py-3 border border-[#e7e5e4] focus:border-[#b45309] focus:outline-none"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-[#b45309]">
                      <Search size={20} />
                    </button>
                  </div>
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
                {navLinks.map((link) => (
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
