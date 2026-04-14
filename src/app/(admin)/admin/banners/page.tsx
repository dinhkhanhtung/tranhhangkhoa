"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Eye, Calendar, Image as ImageIcon, Layout,
  ToggleRight, ArrowUp, ArrowDown, Edit
} from "lucide-react";

export default function BannersPage() {
  const [selectedPosition, setSelectedPosition] = useState<string>("all");

  const positions = [
    { id: "all", name: "Tất cả" },
    { id: "hero", name: "Hero Banner" },
    { id: "promo", name: "Khuyến mãi" },
    { id: "sidebar", name: "Sidebar" },
    { id: "popup", name: "Popup" },
  ];

  const banners = [
    {
      id: "1",
      title: "Sale Tết 2024",
      subtitle: "Giảm đến 50% tất cả sản phẩm",
      position: "hero",
      status: "active",
      order: 1,
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      clicks: 1250,
      views: 15000
    },
    {
      id: "2",
      title: "Khóa học thêu online",
      subtitle: "Học từ cơ bản đến nâng cao",
      position: "promo",
      status: "active",
      order: 2,
      startDate: "2024-04-01",
      endDate: "2024-12-31",
      clicks: 890,
      views: 8900
    },
    {
      id: "3",
      title: "Bộ sưu tập mới",
      subtitle: "Tranh thêu phong thủy 2024",
      position: "hero",
      status: "scheduled",
      order: 3,
      startDate: "2024-05-01",
      endDate: "2024-06-30",
      clicks: 0,
      views: 0
    },
  ];

  const filteredBanners = selectedPosition === "all" 
    ? banners 
    : banners.filter(b => b.position === selectedPosition);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-green-100 text-green-700",
      inactive: "bg-gray-100 text-gray-700",
      scheduled: "bg-blue-100 text-blue-700"
    };
    const labels: Record<string, string> = {
      active: "Đang chạy",
      inactive: "Tắt",
      scheduled: "Lên lịch"
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-serif text-[#1c1917]">Quản lý Banner</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý banner và quảng cáo</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#92400e] transition-colors">
          <Plus size={16} />
          <span>Thêm banner</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Layout size={16} className="md:w-5 md:h-5 text-[#b45309]" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">12</p>
              <p className="text-xs md:text-sm text-[#57534e]">Tổng banner</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <ToggleRight size={16} className="md:w-5 md:h-5 text-green-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">8</p>
              <p className="text-xs md:text-sm text-[#57534e]">Đang chạy</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Calendar size={16} className="md:w-5 md:h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">3</p>
              <p className="text-xs md:text-sm text-[#57534e]">Lên lịch</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Eye size={16} className="md:w-5 md:h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-lg md:text-2xl font-medium text-[#1c1917]">24K</p>
              <p className="text-xs md:text-sm text-[#57534e]">Lượt xem</p>
            </div>
          </div>
        </div>
      </div>

      {/* Position Filter */}
      <div className="flex flex-wrap gap-2">
        {positions.map((pos) => (
          <button
            key={pos.id}
            onClick={() => setSelectedPosition(pos.id)}
            className={`px-3 py-1.5 rounded-lg text-xs md:text-sm transition-colors ${
              selectedPosition === pos.id 
                ? "bg-[#b45309] text-white" 
                : "bg-white border border-[#e7e5e4] text-[#57534e] hover:border-[#b45309]"
            }`}
          >
            {pos.name}
          </button>
        ))}
      </div>

      {/* Banners List - Card View on Mobile, Table on Desktop */}
      <div className="bg-white rounded-lg border border-[#e7e5e4] overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#e7e5e4] bg-[#fffbf5]">
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Thứ tự</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Banner</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Vị trí</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Thời gian</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Trạng thái</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Hiệu quả</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map((banner) => (
                <tr key={banner.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                  <td className="py-3 px-4">
                    <div className="flex flex-col gap-1">
                      <button className="p-1 hover:bg-[#e7e5e4] rounded">
                        <ArrowUp size={12} />
                      </button>
                      <span className="text-sm font-medium text-center">{banner.order}</span>
                      <button className="p-1 hover:bg-[#e7e5e4] rounded">
                        <ArrowDown size={12} />
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-[#f5f5f4] rounded flex items-center justify-center">
                        <ImageIcon size={20} className="text-[#a8a29e]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1917]">{banner.title}</p>
                        <p className="text-sm text-[#57534e]">{banner.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-[#e7e5e4] rounded text-xs text-[#57534e]">
                      {positions.find(p => p.id === banner.position)?.name}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-[#57534e]">
                    <div>{banner.startDate}</div>
                    <div className="text-xs">→ {banner.endDate}</div>
                  </td>
                  <td className="py-3 px-4">{getStatusBadge(banner.status)}</td>
                  <td className="py-3 px-4 text-sm">
                    <div className="text-[#57534e]">{banner.views.toLocaleString()} views</div>
                    <div className="text-xs text-[#b45309]">{banner.clicks.toLocaleString()} clicks</div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                        <Trash2 size={14} />
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
          {filteredBanners.map((banner) => (
            <div key={banner.id} className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-20 h-14 bg-[#f5f5f4] rounded flex items-center justify-center shrink-0">
                  <ImageIcon size={24} className="text-[#a8a29e]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-[#1c1917]">{banner.title}</p>
                      <p className="text-xs text-[#57534e]">{banner.subtitle}</p>
                    </div>
                    {getStatusBadge(banner.status)}
                  </div>
                  <p className="text-xs text-[#57534e] mt-1">
                    {positions.find(p => p.id === banner.position)?.name} • #{banner.order}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="text-[#57534e]">
                  <Calendar size={12} className="inline mr-1" />
                  {banner.startDate} → {banner.endDate}
                </div>
                <div className="text-right">
                  <span className="text-xs text-[#b45309]">{banner.clicks} clicks</span>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2 border-t border-[#e7e5e4]">
                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
                  <Eye size={14} />
                  Xem
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-[#57534e] hover:bg-[#e7e5e4] rounded transition-colors">
                  <Edit size={14} />
                  Sửa
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 py-2 text-sm text-red-600 hover:bg-red-50 rounded transition-colors">
                  <Trash2 size={14} />
                  Xóa
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
