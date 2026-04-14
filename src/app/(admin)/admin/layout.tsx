"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, FileText, ShoppingBag, Image as ImageIcon,
  Users, Settings, MessageSquare, LogOut, Menu, X, ChevronRight,
  Bell, Search, Layers, Tag, BarChart3, PenTool, Layout, Reply,
  DollarSign, File, Shield, Globe, Key, Sparkles, ShoppingCart,
  Folder, Megaphone, Package
} from "lucide-react";

const navItems = [
  { href: "/admin", icon: <LayoutDashboard size={20} />, label: "Dashboard" },
  { href: "/admin/notifications", icon: <Bell size={20} />, label: "Thông báo" },
  { href: "/admin/posts", icon: <FileText size={20} />, label: "Bài viết" },
  { href: "/admin/products", icon: <ShoppingBag size={20} />, label: "Sản phẩm" },
  { href: "/admin/orders", icon: <ShoppingCart size={20} />, label: "Đơn hàng" },
  { href: "/admin/categories", icon: <Tag size={20} />, label: "Danh mục" },
  { href: "/admin/landingpage", icon: <Layout size={20} />, label: "Landing Page" },
  { href: "/admin/comments", icon: <MessageSquare size={20} />, label: "Comment" },
  { href: "/admin/facebook-comments", icon: <Reply size={20} />, label: "Facebook Comment" },
  { href: "/admin/media", icon: <Folder size={20} />, label: "Thư viện ảnh" },
  { href: "/admin/banners", icon: <Megaphone size={20} />, label: "Banner" },
  { href: "/admin/adsense", icon: <DollarSign size={20} />, label: "AdSense" },
  { href: "/admin/static-pages", icon: <File size={20} />, label: "Trang tĩnh" },
  { href: "/admin/admin-users", icon: <Shield size={20} />, label: "Quản trị viên" },
  { href: "/admin/website-settings", icon: <Globe size={20} />, label: "Cài đặt web" },
  { href: "/admin/api-settings", icon: <Key size={20} />, label: "Cài đặt API" },
  { href: "/admin/product-prices", icon: <DollarSign size={20} />, label: "Quản lý giá" },
  { href: "/admin/ai-image-generator", icon: <Sparkles size={20} />, label: "Tạo ảnh AI" },
  { href: "/admin/contacts", icon: <MessageSquare size={20} />, label: "Liên hệ" },
  { href: "/admin/analytics", icon: <BarChart3 size={20} />, label: "Thống kê" },
  { href: "/admin/users", icon: <Users size={20} />, label: "Người dùng" },
  { href: "/admin/settings", icon: <Settings size={20} />, label: "Cài đặt khác" },
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
    <div className="min-h-screen bg-[#f5f5f4] flex">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isSidebarOpen ? 260 : isMobile ? 0 : 80,
          x: isMobile && !isSidebarOpen ? -260 : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed lg:static top-0 left-0 h-screen bg-white border-r border-[#e7e5e4] z-50 flex flex-col overflow-hidden`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-[#e7e5e4]">
          <Link href="/admin" className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 bg-[#b45309] rounded flex items-center justify-center text-white font-serif font-bold shrink-0">
              T
            </div>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="font-serif text-[#1c1917] whitespace-nowrap"
                >
                  Admin Panel
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#b45309] text-white"
                    : "text-[#57534e] hover:bg-[#f5f5f4] hover:text-[#1c1917]"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <AnimatePresence>
                  {isSidebarOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="border-t border-[#e7e5e4] p-3">
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#57534e] hover:bg-[#f5f5f4] hover:text-red-600 transition-all w-full ${
              !isSidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} className="shrink-0" />
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="whitespace-nowrap overflow-hidden"
                >
                  Đăng xuất
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#e7e5e4] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden md:flex items-center gap-2 text-sm text-[#57534e]">
              <Link href="/admin" className="hover:text-[#b45309]">Admin</Link>
              {pathname !== "/admin" && pathname !== "/admin/login" && (
                <>
                  <ChevronRight size={14} />
                  <span className="text-[#1c1917] capitalize">
                    {pathname.split("/").pop()?.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:flex items-center bg-[#f5f5f4] rounded-lg px-3 py-2">
              <Search size={16} className="text-[#57534e]" />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-48 placeholder:text-[#a8a29e]"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 hover:bg-[#f5f5f4] rounded-lg transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* User */}
            <div className="flex items-center gap-2 pl-3 border-l border-[#e7e5e4]">
              <div className="w-8 h-8 bg-[#b45309] rounded-full flex items-center justify-center text-white text-sm font-medium">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
