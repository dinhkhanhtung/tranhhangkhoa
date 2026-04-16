"use client";

import { useState } from "react";
import { 
  Search, Filter, Mail, Phone, Clock, 
  MessageSquare, Trash2, Eye, CheckCircle, AlertCircle
} from "lucide-react";

export default function ContactsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const contacts = [
    {
      id: "CON-001",
      name: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0987654321",
      subject: "Tư vấn tranh thêu hoa sen",
      message: "Tôi muốn đặt thêu một bức tranh hoa sen kích thước 1m2 x 80cm. Vui lòng báo giá giúp tôi.",
      status: "unread",
      time: "2 giờ trước"
    },
    {
      id: "CON-002",
      name: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0912345678",
      subject: "Hỏi về khóa học thêu",
      message: "Khóa học thêu online có hỗ trợ bộ phụ kiện không ạ?",
      status: "read",
      time: "1 ngày trước"
    },
    {
      id: "CON-003",
      name: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0909123456",
      subject: "Hợp tác đại lý",
      message: "Tôi có cửa hàng quà tặng tại Đà Nẵng, muốn hợp tác đại lý.",
      status: "unread",
      time: "3 ngày trước"
    }
  ];

  const filteredContacts = filter === "all" ? contacts : contacts.filter(c => c.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1c1917] tracking-tight">Tin nhắn liên hệ</h1>
          <p className="text-sm text-[#57534e] mt-1 font-medium">Quản lý các yêu cầu và tin nhắn từ khách hàng</p>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex bg-white p-1 rounded-xl border border-[#e7e5e4] shadow-sm">
          {[
            { id: "all", label: "Tất cả" },
            { id: "unread", label: "Chưa đọc" },
            { id: "read", label: "Đã đọc" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                filter === f.id ? "bg-[#b45309] text-white shadow-md shadow-[#b45309]/20" : "text-[#57534e] hover:bg-[#f5f5f4]"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={18} />
          <input type="text" placeholder="Tìm kiếm tin nhắn..." className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#e7e5e4] rounded-xl outline-none focus:ring-2 focus:ring-[#b45309]/20" />
        </div>
      </div>

      {/* Contact List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className={`bg-white p-6 rounded-2xl border transition-all hover:shadow-md ${contact.status === "unread" ? "border-l-4 border-l-[#b45309] border-[#e7e5e4]" : "border-[#e7e5e4]"}`}>
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${contact.status === "unread" ? "bg-[#b45309]/10 text-[#b45309]" : "bg-[#f5f5f4] text-[#57534e]"}`}>
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-[#1c1917] flex items-center gap-2">
                    {contact.name}
                    {contact.status === "unread" && <span className="w-2 h-2 bg-[#b45309] rounded-full animate-pulse" />}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-1">
                    <span className="text-xs font-medium text-[#57534e] flex items-center gap-1"><Mail size={12} /> {contact.email}</span>
                    <span className="text-xs font-medium text-[#57534e] flex items-center gap-1"><Phone size={12} /> {contact.phone}</span>
                    <span className="text-xs font-medium text-[#a8a29e] flex items-center gap-1"><Clock size={12} /> {contact.time}</span>
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#1c1917] italic">"{contact.subject}"</p>
                  <p className="mt-2 text-sm text-[#57534e] leading-relaxed line-clamp-2">{contact.message}</p>
                </div>
              </div>
              <div className="flex md:flex-col gap-2">
                <button className="flex-1 md:w-full px-4 py-2 bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#1c1917] text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Eye size={14} /> Chi tiết
                </button>
                <button className="flex-1 md:w-full px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                  <Trash2 size={14} /> Xóa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

