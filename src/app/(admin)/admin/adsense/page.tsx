"use client";

import { useState } from "react";
import { 
  Plus, Edit, Trash2, Eye, DollarSign, TrendingUp, 
  BarChart3, Activity, Calendar, Code
} from "lucide-react";

export default function AdsensePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "ad-units" | "reports" | "settings">("overview");

  const adUnits = [
    {
      id: "1",
      name: "Banner Header",
      type: "Display",
      size: "728x90",
      status: "active",
      earnings: 125.50,
      impressions: 45600,
      ctr: 2.3,
      cpm: 2.75
    },
    {
      id: "2",
      name: "Sidebar Rectangle",
      type: "Display",
      size: "300x250",
      status: "active",
      earnings: 89.20,
      impressions: 32100,
      ctr: 1.8,
      cpm: 2.78
    },
    {
      id: "3",
      name: "In-Article Native",
      type: "Native",
      size: "Fluid",
      status: "active",
      earnings: 156.80,
      impressions: 52300,
      ctr: 3.1,
      cpm: 3.00
    },
    {
      id: "4",
      name: "Mobile Footer",
      type: "Display",
      size: "320x50",
      status: "paused",
      earnings: 45.30,
      impressions: 18900,
      ctr: 1.5,
      cpm: 2.40
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Google AdSense</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý quảng cáo và theo dõi thu nhập</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Plus size={16} /> Thêm ad unit
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <DollarSign size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">$416.80</p>
              <p className="text-sm text-[#57534e]">Tổng thu nhập tháng này</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">148.9K</p>
              <p className="text-sm text-[#57534e]">Tổng lượt hiển thị</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <TrendingUp size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">2.18%</p>
              <p className="text-sm text-[#57534e]">CTR trung bình</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <BarChart3 size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">$2.80</p>
              <p className="text-sm text-[#57534e]">CPM trung bình</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-[#e7e5e4]">
        <div className="border-b border-[#e7e5e4]">
          <nav className="flex gap-1 p-1">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "overview" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Tổng quan
            </button>
            <button
              onClick={() => setActiveTab("ad-units")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "ad-units" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Ad Units
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "reports" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Báo cáo
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === "settings" ? "bg-[#b45309] text-white" : "text-[#57534e] hover:bg-[#e7e5e4]"
              }`}
            >
              Cài đặt
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Revenue Chart Placeholder */}
              <div className="bg-[#fffbf5] rounded-lg p-6 border border-[#e7e5e4]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-[#1c1917]">Thu nhập 30 ngày qua</h3>
                  <select className="px-3 py-1.5 border border-[#e7e5e4] rounded-lg text-sm focus:border-[#b45309] focus:outline-none">
                    <option>30 ngày</option>
                    <option>7 ngày</option>
                    <option>90 ngày</option>
                  </select>
                </div>
                <div className="h-64 flex items-center justify-center border-2 border-dashed border-[#e7e5e4] rounded-lg">
                  <div className="text-center">
                    <Activity size={48} className="mx-auto mb-2 text-[#a8a29e]" />
                    <p className="text-sm text-[#57534e]">Biểu đồ thu nhập</p>
                  </div>
                </div>
              </div>

              {/* Top Performing Ad Units */}
              <div>
                <h3 className="font-semibold text-[#1c1917] mb-4">Ad Unit hiệu quả nhất</h3>
                <div className="space-y-3">
                  {adUnits.slice(0, 3).map((unit) => (
                    <div key={unit.id} className="flex items-center justify-between p-4 bg-[#fffbf5] rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-10 bg-[#e7e5e4] rounded flex items-center justify-center text-xs text-[#57534e]">
                          {unit.size}
                        </div>
                        <div>
                          <p className="font-medium text-[#1c1917]">{unit.name}</p>
                          <p className="text-sm text-[#57534e]">{unit.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-[#1c1917]">${unit.earnings.toFixed(2)}</p>
                        <p className="text-sm text-[#57534e]">CTR: {unit.ctr}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "ad-units" && (
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#e7e5e4]">
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Tên</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Loại</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Kích thước</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Trạng thái</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">Thu nhập</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-[#57534e]">CTR</th>
                      <th className="text-right py-3 px-4 text-sm font-medium text-[#57534e]">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adUnits.map((unit) => (
                      <tr key={unit.id} className="border-b border-[#e7e5e4] hover:bg-[#fffbf5]">
                        <td className="py-3 px-4">
                          <p className="font-medium text-[#1c1917]">{unit.name}</p>
                        </td>
                        <td className="py-3 px-4 text-sm text-[#57534e]">{unit.type}</td>
                        <td className="py-3 px-4 text-sm text-[#57534e]">{unit.size}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            unit.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {unit.status === 'active' ? 'Hoạt động' : 'Tạm dừng'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-sm font-medium text-[#1c1917]">${unit.earnings.toFixed(2)}</td>
                        <td className="py-3 px-4 text-sm text-[#57534e]">{unit.ctr}%</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                              <Eye size={14} />
                            </button>
                            <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                              <Edit size={14} />
                            </button>
                            <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                              <Code size={14} />
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
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#fffbf5] rounded-lg p-6 border border-[#e7e5e4]">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar size={20} className="text-[#b45309]" />
                    <h3 className="font-semibold text-[#1c1917]">Chọn khoảng thời gian</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[#57534e] mb-2">Từ ngày</label>
                      <input type="date" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#57534e] mb-2">Đến ngày</label>
                      <input type="date" className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none" />
                    </div>
                    <button className="w-full px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors">
                      Xem báo cáo
                    </button>
                  </div>
                </div>
                <div className="bg-[#fffbf5] rounded-lg p-6 border border-[#e7e5e4]">
                  <div className="flex items-center gap-3 mb-4">
                    <BarChart3 size={20} className="text-[#b45309]" />
                    <h3 className="font-semibold text-[#1c1917]">Tải báo cáo</h3>
                  </div>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-[#e7e5e4] rounded-lg hover:border-[#b45309] transition-colors">
                      <span className="text-sm">CSV</span>
                      <DownloadIcon size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-[#e7e5e4] rounded-lg hover:border-[#b45309] transition-colors">
                      <span className="text-sm">Excel</span>
                      <DownloadIcon size={16} />
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-[#e7e5e4] rounded-lg hover:border-[#b45309] transition-colors">
                      <span className="text-sm">PDF</span>
                      <DownloadIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <div className="max-w-2xl space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Publisher ID
                  </label>
                  <input
                    type="text"
                    placeholder="pub-1234567890123456"
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Data Client ID
                  </label>
                  <input
                    type="text"
                    placeholder="ca-pub-1234567890123456"
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="auto-ads" defaultChecked className="rounded border-[#e7e5e4]" />
                  <label htmlFor="auto-ads" className="text-sm text-[#57534e]">
                    Tự động tối ưu quảng cáo
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="allow-personalized" defaultChecked className="rounded border-[#e7e5e4]" />
                  <label htmlFor="allow-personalized" className="text-sm text-[#57534e]">
                    Cho phép quảng cáo cá nhân hóa
                  </label>
                </div>
                <button className="px-6 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors">
                  Lưu cài đặt
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function DownloadIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

