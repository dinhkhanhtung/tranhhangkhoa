"use client";

import { BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Doanh thu tháng", value: "45,200,000đ", change: "+12.5%", icon: <DollarSign className="text-green-600" /> },
    { label: "Đơn hàng mới", value: "128", change: "+8.2%", icon: <ShoppingBag className="text-blue-600" /> },
    { label: "Khách hàng mới", value: "64", change: "+15.3%", icon: <Users className="text-purple-600" /> },
    { label: "Tỷ lệ chuyển đổi", value: "3.2%", change: "-2.1%", icon: <TrendingUp className="text-orange-600" /> },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-[#1c1917]">Thống kê & Báo cáo</h1>
        <p className="text-sm text-[#57534e] mt-1">Theo dõi hiệu quả kinh doanh của bạn</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#e7e5e4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#f5f5f4] rounded-xl flex items-center justify-center">
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-[#57534e] mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-[#1c1917]">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm h-[400px] flex items-center justify-center text-[#a8a29e]">
          <div className="text-center">
            <BarChart3 size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">Biểu đồ doanh thu đang được xử lý...</p>
          </div>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-[#e7e5e4] shadow-sm h-[400px] flex items-center justify-center text-[#a8a29e]">
          <div className="text-center">
            <Calendar size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium">Dữ liệu theo thời gian thực đang tải...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
