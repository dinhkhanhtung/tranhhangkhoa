"use client";

import { useState } from "react";
import { 
  Plus, Edit, Trash2, Eye, FileText, Globe, 
  Layout, Clock
} from "lucide-react";

export default function StaticPagesPage() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const staticPages = [
    {
      id: "1",
      name: "Về chúng tôi",
      slug: "gioi-thieu",
      title: "Về Chúng Tôi",
      status: "published",
      lastModified: "2 ngày trước",
      views: 3450,
      preview: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=200&q=80"
    },
    {
      id: "2",
      name: "Chính sách bảo mật",
      slug: "chinh-sach-bao-mat",
      title: "Chính sách bảo mật",
      status: "published",
      lastModified: "1 tuần trước",
      views: 890,
      preview: null
    },
    {
      id: "3",
      name: "Điều khoản sử dụng",
      slug: "dieu-khoan-su-dung",
      title: "Điều khoản và điều kiện sử dụng",
      status: "published",
      lastModified: "1 tuần trước",
      views: 670,
      preview: null
    },
    {
      id: "4",
      name: "Chính sách đổi trả",
      slug: "chinh-sach-doi-tra",
      title: "Chính sách đổi trả và hoàn tiền",
      status: "published",
      lastModified: "3 ngày trước",
      views: 1230,
      preview: null
    },
    {
      id: "5",
      name: "Hướng dẫn mua hàng",
      slug: "huong-dan-mua-hang",
      title: "Hướng dẫn mua hàng online",
      status: "published",
      lastModified: "5 ngày trước",
      views: 2100,
      preview: null
    },
    {
      id: "6",
      name: "FAQ - Câu hỏi thường gặp",
      slug: "faq",
      title: "Câu hỏi thường gặp",
      status: "draft",
      lastModified: "1 ngày trước",
      views: 0,
      preview: null
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Trang Tĩnh</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý và chỉnh sửa các trang tĩnh (Về chúng tôi, Chính sách, v.v.)</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Plus size={16} /> Thêm trang mới
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <FileText size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">6</p>
              <p className="text-sm text-[#57534e]">Tổng trang</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Globe size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">5</p>
              <p className="text-sm text-[#57534e]">Đã xuất bản</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <Eye size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">8.3K</p>
              <p className="text-sm text-[#57534e]">Tổng lượt xem</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <Clock size={20} className="text-yellow-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">1</p>
              <p className="text-sm text-[#57534e]">Bản nháp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Page List */}
        <div className="lg:col-span-2 space-y-4">
          {staticPages.map((page) => (
            <div
              key={page.id}
              className={`bg-white rounded-lg border transition-all cursor-pointer ${
                selectedPage === page.id ? "border-[#b45309] shadow-md" : "border-[#e7e5e4] hover:shadow-md"
              }`}
              onClick={() => setSelectedPage(page.id)}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-16 rounded-lg overflow-hidden bg-[#e7e5e4] shrink-0 flex items-center justify-center">
                    {page.preview ? (
                      <img src={page.preview} alt={page.name} className="w-full h-full object-cover" />
                    ) : (
                      <FileText size={24} className="text-[#a8a29e]" />
                    )}
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
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded transition-colors ml-auto">
                    <Trash2 size={14} />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Editor */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 sticky top-24">
            <h3 className="font-semibold text-[#1c1917] mb-4">Chỉnh sửa trang</h3>
            
            {selectedPage ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Tên trang
                  </label>
                  <input
                    type="text"
                    defaultValue={staticPages.find(p => p.id === selectedPage)?.name}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    defaultValue={staticPages.find(p => p.id === selectedPage)?.slug}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Tiêu đề trang
                  </label>
                  <input
                    type="text"
                    defaultValue={staticPages.find(p => p.id === selectedPage)?.title}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Nội dung
                  </label>
                  <textarea
                    placeholder="Nhập nội dung trang..."
                    rows={8}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Meta Description
                  </label>
                  <textarea
                    placeholder="Mô tả SEO cho trang..."
                    rows={2}
                    className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#57534e] mb-2">
                    Ảnh đại diện
                  </label>
                  <div className="border-2 border-dashed border-[#e7e5e4] rounded-lg p-4 text-center hover:border-[#b45309] transition-colors cursor-pointer">
                    <Layout size={24} className="mx-auto mb-2 text-[#57534e]" />
                    <p className="text-sm text-[#57534e]">Click để tải ảnh</p>
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
                <FileText size={48} className="mx-auto mb-4 text-[#a8a29e]" />
                <p>Chọn một trang để chỉnh sửa</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

