"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FileText, ShoppingBag, MessageSquare, TrendingUp,
  Eye, ArrowUp, ArrowDown, Clock3,
  CheckCircle2, XCircle, Plus, RefreshCcw, Settings as SettingsIcon
} from "lucide-react";

const stats = [
  { title: "Tổng bài viết", value: "156", change: "+12%", trend: "up", icon: <FileText size={20} />, color: "bg-blue-500", link: "/admin/posts" },
  { title: "Sản phẩm", value: "89", change: "+5%", trend: "up", icon: <ShoppingBag size={20} />, color: "bg-green-500", link: "/admin/products" },
  { title: "Đơn hàng mới", value: "23", change: "-2%", trend: "down", icon: <Clock3 size={20} />, color: "bg-[#b45309]", link: "/admin/orders" },
  { title: "Liên hệ chưa đọc", value: "8", change: "+3", trend: "up", icon: <MessageSquare size={20} />, color: "bg-purple-500", link: "/admin/contacts" },
];

const recentPosts = [
  { id: "1", title: "Tranh thêu hoa sen - Ý nghĩa và cách chọn", category: "Hoa sen", status: "published", views: 1250, createdAt: "2 giờ trước" },
  { id: "2", title: "Kỹ thuật thêu tay cơ bản cho người mới", category: "Hướng dẫn", status: "published", views: 890, createdAt: "5 giờ trước" },
  { id: "3", title: "Bộ sưu tập tranh phong thủy 2024", category: "Phong thủy", status: "draft", views: 0, createdAt: "1 ngày trước" },
];

const recentContacts = [
  { id: "1", name: "Nguyễn Văn A", subject: "Tư vấn tranh hoa sen", status: "new", time: "10 phút trước" },
  { id: "2", name: "Trần Thị B", subject: "Đặt hàng tranh thêu", status: "replied", time: "2 giờ trước" },
  { id: "3", name: "Lê Văn C", subject: "Hỏi về giá", status: "new", time: "5 giờ trước" },
];

const activityLog = [
  { action: "Tạo bài viết mới", target: "Tranh thêu hoa sen", user: "Admin", time: "2 giờ trước" },
  { action: "Cập nhật sản phẩm", target: "Túi xách da thật", user: "Admin", time: "5 giờ trước" },
  { action: "Trả lời liên hệ", target: "Nguyễn Văn A", user: "Admin", time: "1 ngày trước" },
  { action: "Xuất bản bài viết", target: "Kỹ thuật thêu cơ bản", user: "Admin", time: "2 ngày trước" },
];

export default function AdminDashboardPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published": case "replied":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700"><CheckCircle2 size={10} /> Đã đăng</span>;
      case "draft":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700"><Clock3 size={10} /> Bản nháp</span>;
      case "new":
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">Mới</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"><XCircle size={10} /> {status}</span>;
    }
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-sm text-[#57534e] mt-1 font-medium">Chào mừng trở lại! Dưới đây là những gì đang diễn ra.</p>
        </div>
        <Link href="/admin/posts/new" className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-[#b45309] rounded-xl hover:bg-[#1c1917] shadow-lg shadow-[#b45309]/20 transition-all active:scale-95">
          <Plus size={18} /> Soạn bài viết mới
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: idx * 0.1 }}
          >
            <Link href={stat.link} className="block group">
              <div className="bg-white p-6 rounded-2xl border border-[#e7e5e4] group-hover:border-[#b45309] group-hover:shadow-xl group-hover:shadow-[#b45309]/5 transition-all duration-300">
                <div className="flex items-start justify-between">
                  <div className="space-y-3">
                    <p className="text-xs font-bold text-[#57534e] uppercase tracking-widest">{stat.title}</p>
                    <p className="text-3xl font-bold text-[#1c1917] tracking-tighter">{stat.value}</p>
                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[11px] font-bold ${stat.trend === "up" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {stat.trend === "up" ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      <span>{stat.change}</span>
                      <span className="text-[#a8a29e] font-medium ml-1">so với tháng trước</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e7e5e4]/60 bg-[#fffbf5]/30 flex items-center justify-between">
              <h3 className="font-bold text-[#1c1917] tracking-tight">Bài viết mới nhất</h3>
              <Link href="/admin/posts" className="text-xs font-bold text-[#b45309] hover:underline uppercase tracking-wider">Xem tất cả</Link>
            </div>
            <div className="divide-y divide-[#e7e5e4]/60">
              {recentPosts.map((post) => (
                <div key={post.id} className="p-5 flex items-center justify-between hover:bg-[#fffbf5]/50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-[#f5f5f4] flex items-center justify-center text-[#57534e] group-hover:bg-[#b45309]/10 group-hover:text-[#b45309] transition-colors">
                      <FileText size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1c1917] text-sm group-hover:text-[#b45309] transition-colors">{post.title}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[11px] font-bold text-[#b45309] uppercase tracking-wider">{post.category}</span>
                        <span className="text-[11px] font-medium text-[#a8a29e]">Đăng {post.createdAt}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {getStatusBadge(post.status)}
                    <span className="text-[11px] font-bold text-[#57534e] flex items-center gap-1.5 bg-[#f5f5f4] px-2 py-1 rounded-md">
                      <Eye size={12} /> {post.views.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e7e5e4]/60 bg-[#fffbf5]/30 flex items-center justify-between">
              <h3 className="font-bold text-[#1c1917] tracking-tight">Nhật ký hoạt động</h3>
              <RefreshCcw size={14} className="text-[#a8a29e] cursor-pointer hover:text-[#b45309] transition-colors" />
            </div>
            <div className="p-6 space-y-6">
              {activityLog.map((log, idx) => (
                <div key={idx} className="flex items-start gap-4 relative group">
                  {idx !== activityLog.length - 1 && (
                    <div className="absolute left-2.5 top-8 bottom-0 w-px bg-[#e7e5e4]" />
                  )}
                  <div className="w-5 h-5 bg-[#b45309] rounded-full mt-1 border-4 border-white shadow-sm shrink-0 z-10" />
                  <div className="flex-1 pb-2">
                    <p className="text-sm text-[#1c1917]">
                      <span className="font-bold">{log.action}</span>
                      <span className="text-[#57534e] mx-1.5">:</span>
                      <span className="text-[#57534e] font-medium italic">"{log.target}"</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-bold text-[#b45309] uppercase tracking-widest">{log.user}</span>
                      <span className="text-[10px] text-[#a8a29e] font-medium">• {log.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl border border-[#e7e5e4] overflow-hidden shadow-sm">
            <div className="p-5 border-b border-[#e7e5e4]/60 bg-[#fffbf5]/30 flex items-center justify-between">
              <h3 className="font-bold text-[#1c1917] tracking-tight">Liên hệ mới</h3>
              <div className="w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">
                3
              </div>
            </div>
            <div className="divide-y divide-[#e7e5e4]/60">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="p-5 hover:bg-[#fffbf5]/50 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-bold text-[#1c1917] text-sm group-hover:text-[#b45309] transition-colors">{contact.name}</p>
                    {getStatusBadge(contact.status)}
                  </div>
                  <p className="text-xs text-[#57534e] leading-relaxed line-clamp-1 font-medium italic">"{contact.subject}"</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Clock3 size={12} className="text-[#a8a29e]" />
                    <p className="text-[10px] text-[#a8a29e] font-bold uppercase tracking-wider">{contact.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/admin/contacts" className="block p-4 text-center text-xs font-bold text-[#b45309] bg-[#fffbf5]/50 hover:bg-[#fffbf5] transition-colors border-t border-[#e7e5e4]/60 uppercase tracking-widest">
              Xem tất cả tin nhắn
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-[#e7e5e4] p-6 shadow-sm space-y-5">
            <h3 className="font-bold text-[#1c1917] tracking-tight">Thao tác nhanh</h3>
            <div className="grid grid-cols-1 gap-3">
              <Link href="/admin/posts/new" className="flex items-center gap-4 p-3.5 rounded-xl bg-blue-50/50 hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-100">
                <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><FileText size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-[#1c1917]">Thêm bài viết</p>
                  <p className="text-[10px] text-[#57534e] font-medium">Viết tin tức, hướng dẫn mới</p>
                </div>
              </Link>
              <Link href="/admin/products/new" className="flex items-center gap-4 p-3.5 rounded-xl bg-green-50/50 hover:bg-green-50 transition-all group border border-transparent hover:border-green-100">
                <div className="w-10 h-10 bg-green-100 text-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><ShoppingBag size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-[#1c1917]">Thêm sản phẩm</p>
                  <p className="text-[10px] text-[#57534e] font-medium">Cập nhật kho tranh thêu</p>
                </div>
              </Link>
              <Link href="/admin/banners" className="flex items-center gap-4 p-3.5 rounded-xl bg-[#b45309]/5 hover:bg-[#b45309]/10 transition-all group border border-transparent hover:border-[#b45309]/10">
                <div className="w-10 h-10 bg-[#b45309]/10 text-[#b45309] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><TrendingUp size={20} /></div>
                <div>
                  <p className="text-sm font-bold text-[#1c1917]">Cài đặt Banner</p>
                  <p className="text-[10px] text-[#57534e] font-medium">Thay đổi hình ảnh trang chủ</p>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-[#1c1917] rounded-2xl p-6 shadow-xl text-white space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold tracking-tight text-white/90">Trạng thái hệ thống</h3>
              <SettingsIcon size={16} className="text-white/40 animate-spin-slow" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-xs font-medium text-white/70">Firestore Database</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-green-400">Ổn định</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  <span className="text-xs font-medium text-white/70">ImgBB API</span>
                </div>
                <span className="text-[10px] font-bold uppercase text-green-400">Ổn định</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Sao lưu cuối</span>
                <span className="text-[10px] font-bold text-white/80">2 giờ trước</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
