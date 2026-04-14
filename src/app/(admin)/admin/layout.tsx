"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, ShoppingBag,
  Users, Settings, MessageSquare, LogOut, Menu, X, ChevronRight,
  Bell, Search, Tag, BarChart3, Layout, Reply,
  DollarSign, File, Shield, Globe, Key, Sparkles, ShoppingCart,
  Folder, Megaphone
} from "lucide-react";

const navGroups = [
  {
    label: "Tổng quan",
    items: [
      { href: "/admin", icon: <LayoutDashboard size={18} />, label: "Dashboard" },
      { href: "/admin/analytics", icon: <BarChart3 size={18} />, label: "Thống kê" },
      { href: "/admin/notifications", icon: <Bell size={18} />, label: "Thông báo" },
    ]
  },
  {
    label: "Thương mại",
    items: [
      { href: "/admin/products", icon: <ShoppingBag size={18} />, label: "Sản phẩm" },
      { href: "/admin/orders", icon: <ShoppingCart size={18} />, label: "Đơn hàng" },
      { href: "/admin/categories", icon: <Tag size={18} />, label: "Danh mục" },
      { href: "/admin/product-prices", icon: <DollarSign size={18} />, label: "Quản lý giá" },
    ]
  },
  {
    label: "Nội dung",
    items: [
      { href: "/admin/posts", icon: <FileText size={18} />, label: "Bài viết" },
      { href: "/admin/landingpage", icon: <Layout size={18} />, label: "Landing Page" },
      { href: "/admin/static-pages", icon: <File size={18} />, label: "Trang tĩnh" },
      { href: "/admin/comments", icon: <MessageSquare size={18} />, label: "Bình luận" },
      { href: "/admin/contacts", icon: <MessageSquare size={18} />, label: "Liên hệ" },
    ]
  },
  {
    label: "Media & AI",
    items: [
      { href: "/admin/media", icon: <Folder size={18} />, label: "Thư viện ảnh" },
      { href: "/admin/banners", icon: <Megaphone size={18} />, label: "Banner" },
      { href: "/admin/ai-image-generator", icon: <Sparkles size={18} />, label: "Tạo ảnh AI" },
    ]
  },
  {
    label: "Hệ thống",
    items: [
      { href: "/admin/website-settings", icon: <Globe size={18} />, label: "Cài đặt Web" },
      { href: "/admin/api-settings", icon: <Key size={18} />, label: "Cài đặt API" },
      { href: "/admin/admin-users", icon: <Shield size={18} />, label: "Quản trị viên" },
      { href: "/admin/users", icon: <Users size={18} />, label: "Người dùng" },
      { href: "/admin/adsense", icon: <DollarSign size={18} />, label: "AdSense" },
    ]
  }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false);
  }, [pathname, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#fffbf5] flex font-sans">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 280 : isMobile ? 0 : 80,
          x: isMobile && !isSidebarOpen ? -280 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`fixed lg:static top-0 left-0 h-screen bg-white border-r border-[#e7e5e4] z-50 flex flex-col overflow-hidden shadow-sm`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-[#e7e5e4]/60 bg-[#fffbf5]/50">
          <Link href="/admin" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-10 h-10 bg-[#b45309] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#b45309]/20 group-hover:scale-110 transition-transform duration-300">
              <LayoutDashboard size={22} />
            </div>
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex flex-col"
                >
                  <span className="font-bold text-[#1c1917] text-sm tracking-wider uppercase">HẰNG KHOA</span>
                  <span className="text-[10px] text-[#57534e] font-medium tracking-[0.2em] uppercase">Admin Panel</span>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-hide">
          {navGroups.map((group, gIdx) => (
            <div key={gIdx} className="space-y-2">
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.h4
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="px-3 text-[10px] font-bold text-[#a8a29e] uppercase tracking-[0.2em]"
                  >
                    {group.label}
                  </motion.h4>
                )}
              </AnimatePresence>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 group ${
                        isActive
                          ? "bg-[#b45309] text-white shadow-md shadow-[#b45309]/20"
                          : "text-[#57534e] hover:bg-[#b45309]/5 hover:text-[#b45309]"
                      }`}
                    >
                      <span className={`shrink-0 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                        {item.icon}
                      </span>
                      {isSidebarOpen && (
                        <span className="whitespace-nowrap overflow-hidden">
                          {item.label}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="border-t border-[#e7e5e4]/60 p-4 bg-[#fffbf5]/30">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-3 rounded-xl text-[13px] font-semibold text-[#57534e] hover:bg-red-50 hover:text-red-600 transition-all w-full group ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} className="shrink-0 group-hover:scale-110 transition-transform" />
            <AnimatePresence mode="wait">
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Đăng xuất hệ thống
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#e7e5e4] flex items-center justify-between px-6 lg:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2.5 hover:bg-[#f5f5f4] rounded-xl text-[#1c1917] transition-all active:scale-90"
            >
              {isSidebarOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-3 text-[13px] font-medium text-[#57534e]">
              <Link href="/admin" className="hover:text-[#b45309] transition-colors">Admin</Link>
              {pathname !== "/admin" && pathname !== "/admin/login" && (
                <>
                  <ChevronRight size={14} className="text-[#a8a29e]" />
                  <span className="text-[#1c1917] capitalize font-bold tracking-tight bg-[#b45309]/5 px-3 py-1 rounded-full">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Quick Actions or Status */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-100">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider">Hệ thống ổn định</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
