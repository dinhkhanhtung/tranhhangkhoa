"use client";

import { useState } from "react";
import { 
  Bell, Check, Trash2, Settings, Mail, ShoppingCart,
  MessageSquare, AlertCircle, Info, CheckCircle, MoreVertical
} from "lucide-react";

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread" | "orders" | "comments" | "system">("all");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const notifications = [
    {
      id: "1",
      type: "order",
      title: "Đơn hàng mới",
      message: "Đơn hàng ORD-005 trị giá 3,500,000đ vừa được tạo",
      time: "5 phút trước",
      read: false,
      icon: ShoppingCart,
      iconColor: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      id: "2",
      type: "comment",
      title: "Bình luận mới",
      message: "Nguyễn Văn A vừa bình luận về bài viết 'Tranh thêu hoa sen'",
      time: "15 phút trước",
      read: false,
      icon: MessageSquare,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: "3",
      type: "system",
      title: "Cập nhật hệ thống",
      message: "Phiên bản mới 2.1.0 đã sẵn sàng với nhiều tính năng mới",
      time: "1 giờ trước",
      read: true,
      icon: Info,
      iconColor: "text-purple-600",
      bgColor: "bg-purple-100"
    },
    {
      id: "4",
      type: "order",
      title: "Đơn hàng đã giao",
      message: "Đơn hàng ORD-003 đã được giao thành công",
      time: "2 giờ trước",
      read: true,
      icon: CheckCircle,
      iconColor: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      id: "5",
      type: "system",
      title: "Cảnh báo",
      message: "Sản phẩm 'Tranh thêu hoa sen' sắp hết hàng (còn 2)",
      time: "3 giờ trước",
      read: false,
      icon: AlertCircle,
      iconColor: "text-red-600",
      bgColor: "bg-red-100"
    },
  ];

  const filteredNotifications = filter === "all" 
    ? notifications 
    : filter === "unread" 
      ? notifications.filter(n => !n.read)
      : notifications.filter(n => n.type === filter);

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSelection = (id: string) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Bell size={24} className="text-[#b45309]" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Thông báo</h1>
            <p className="text-sm text-[#57534e] mt-1">Quản lý thông báo và cảnh báo</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors">
            <Check size={16} />
            <span className="hidden sm:inline">Đánh dấu đọc</span>
          </button>
          <button className="flex items-center justify-center gap-2 px-3 py-2 text-sm border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors">
            <Settings size={16} />
            <span className="hidden sm:inline">Cài đặt</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Bell size={16} className="md:w-5 md:h-5 text-[#b45309]" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{notifications.length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Tổng thông báo</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-red-500/10 rounded-lg flex items-center justify-center">
              <Mail size={16} className="md:w-5 md:h-5 text-red-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{unreadCount}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Chưa đọc</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ShoppingCart size={16} className="md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{notifications.filter(n => n.type === "order").length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Đơn hàng</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <MessageSquare size={16} className="md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">{notifications.filter(n => n.type === "comment").length}</p>
              <p className="text-xs md:text-sm text-[#57534e]">Bình luận</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {[
          { id: "all", label: "Tất cả", count: notifications.length },
          { id: "unread", label: "Chưa đọc", count: unreadCount },
          { id: "orders", label: "Đơn hàng", count: notifications.filter(n => n.type === "order").length },
          { id: "comments", label: "Bình luận", count: notifications.filter(n => n.type === "comment").length },
          { id: "system", label: "Hệ thống", count: notifications.filter(n => n.type === "system").length },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as typeof filter)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors ${
              filter === f.id 
                ? "bg-[#b45309] text-white" 
                : "bg-white border border-[#e7e5e4] text-[#57534e] hover:border-[#b45309]"
            }`}
          >
            {f.label}
            <span className={`px-1.5 py-0.5 rounded-full text-xs ${
              filter === f.id ? "bg-white/20" : "bg-[#e7e5e4]"
            }`}>
              {f.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <div className="flex items-center gap-2 p-3 bg-[#fffbf5] rounded-lg border border-[#e7e5e4]">
          <span className="text-sm text-[#57534e]">{selectedItems.length} đã chọn</span>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors ml-auto">
            <Check size={14} />
            Đánh dấu đọc
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
            <Trash2 size={14} />
            Xóa
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        <div className="divide-y divide-[#e7e5e4]">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <div 
                key={notification.id} 
                className={`p-4 hover:bg-[#fffbf5] transition-colors ${!notification.read ? "bg-[#fffbf5]/50" : ""}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox"
                      className="rounded border-[#e7e5e4]"
                      checked={selectedItems.includes(notification.id)}
                      onChange={() => toggleSelection(notification.id)}
                    />
                    <div className={`w-10 h-10 ${notification.bgColor} rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon size={20} className={notification.iconColor} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className={`font-medium ${!notification.read ? "text-[#1c1917]" : "text-[#57534e]"}`}>
                            {notification.title}
                          </p>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                          )}
                        </div>
                        <p className="text-sm text-[#57534e] mt-1">{notification.message}</p>
                        <p className="text-xs text-[#a8a29e] mt-2">{notification.time}</p>
                      </div>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors shrink-0">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {filteredNotifications.length === 0 && (
          <div className="p-12 text-center">
            <Bell size={48} className="mx-auto mb-4 text-[#a8a29e]" />
            <p className="text-[#57534e]">Không có thông báo nào</p>
          </div>
        )}
      </div>
    </div>
  );
}

