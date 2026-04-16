"use client";

import { useState } from "react";
import { 
  Plus, Edit, Trash2, Eye, Copy, Layout, 
  Globe, Smartphone, Monitor, Pause
} from "lucide-react";

export default function LandingPageManagement() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const landingPages = [
    {
      id: "1",
      name: "Trang chủ",
      slug: "trang-chu",
      status: "published",
      views: 12500,
      lastModified: "2 giờ trước",
      preview: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80",
      sections: ["HeroBanner", "FeaturedCategories", "ProductGrid", "BlogSection"]
    },
    {
      id: "2",
      name: "Landing Khóa Học",
      slug: "landing-khoa-hoc",
      status: "published",
      views: 8900,
      lastModified: "1 ngày trước",
      preview: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&q=80",
      sections: ["Hero", "CourseList", "Testimonials", "CTA"]
    },
    {
      id: "3",
      name: "Landing Khuyến Mãi",
      slug: "landing-khuyen-mai",
      status: "draft",
      views: 0,
      lastModified: "3 ngày trước",
      preview: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&q=80",
      sections: ["Banner", "PromoProducts", "Countdown", "CTA"]
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Landing Page</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý và tùy chỉnh các landing page</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Plus size={16} /> Tạo landing page
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <Layout size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">3</p>
              <p className="text-sm text-[#57534e]">Tổng landing</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">21.4K</p>
              <p className="text-sm text-[#57534e]">Tổng lượt xem</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">2</p>
              <p className="text-sm text-[#57534e]">Đã xuất bản</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Pause size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">1</p>
              <p className="text-sm text-[#57534e]">Bản nháp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Landing Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-2 space-y-4">
          {landingPages.map((page) => (
            <div
              key={page.id}
              className={`bg-white rounded-lg border transition-all cursor-pointer ${
                selectedPage === page.id ? "border-[#b45309] shadow-md" : "border-[#e7e5e4] hover:shadow-md"
              }`}
              onClick={() => setSelectedPage(page.id)}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-32 h-20 rounded-lg overflow-hidden bg-[#e7e5e4] shrink-0">
                    <img src={page.preview} alt={page.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-medium text-[#1c1917]">{page.name}</h3>
                        <p className="text-sm text-[#57534e]">{page.slug}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium shrink-0 ${
                        page.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {page.status === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-[#57534e]">
                      <span className="flex items-center gap-1">
                        <Eye size={12} />
                        {page.views.toLocaleString()}
                      </span>
                      <span>Cập nhật: {page.lastModified}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-[#e7e5e4]">
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#57534e] hover:text-[#b45309] hover:bg-[#e7e5e4] rounded transition-colors">
                    <Eye size={14} />
                    Xem trước
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#57534e] hover:text-[#b45309] hover:bg-[#e7e5e4] rounded transition-colors">
                    <Edit size={14} />
                    Chỉnh sửa
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#57534e] hover:text-[#b45309] hover:bg-[#e7e5e4] rounded transition-colors">
                    <Copy size={14} />
                    Nhân bản
                  </button>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors ml-auto">
                    <Trash2 size={14} />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 sticky top-24">
            <h3 className="font-semibold text-[#1c1917] mb-4">Chi tiết trang</h3>
            
            {selectedPage ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Tên trang
                  </label>
                  <input
                    type="text"
                    defaultValue={landingPages.find(p => p.id === selectedPage)?.name}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    defaultValue={landingPages.find(p => p.id === selectedPage)?.slug}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Sections
                  </label>
                  <div className="space-y-2">
                    {landingPages.find(p => p.id === selectedPage)?.sections.map((section, i) => (
                      <div key={i} className="flex items-center justify-between p-2 bg-[#fffbf5] rounded">
                        <span className="text-sm">{section}</span>
                        <button className="text-[#57534e] hover:text-[#b45309]">
                          <Edit size={14} />
                        </button>
                      </div>
                    ))}
                    <button className="w-full flex items-center justify-center gap-2 p-2 border-2 border-dashed border-[#e7e5e4] rounded hover:border-[#b45309] transition-colors text-sm text-[#57534e]">
                      <Plus size={14} />
                      Thêm section
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Responsive Preview
                  </label>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 p-2 border border-[#e7e5e4] rounded hover:border-[#b45309] transition-colors">
                      <Monitor size={14} />
                      <span className="text-xs">Desktop</span>
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1 p-2 border border-[#e7e5e4] rounded hover:border-[#b45309] transition-colors">
                      <Smartphone size={14} />
                      <span className="text-xs">Mobile</span>
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <button className="flex-1 px-4 py-2 bg-[#b45309] text-white rounded-lg hover:bg-[#92400e] transition-colors text-sm">
                    Lưu thay đổi
                  </button>
                  <button className="px-4 py-2 border border-[#e7e5e4] rounded-lg hover:bg-[#e7e5e4] transition-colors text-sm">
                    Hủy
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-[#57534e]">
                <Layout size={48} className="mx-auto mb-4 text-[#a8a29e]" />
                <p>Chọn một trang để xem chi tiết</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

