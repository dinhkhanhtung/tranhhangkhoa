"use client";

import { useState } from "react";
import { 
  Search, Filter, Download, Eye, Truck,
  Package, Clock, DollarSign, MoreVertical
} from "lucide-react";

export default function OrdersPage() {
  const [filter, setFilter] = useState<"all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled">("all");

  const orders = [
    {
      id: "ORD-001",
      customer: "Nguyễn Văn A",
      email: "nguyenvana@email.com",
      phone: "0987654321",
      total: 2500000,
      status: "pending",
      items: 2,
      date: "2024-04-14",
      payment: "COD"
    },
    {
      id: "ORD-002",
      customer: "Trần Thị B",
      email: "tranthib@email.com",
      phone: "0912345678",
      total: 4800000,
      status: "processing",
      items: 3,
      date: "2024-04-13",
      payment: "Bank Transfer"
    },
    {
      id: "ORD-003",
      customer: "Lê Văn C",
      email: "levanc@email.com",
      phone: "0909123456",
      total: 1200000,
      status: "shipped",
      items: 1,
      date: "2024-04-12",
      payment: "COD"
    },
    {
      id: "ORD-004",
      customer: "Phạm Thị D",
      email: "phamthid@email.com",
      phone: "0934567890",
      total: 6500000,
      status: "delivered",
      items: 4,
      date: "2024-04-10",
      payment: "Bank Transfer"
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700"
    };
    const labels: Record<string, string> = {
      pending: "Chờ xử lý",
      processing: "Đang xử lý",
      shipped: "Đang giao",
      delivered: "Đã giao",
      cancelled: "Đã hủy"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN').format(price) + 'đ';
  };

  const filteredOrders = filter === "all" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Quản lý Đơn hàng</h1>
          <p className="text-sm text-[#57534e] mt-1">Theo dõi và xử lý đơn hàng</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 text-sm border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors">
            <Download size={16} />
            <span className="hidden sm:inline">Xuất</span>
          </button>
        </div>
      </div>

      {/* Stats - Responsive Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Package size={16} className="md:w-5 md:h-5 text-[#b45309]" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">156</p>
              <p className="text-xs md:text-sm text-[#57534e]">Tổng đơn</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={16} className="md:w-5 md:h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">23</p>
              <p className="text-xs md:text-sm text-[#57534e]">Chờ xử lý</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Truck size={16} className="md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">45</p>
              <p className="text-xs md:text-sm text-[#57534e]">Đang giao</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign size={16} className="md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">89M</p>
              <p className="text-xs md:text-sm text-[#57534e]">Doanh thu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs - Horizontal Scroll on Mobile */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] p-2 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as typeof filter)}
              className={`px-3 py-1.5 rounded-lg text-xs md:text-sm whitespace-nowrap transition-colors ${
                filter === status ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              {status === "all" ? "Tất cả" : 
               status === "pending" ? "Chờ xử lý" :
               status === "processing" ? "Đang xử lý" :
               status === "shipped" ? "Đang giao" :
               status === "delivered" ? "Đã giao" : "Đã hủy"}
            </button>
          ))}
        </div>
      </div>

      {/* Search - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
          <input
            type="text"
            placeholder="Tìm đơn hàng..."
            className="w-full pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors text-sm">
          <Filter size={16} />
          <span className="sm:hidden">Lọc</span>
        </button>
      </div>

      {/* Orders List - Card View on Mobile, Table on Desktop */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e5e4] bg-[#fffbf5]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Mã đơn</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Khách hàng</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Tổng tiền</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Trạng thái</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Ngày</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                  <td className="py-3 px-4">
                    <p className="font-medium text-[#1c1917]">{order.id}</p>
                    <p className="text-xs text-[#57534e]">{order.items} sản phẩm</p>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm text-[#1c1917]">{order.customer}</p>
                    <p className="text-xs text-[#57534e]">{order.phone}</p>
                  </td>
                  <td className="py-3 px-4 font-medium text-[#b45309]">{formatPrice(order.total)}</td>
                  <td className="py-3 px-4">{getStatusBadge(order.status)}</td>
                  <td className="py-3 px-4 text-sm text-[#57534e]">{order.date}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden divide-y divide-[#e7e5e4]">
          {filteredOrders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-[#1c1917]">{order.id}</p>
                  <p className="text-xs text-[#57534e]">{order.date}</p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              <div>
                <p className="text-sm text-[#1c1917]">{order.customer}</p>
                <p className="text-xs text-[#57534e]">{order.phone}</p>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-[#b45309]">{formatPrice(order.total)}</p>
                  <p className="text-xs text-[#57534e]">{order.items} sản phẩm • {order.payment}</p>
                </div>
                <div className="flex gap-1">
                  <button className="p-2 hover:bg-[#e7e5e4] rounded transition-colors">
                    <Eye size={16} />
                  </button>
                  <button className="p-2 hover:bg-[#e7e5e4] rounded transition-colors">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
