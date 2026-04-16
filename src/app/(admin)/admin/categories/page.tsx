"use client";

import { useState } from "react";
import { 
  Plus, Edit, Trash2, Search, Filter,
  FolderOpen, ChevronRight, ChevronDown, Image as ImageIcon
} from "lucide-react";

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Mock data
  const categories = [
    {
      id: "1",
      name: "Tranh thêu hoa",
      slug: "tranh-theu-hoa",
      description: "Các loại tranh thêu hoa đẹp",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=100&q=80",
      order: 1,
      isActive: true,
      productCount: 45,
      children: [
        { id: "1-1", name: "Hoa sen", slug: "hoa-sen", productCount: 15 },
        { id: "1-2", name: "Hoa lan", slug: "hoa-lan", productCount: 12 },
        { id: "1-3", name: "Hoa hồng", slug: "hoa-hong", productCount: 18 },
      ]
    },
    {
      id: "2",
      name: "Tranh thêu chim",
      slug: "tranh-theu-chim",
      description: "Tranh thêu các loài chim",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&q=80",
      order: 2,
      isActive: true,
      productCount: 32,
      children: [
        { id: "2-1", name: "Chim công", slug: "chim-cong", productCount: 8 },
        { id: "2-2", name: "Chim én", slug: "chim-en", productCount: 14 },
        { id: "2-3", name: "Chim hạc", slug: "chim-hac", productCount: 10 },
      ]
    },
    {
      id: "3",
      name: "Tranh thêu cô gái",
      slug: "tranh-theu-co-gai",
      description: "Tranh thêu cô gái cổ phục",
      image: "https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=100&q=80",
      order: 3,
      isActive: true,
      productCount: 28,
      children: []
    },
    {
      id: "4",
      name: "Khóa học thêu",
      slug: "khoa-hoc-theu",
      description: "Các khóa học thêu online",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=100&q=80",
      order: 4,
      isActive: true,
      productCount: 8,
      children: []
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-[#1c1917]">Quản lý Danh mục</h1>
          <p className="text-sm text-[#57534e] mt-1">Quản lý danh mục sản phẩm và bài viết</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[#b45309] rounded-lg hover:bg-[#1c1917] transition-colors">
          <Plus size={16} /> Thêm danh mục
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#b45309]/10 rounded-lg flex items-center justify-center">
              <FolderOpen size={20} className="text-[#b45309]" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">12</p>
              <p className="text-sm text-[#57534e]">Tổng danh mục</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
              <Plus size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">113</p>
              <p className="text-sm text-[#57534e]">Tổng sản phẩm</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <ImageIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">8</p>
              <p className="text-sm text-[#57534e]">Danh mục con</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg border border-[#e7e5e4]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <Filter size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-medium text-[#1c1917]">4</p>
              <p className="text-sm text-[#57534e]">Đang hoạt động</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Categories Tree */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-[#e7e5e4]">
            {/* Toolbar */}
            <div className="p-4 border-b border-[#e7e5e4] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a8a29e]" size={16} />
                  <input
                    type="text"
                    placeholder="Tìm kiếm danh mục..."
                    className="pl-10 pr-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none text-sm w-64"
                  />
                </div>
                <button className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors">
                  <Filter size={16} />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="text-sm text-[#57534e] hover:text-[#b45309] transition-colors">
                  Sắp xếp
                </button>
              </div>
            </div>

            {/* Category List */}
            <div className="divide-y divide-[#e7e5e4]">
              {categories.map((category) => (
                <div key={category.id} className="p-4 hover:bg-[#fffbf5] transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                        className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors"
                      >
                        {selectedCategory === category.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </button>
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#e7e5e4]">
                        <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1c1917]">{category.name}</p>
                        <p className="text-sm text-[#57534e]">{category.slug}</p>
                        <p className="text-xs text-[#a8a29e] mt-1">{category.productCount} sản phẩm</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {category.isActive ? 'Hoạt động' : 'Tắt'}
                      </span>
                      <button className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="p-2 hover:bg-[#e7e5e4] rounded-lg transition-colors text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Subcategories */}
                  {selectedCategory === category.id && category.children.length > 0 && (
                    <div className="mt-4 ml-8 space-y-2">
                      {category.children.map((child) => (
                        <div key={child.id} className="flex items-center justify-between p-3 bg-[#fffbf5] rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-[#b45309]/10 flex items-center justify-center">
                              <FolderOpen size={14} className="text-[#b45309]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium text-[#1c1917]">{child.name}</p>
                              <p className="text-xs text-[#57534e]">{child.slug}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#57534e]">{child.productCount} sp</span>
                            <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors">
                              <Edit size={14} />
                            </button>
                            <button className="p-1.5 hover:bg-[#e7e5e4] rounded transition-colors text-red-600">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                      <button className="w-full flex items-center gap-2 p-3 border-2 border-dashed border-[#e7e5e4] rounded-lg hover:border-[#b45309] transition-colors text-sm text-[#57534e]">
                        <Plus size={16} />
                        Thêm danh mục con
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Category Details */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-[#e7e5e4] p-6 sticky top-24">
            <h3 className="font-semibold text-[#1c1917] mb-4">Chi tiết danh mục</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Tên danh mục
                </label>
                <input
                  type="text"
                  placeholder="Nhập tên danh mục"
                  className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  placeholder="danh-muc-san-pham"
                  className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Mô tả
                </label>
                <textarea
                  placeholder="Mô tả danh mục"
                  rows={3}
                  className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Ảnh danh mục
                </label>
                <div className="border-2 border-dashed border-[#e7e5e4] rounded-lg p-4 text-center hover:border-[#b45309] transition-colors cursor-pointer">
                  <ImageIcon className="mx-auto mb-2 text-[#57534e]" size={24} />
                  <p className="text-sm text-[#57534e]">Click để tải ảnh</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#57534e] mb-2">
                  Thứ tự hiển thị
                </label>
                <input
                  type="number"
                  placeholder="1"
                  className="w-full px-4 py-2 border border-[#e7e5e4] rounded-lg focus:border-[#b45309] focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" defaultChecked className="rounded border-[#e7e5e4]" />
                <label htmlFor="active" className="text-sm text-[#57534e]">
                  Hoạt động
                </label>
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
          </div>
        </div>
      </div>
    </div>
  );
}

